import { handleError } from "@/lib/errorUtil";
import { AirPollutionResponseSchema } from "./schema";
import { ERROR_MESSAGES } from "@/lib/constants";

// 에어코리아 대기오염정보 조회 API
const API_URL_GET_AIR_POLLUTION_INFO =
  "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty" as const;

// 측정소 이름을 통해 대기오염 정보를 호출
export const getAirPollutionInfo = async (stationName: string) => {
  // 에어코리아 API 호출
  const res = await fetch(
    `${API_URL_GET_AIR_POLLUTION_INFO}?stationName=${stationName}&dataTerm=daily&pageNo=1&numOfRows=100&returnType=json&serviceKey=${process.env.AIR_KOREA_API_KEY}`
  );

  // json 파싱 및 응답형식 검증
  const json = await res.json();
  const parsed = AirPollutionResponseSchema.safeParse(json);

  // 파싱 오류 시 에러처리
  if (!parsed.success) {
    handleError(parsed.error.format());
    throw new Error(ERROR_MESSAGES.PARSE_ERROR);
  }

  // 가장 가까운 시간의 정보 리턴, 최근 정보가 없을 경우 더 이전의 데이터를 사용함
  /* { dataTime: '2025-06-05 17:00', pm10Value: '-' } */
  const latest = parsed.data.response.body.items.find(
    (item) => !Number.isNaN(parseInt(item.pm10Value))
  );

  // 가장 가까운 시간 획득 실패 에러처리
  if (!latest) throw new Error(ERROR_MESSAGES.ITEM_EMPTY);

  return latest;
};

