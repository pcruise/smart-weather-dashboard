import { GoogleGenAI } from "@google/genai";

import { NextRequest, NextResponse } from "next/server";
import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  OpenWeatherMapResponse,
} from "../weather/weather.types";
import redis from "@/lib/redis";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const AI_MODEL = "gemini-2.0-flash" as const;
const CACHE_TTL =
  process.env.NODE_ENV === "development" ? (60 as const) : (3600 as const); // 1시간 캐시, 개발 환경에서는 1분
const OUTFIT_RECOMMENDATION_PROMPT =
  `Based on this weather data, tell me in Korean what kind of outfit I should wear. 
  Start message with the outfit suggestion (e.g., “jeans and a short-sleeved T-shirt”). 
  Do not mention tomorrow’s weather unless the current time is nighttime.
  Please avoid mentioning the current temperature, but you may refer to near-future conditions (like later tonight or early tomorrow morning).
  Don't use any emojis.
  Respond in two or three sentences.
  Please fill at least one line as much as possible — up to 20 Korean full-width characters — and insert a line break character (\n) only at the end of each line.
  Note that punctuation marks and spaces count as one-quarter of a character in Korean UI, so aim for visual balance.
  Here is a JSON weather data:` as const;

export async function POST(req: NextRequest) {
  const { weatherData }: { weatherData: OpenWeatherMapResponse } =
    await req.json();

  const cacheKey = `weather:cache${
    process.env.NODE_ENV === "development" ? "-dev" : ""
  }:gemini:${JSON.stringify({
    lat: weatherData.lat,
    lon: weatherData.lon,
    tz: weatherData.timezone,
    tzo: weatherData.timezone_offset,
  })}`;
  const cached = await redis.get(cacheKey);

  if (cached) return NextResponse.json(cached);

  if (!weatherData) {
    return NextResponse.json(
      { error: "입력 정보에 문제가 있습니다." },
      { status: 400 }
    );
  }

  // API 전송량을 줄이기 위해 daily 정보는 제거, hour 정보는 18시간까지만 제공, dt 값 제거
  const filteredWeatherData = {
    ...weatherData,
    daily: null,
    hourly: weatherData.hourly.slice(0, 14).map(removeDt),
  };

  // GEMINI API 호출
  const res = await ai.models.generateContent({
    model: AI_MODEL,
    contents:
      OUTFIT_RECOMMENDATION_PROMPT + JSON.stringify(filteredWeatherData),
  });

  const resultText = res.text;

  if (!resultText) {
    return NextResponse.json(
      { error: "AI API 요청에 실패하였습니다." },
      { status: 400 }
    );
  }

  await redis.set(cacheKey, resultText, {
    expiration: { type: "EX", value: CACHE_TTL },
  });
  // 가끔 개행문자 오류가 나는 경우가 있어서 제거
  return NextResponse.json(resultText.replace("/", ""));
}

// // dt 값 제거 헬퍼 함수
const removeDt = (
  item: CurrentWeather | HourlyWeather | DailyWeather
): Omit<CurrentWeather | HourlyWeather | DailyWeather, "dt"> => {
  const { dt: _dt, ...rest } = item;
  return rest;
};
