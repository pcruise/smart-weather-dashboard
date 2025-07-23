import { AirPollutionData } from "@/app/api/airPollution/schema";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";

export type UserPosition = { lat: number; lon: number };

// 공통 Fetch function
async function fetchFn<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok) {
    const errorMessage = json.error || "오류가 발생하였습니다.";
    throw new Error(errorMessage);
  }
  return json;
}

// 날씨 API 호출 (OpenWeatherMap)
export const fetchWeather = (
  coords: UserPosition
): Promise<OpenWeatherMapResponse> => {
  return fetchFn<OpenWeatherMapResponse>(
    `/api/weather?lat=${coords.lat}&lon=${coords.lon}`
  );
};

// 미세먼지 정보 API 호출 (에어코리아)
export const fetchAirPollution = (
  coords: UserPosition
): Promise<AirPollutionData> => {
  return fetchFn<AirPollutionData>(
    `/api/airPollution?lat=${coords.lat}&lon=${coords.lon}`
  );
};

// 복장추천 API 호출 (Gemini)
export const fetchOutfitSuggestion = (
  weatherData: OpenWeatherMapResponse
): Promise<string> => {
  return fetchFn<string>(`/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weatherData }),
  });
};
