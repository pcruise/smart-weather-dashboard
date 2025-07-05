import { AirPollutionData } from "@/app/api/airPollution/schema";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";

export type UserPosition = { lat: number; lon: number };

// 날씨 API 호출 (OpenWeatherMap)
export const fetchWeather = async (
  coords: UserPosition
): Promise<OpenWeatherMapResponse> => {
  const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
};

// 미세먼지 정보 API 호출 (에어코리아)
export const fetchAirPollution = async (
  coords: UserPosition
): Promise<AirPollutionData> => {
  const res = await fetch(
    `/api/airPollution?lat=${coords.lat}&lon=${coords.lon}`
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json.error);
  return json;
};

// 복장추천 API 호출 (Gemini)
export const fetchOutfitSuggestion = async (
  weatherData: OpenWeatherMapResponse
) => {
  const res = await fetch(`/api/gemini`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ weatherData }),
  });
  return res.json();
};
