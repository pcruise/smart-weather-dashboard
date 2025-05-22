import { OpenWeatherMapResponse } from "@/app/api/weather/weather.types";

export type UserPosition = { lat: number; lon: number };

// 날씨 API 호출 (OpenWeatherMap)
export const fetchWeather = async (coords: UserPosition) => {
  const res = await fetch(`/api/weather?lat=${coords.lat}&lon=${coords.lon}`);
  return res.json();
};

// 미세먼지 정보 API 호출 (에어코리아)
export const fetchAirPollution = async (coords: UserPosition) => {
  const res = await fetch(
    `/api/airPollution?lat=${coords.lat}&lon=${coords.lon}`
  );
  return res.json();
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
