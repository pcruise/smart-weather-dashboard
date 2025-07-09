import { NextRequest, NextResponse } from "next/server";
import { OpenWeatherMapResponse } from "../weather/schema";
import { getOutfitSuggestion } from "./getOutfitSuggestion";
import { withCache } from "@/lib/cacheUtil";
import { routeErrorHandler } from "@/lib/routeUtil";

// 결과값 캐시 시간, 기본 1시간 / 개발 환경에서는 1분
const CACHE_TTL =
  process.env.NODE_ENV === "development" ? (60 as const) : (3600 as const);

// 에러 메세지
const ERROR_MSG_INPUT_ERROR = "입력 정보에 문제가 있습니다." as const;

// OpenWeather에서 받아온 데이터와 공기 품질 데이터를 이용하여 AI API를 호출합니다.
export async function POST(req: NextRequest) {
  const { weatherData }: { weatherData: OpenWeatherMapResponse } =
    await req.json();

  if (!weatherData) {
    return NextResponse.json({ error: ERROR_MSG_INPUT_ERROR }, { status: 400 });
  }

  try {
    const cacheKey = getCacheKey(weatherData); // 캐시키 생성
    const suggestionData = await withCache(
      cacheKey,
      () => getOutfitSuggestion(weatherData),
      CACHE_TTL
    );
    return NextResponse.json(suggestionData);
  } catch (error) {
    return routeErrorHandler(error);
  }
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
