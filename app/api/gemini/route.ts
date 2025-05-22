import redis from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";
import { OpenWeatherMapResponse } from "../weather/weather.types";
import { getOutfitSuggestion } from "./getOutfitSuggestion";

// 결과값 1시간 캐시, 개발 환경에서는 1분
const CACHE_TTL =
  process.env.NODE_ENV === "development" ? (60 as const) : (3600 as const);

// OpenWeather에서 받아온 데이터와 공기 품질 데이터를 이용하여 AI API를 호출합니다.
export async function POST(req: NextRequest) {
  const { weatherData }: { weatherData: OpenWeatherMapResponse } =
    await req.json();

  if (!weatherData) {
    return NextResponse.json(
      { error: "입력 정보에 문제가 있습니다." },
      { status: 400 }
    );
  }

  // 캐시키 생성 후 캐시 확인
  const cacheKey = getCacheKey(weatherData);
  const cached = await redis.get(cacheKey);

  // 캐시 확인 후 캐시데이터가 있을 경우 캐시값 그대로 리턴
  if (cached) return NextResponse.json(cached);

  // API 호출
  const suggestionData = await getOutfitSuggestion(weatherData);

  // 결과값 캐싱 및 리턴
  await redis.set(cacheKey, suggestionData, {
    expiration: { type: "EX", value: CACHE_TTL },
  });

  return NextResponse.json(suggestionData);
}

// redis 등 캐시에 사용할 캐시 키 생성
const getCacheKey = (weatherData: OpenWeatherMapResponse) =>
  `weather:cache${
    process.env.NODE_ENV === "development" ? "-dev" : ""
  }:gemini:${JSON.stringify({
    lat: weatherData.lat,
    lon: weatherData.lon,
    tz: weatherData.timezone,
    tzo: weatherData.timezone_offset,
  })}`;
