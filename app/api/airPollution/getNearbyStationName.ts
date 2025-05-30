import { EPSG5174, WGS84 } from "@/lib/proj4Util";
import proj4 from "proj4";
import { NearbyStationResponseSchema } from "./schema";
import { handleError } from "@/lib/errorUtil";

// 에어코리아 근처 측정소 요청 API
const API_URL_FIND_NEARBY_STATION =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList" as const;

// 기상청에서 데이터 획득을 위해 가까운 측정소 이름을 받아오는 API
export const getNearbyStationName = async (
  lat: number,
  lon: number
): Promise<string> => {
  // 위도/경도 -> TM 좌표계 변환
  const [tmX, tmY] = proj4(WGS84, EPSG5174, [lon, lat]);

  // 가장 가까운 측정소 정보 요청
  const res = await fetch(
    `${API_URL_FIND_NEARBY_STATION}?tmX=${tmX}&tmY=${tmY}&serviceKey=${process.env.AIR_KOREA_API_KEY}&returnType=json`
  );

  // json 파싱 및 응답형식 검증
  const json = await res.json();
  const parsed = NearbyStationResponseSchema.safeParse(json);
  if (!parsed.success) {
    handleError(parsed.error.format());
    throw new Error("getNearbyMsrstnList 응답이 잘못된 형식입니다.");
  }

  // 가장 가까운 (첫 번째 아이템) 측정소 이름 반환
  return parsed.data.response.body.items[0].stationName;
};
