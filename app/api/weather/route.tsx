import { NextRequest, NextResponse } from "next/server";
import { getOpenWeatherData } from "./getOpenWeatherData";
import { OpenWeatherMapResponse } from "./schema";
import { routeErrorHandler } from "@/lib/routeUtil";
import { ERROR_MESSAGES } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: ERROR_MESSAGES.LOCATION_INPUT_ERROR }, { status: 400 });
  }

  try {
    // API 호출
    const data = await getOpenWeatherData(lat, lon);
    return NextResponse.json<OpenWeatherMapResponse>(data);
  } catch (error) {
    return routeErrorHandler(error);
  }
}
