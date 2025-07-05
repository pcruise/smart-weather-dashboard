import { NextRequest, NextResponse } from "next/server";
import { getOpenWeatherData } from "./getOpenWeatherData";
import { OpenWeatherMapResponse } from "./schema";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "위치 정보에 문제가 있습니다." },
      { status: 400 }
    );
  }

  // API 호출
  const data = await getOpenWeatherData(lat, lon);
  return NextResponse.json<OpenWeatherMapResponse>(data);
}
