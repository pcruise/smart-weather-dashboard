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
const KeysToFilterDt = ["current", "hourly", "daily"] as const;
const AI_MODEL = "gemini-2.0-flash" as const;
const OUTFIT_RECOMMENDATION_PROMPT =
  "Based on this weather data, tell me in Korean what kind of outfit I should wear. Start message with the outfit suggestion (e.g., “jeans and a short-sleeved T-shirt”), but please don't mention the current exact temperature. Respond in one or two or three sentences. Here is a JSON weather data:" as const;

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

  // API 전송량을 줄이기 위해 dt 값 제거
  const filteredWeatherData = {
    ...weatherData,
    ...Object.fromEntries(
      KeysToFilterDt.map((key) => [key, removeDtField(weatherData[key])])
    ),
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
    expiration: { type: "EX", value: 3600 }, // 1시간 캐시
  });
  return NextResponse.json(resultText);
}

// dt 값 제거 헬퍼 함수
const removeDtField = (
  data: CurrentWeather | HourlyWeather[] | DailyWeather[]
) => {
  if (Array.isArray(data)) {
    return data.map(({ dt, ...rest }) => rest);
  }

  const { dt, ...rest } = data;
  return rest;
};
