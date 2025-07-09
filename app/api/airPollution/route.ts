import { NextRequest, NextResponse } from "next/server";
import { getNearbyStationName } from "./getNearbyStationName";
import { getAirPollutionInfo } from "./getAirPollutionInfo";
import { AirPollutionData } from "./schema";
import { routeErrorHandler } from "@/lib/routeUtil";

// 에러 메세지
const ERROR_MSG_INPUT_ERROR = "입력 위치 정보에 문제가 있습니다." as const;

// lat, lon 좌표를 받아서 해당 좌표에 가장 가까운 대기 품질 측정소의 측정값을 가져옵니다.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = Number(searchParams.get("lat"));
  const lon = Number(searchParams.get("lon"));

  // 값이 없거나 NaN 확인
  if (!lat || !lon || isNaN(lat) || isNaN(lon)) {
    return NextResponse.json({ error: ERROR_MSG_INPUT_ERROR }, { status: 400 });
  }

  try {
    // 좌표를 통해 가장 가까운 측정소 이름 조회
    const stationName = await getNearbyStationName(Number(lat), Number(lon));
    // 측정소 이름을 통해 대기오염정보 조회
    const pollutionData = await getAirPollutionInfo(stationName);

    return NextResponse.json<AirPollutionData>(pollutionData);
  } catch (error) {
    return routeErrorHandler(error);
  }
}
