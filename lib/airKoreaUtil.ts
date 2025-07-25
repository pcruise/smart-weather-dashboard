import {
  AirPollutionData,
  isAirPollutionData,
} from "@/app/api/airPollution/schema";
import { isWeatherDataError, WeatherDataError } from "./errorUtil";
import { ERROR_MESSAGES } from "./constants";

// 미세먼지 데이터 기반으로 표시할 정보 / 오류 텍스트 생성
export const getAirPollutionInfoText = (
  data?: AirPollutionData | WeatherDataError
) => {
  if (isWeatherDataError(data)) {
    return `⚠️ ${data.error}`;
  }
  if (isAirPollutionData(data)) {
    const { pm10Value: pm10 } = data;
    return `${getPm10GradeText(parseInt(pm10))} (${pm10}㎍/㎥)`;
  }

  return `⚠️ ${ERROR_MESSAGES.UNKNOWN}`;
};

// 미세먼지 등급
export function getPm10GradeText(value: number): string {
  if (Number.isNaN(value)) return "측정 오류";
  if (value <= 10) return "매우 좋음";
  if (value <= 30) return "좋음";
  if (value <= 80) return "보통";
  if (value <= 150) return "나쁨";
  return "매우 나쁨";
}
