import { NextRequest, NextResponse } from "next/server";
import { getOpenWeatherData } from "./getOpenWeatherData";
import { OpenWeatherMapResponse } from "./schema";
import { routeErrorHandler } from "@/lib/routeUtil";

const ERROR_MSG_INPUT_ERROR = "위치 정보에 문제가 있습니다." as const;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: ERROR_MSG_INPUT_ERROR }, { status: 400 });
  }

  try {
    // API 호출
    const data = await getOpenWeatherData(lat, lon);
    return NextResponse.json<OpenWeatherMapResponse>(data);
  } catch (error) {
    return routeErrorHandler(error);
  }
}
