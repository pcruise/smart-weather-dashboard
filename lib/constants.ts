// API 관련 에러 메시지
export const ERROR_MESSAGES = {
  // 공통
  UNKNOWN: "알 수 없는 에러가 발생했습니다.",
  INPUT_ERROR: "입력 정보에 문제가 있습니다.",
  PARSE_ERROR: "데이터를 파싱하는 중 에러가 발생했습니다.",
  ITEM_EMPTY: "데이터를 받아오는데 실패했습니다.",

  // 위치 관련
  LOCATION_INPUT_ERROR: "위치 정보에 문제가 있습니다.",

  // 대기오염 정보 관련
  AIR_POLLUTION_STATION_NOT_FOUND:
    "근처에 미세먼지 측정소가 없어 정보를 제공할 수 없습니다.",

  // 의상 추천 관련
  OUTFIT_SUGGESTION_EMPTY: "의상 추천 결과를 받아오지 못했습니다.",
} as const;
