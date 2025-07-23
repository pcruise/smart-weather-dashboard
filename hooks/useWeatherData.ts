import { AirPollutionData } from "@/app/api/airPollution/schema";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";
import {
  fetchAirPollution,
  fetchOutfitSuggestion,
  fetchWeather,
  UserPosition,
} from "@/lib/apiClient";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";
import { useEffect, useState } from "react";
export type WeatherLoadingState = {
  weather: boolean;
  airPollution: boolean;
  outfitSuggestion: boolean;
};

export const useWeatherDashboardData = (userPosition?: UserPosition) => {
  // 각 데이터 로딩 상태
  const [loadingState, setLoadingState] = useState<WeatherLoadingState>({
    weather: true,
    airPollution: true,
    outfitSuggestion: true,
  });

  // 날씨 데이터
  const [weatherData, setWeatherData] = useState<
    OpenWeatherMapResponse | WeatherDataError
  >();
  // 미세먼지 데이터
  const [airPollutionData, setAirPollutionData] = useState<
    AirPollutionData | WeatherDataError
  >();
  // 복장 추천 데이터
  const [outfitSuggestionMessage, setOutfitSuggestionMessage] =
    useState<string>();

  // 유저 위치를 받아온 후 - 날씨 / 미세먼지 데이터 불러오기
  useEffect(() => {
    if (!userPosition) return;

    // 날씨 데이터 fetch
    fetchWeather(userPosition)
      .then((res) => {
        if (!res) return;
        setWeatherData(res);
        setLoadingState((prev) => ({ ...prev, weather: false }));
      })
      .catch((e) => {
        setWeatherData({ error: e.message });
      });

    // 미세먼지 데이터 fetch
    fetchAirPollution(userPosition)
      .then((res) => {
        setAirPollutionData(res);
        setLoadingState((prev) => ({ ...prev, airPollution: false }));
      })
      .catch((e) => {
        if (e instanceof Error) {
          setAirPollutionData({ error: e.message });
        } else {
          setAirPollutionData({ error: "응답을 받아오지 못했습니다." });
        }
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, airPollution: false }));
      });
  }, [userPosition]);

  // 날씨 데이터 받아오기가 끝난 후 복장 추천 API 호출
  useEffect(() => {
    if (loadingState.weather || typeof weatherData === "undefined") return;
    if (isWeatherDataError(weatherData)) return;

    // 복장 추천 데이터 fetch
    fetchOutfitSuggestion(weatherData)
      .then((res) => {
        if (!res) {
          throw new Error("유효한 응답을 받아오지 못했습니다.");
        }
        setOutfitSuggestionMessage(res);
      })
      .catch((e) => {
        setOutfitSuggestionMessage(`⚠️${e.message}`);
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, outfitSuggestion: false }));
      });
  }, [loadingState.weather, loadingState.airPollution, weatherData]);

  return {
    loadingState,
    weatherData,
    airPollutionData,
    outfitSuggestionMessage,
  };
};
