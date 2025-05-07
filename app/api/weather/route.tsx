import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://api.openweathermap.org/data/3.0/onecall";

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

  // openweather 3.0 API 호출
  const res = await fetch(
    `${API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric&lang=kr&exclude=minutely`
  );

  const data = await res.json();
  return NextResponse.json(data);
}
