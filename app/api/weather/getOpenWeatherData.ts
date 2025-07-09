import { handleError } from "@/lib/errorUtil";
import { OpenWeatherMapResponse, OpenWeatherMapResponseSchema } from "./schema";

// OpenWeatherMap 날씨 조회 API
const API_URL = "https://api.openweathermap.org/data/3.0/onecall" as const;

// 에러 메세지
const ERROR_MSG_PARSE_ERROR =
  "getOpenWeatherData 응답이 잘못된 형식입니다." as const;

// 측정소 이름을 통해 대기오염 정보를 호출
export const getOpenWeatherData = async (
  lat: string,
  lon: string
): Promise<OpenWeatherMapResponse> => {
  // openweather 3.0 API 호출
  const res = await fetch(
    `${API_URL}?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=kr&exclude=minutely`,
    {
      next: {
        revalidate: 3600, // 캐싱
      },
    }
  );

  // json 파싱 및 응답형식 검증
  const json = await res.json();
  const parsed = OpenWeatherMapResponseSchema.safeParse(json);
  if (!parsed.success) {
    handleError(parsed.error.format());
    throw new Error(ERROR_MSG_PARSE_ERROR);
  }

  // 날씨 정보 리턴
  return parsed.data;
};
