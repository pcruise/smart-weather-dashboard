import { convertToTM } from "@/lib/proj4Util";
import { NearbyStationResponseSchema } from "./schema";
import { handleError } from "@/lib/errorUtil";
import { ERROR_MESSAGES } from "@/lib/constants";

// 에어코리아 근처 측정소 요청 API
const API_URL_FIND_NEARBY_STATION =
  "http://apis.data.go.kr/B552584/MsrstnInfoInqireSvc/getNearbyMsrstnList" as const;

// 기상청에서 데이터 획득을 위해 가까운 측정소 이름을 받아오는 API
export const getNearbyStationName = async (
  lat: number,
  lon: number
): Promise<string> => {
  // 위도/경도 -> TM 좌표계 변환
  const [tmX, tmY] = convertToTM(lat, lon);

  // 가장 가까운 측정소 정보 요청
  const res = await fetch(
    `${API_URL_FIND_NEARBY_STATION}?tmX=${tmX}&tmY=${tmY}&serviceKey=${process.env.AIR_KOREA_API_KEY}&returnType=json`,
    {
      next: {
        revalidate: 3600, // 캐싱
      },
    }
  );

  // json 파싱 및 응답형식 검증
  const json = await res.json();
  const parsed = NearbyStationResponseSchema.safeParse(json);

  // 파싱 에러처리
  if (!parsed.success) {
    handleError(parsed.error.format());
    throw new Error(ERROR_MESSAGES.PARSE_ERROR);
  }

  const firstItem = parsed.data.response.body.items[0];

  // 정보 획득 실패 에러처리
  if (!firstItem) throw new Error(ERROR_MESSAGES.ITEM_EMPTY);
  // 측정소가 너무 멀 때 에러처리
  if (firstItem.tm > 100)
    throw new Error(ERROR_MESSAGES.AIR_POLLUTION_STATION_NOT_FOUND);

  // 가장 가까운 (첫 번째 아이템) 측정소 이름 반환
  return firstItem.stationName;
};
