"use client";

import "react-loading-skeleton/dist/skeleton.css";

import { TextBoxWithLoader, ValueBoxWithLoader } from "@/components/common";
import { DailyWeatherBox } from "@/components/weather/DailyWeatherBox";
import { MainWeather } from "@/components/weather/MainWeather";
import { getAirPollutionInfoText } from "@/lib/airKoreaUtil";
import {
  fetchAirPollution,
  fetchOutfitSuggestion,
  fetchWeather,
  UserPosition,
} from "@/lib/apiClient";
import { getHeaderDateText } from "@/lib/dateUtil";
import { getDateFromOpenweathermapDt, getRainPop } from "@/lib/openWeatherUtil";
import { useEffect, useState } from "react";
import { OpenWeatherMapResponse } from "./api/weather/schema";

const DEFAULT_COORDS: UserPosition = {
  lat: 37.559517,
  lon: 126.918567,
} as const; // 디폴트 좌표 (서울역)

export default function WeatherDashboard() {
  // 각 데이터 로딩 상태
  const [loadingState, setLoadingState] = useState({
    weather: true,
    airPollution: true,
    outfitSuggestion: true,
  });

  // 사용자 위치 정보
  const [userPosition, setUserPosition] = useState<UserPosition>();
  // 날씨 데이터
  const [weatherData, setWeatherData] = useState<OpenWeatherMapResponse>();
  // 미세먼지 데이터
  const [airPollutionData, setAirPollutionData] = useState();
  // 복장 추천 데이터
  const [outfitSuggestionMessage, setOutfitSuggestionMessage] =
    useState<string>();

  // 페이지 로드 후 현재 위치 불러오기
  useEffect(() => {
    getUserLocation()
      .then((geoData: GeolocationPosition) => {
        setUserPosition({
          lat: geoData.coords.latitude,
          lon: geoData.coords.longitude,
        });
      })
      .catch(() => {
        // 좌표 오류 시 fallback 처리 - 서울역 좌표
        setUserPosition(DEFAULT_COORDS);
      });
  }, []); // TODO: 위치 변경 시 다시 이 구문을 호출하는 부분 추가

  // 날씨 / 미세먼지 데이터 불러오기
  useEffect(() => {
    if (!userPosition) return;

    // 날씨 데이터
    fetchWeather(userPosition).then((res) => {
      if (!res) return;
      setWeatherData(res);
      setLoadingState((prev) => ({ ...prev, weather: false }));
    });

    // 미세먼지 데이터
    fetchAirPollution(userPosition).then((res) => {
      if (!res) return;
      setAirPollutionData(res);
      setLoadingState((prev) => ({ ...prev, airPollution: false }));
    });
  }, [userPosition]);

  // 데이터 받아오기가 끝난 후 복장 추천 API 호출
  useEffect(() => {
    if (loadingState.weather || !weatherData) return;

    fetchOutfitSuggestion(weatherData)
      .then((res) => {
        if (!res) {
          throw new Error("Invalid data");
        }

        setOutfitSuggestionMessage(res);
      })
      .finally(() => {
        setLoadingState((prev) => ({ ...prev, outfitSuggestion: false }));
      });
  }, [loadingState.weather, loadingState.airPollution, weatherData]);

  return (
    <main className="flex-grow flex flex-col items-center justify-center w-full min-w-xs sm:w-lg font-semibold">
      <header className="w-full flex justify-between">
        <span
          className="text-xl/10"
          onClick={() => {
            // TODO: 디버그용 코드 제거
            setLoadingState((prev) => ({
              weather: !prev.weather,
              airPollution: !prev.airPollution,
              outfitSuggestion: !prev.outfitSuggestion,
            }));
          }}
        >
          Weather Dashboard
        </span>
        <div className="flex right text-sm/10">
          {getHeaderDateText(
            // 초기에는 현재 시간을 기준으로 UI 표기 후 받아온 날씨 데이터 시간을 추가로 표시
            loadingState.weather && weatherData
              ? getDateFromOpenweathermapDt(weatherData.current.dt)
              : new Date()
          )}
        </div>
      </header>
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
        <div className="flex flex-col bg-white/80 min-h-60 rounded-xl p-6 row-span-2 col-span-2 sm:col-span-2">
          <div className="absolute">날씨</div>
          <div className="flex flex-grow justify-center items-center">
            <MainWeather data={weatherData} isLoading={loadingState.weather} />
          </div>
        </div>
        <div className="bg-white/80 p-6 rounded-xl min-h-30">
          <div className="pb-3">습도</div>
          <ValueBoxWithLoader
            value={weatherData && weatherData.current.humidity}
            unit="%"
            isLoading={loadingState.weather}
          />
        </div>
        <div className="bg-white/80 p-6 rounded-xl min-h-30">
          <div className="pb-3">강수확률</div>
          <TextBoxWithLoader
            styleClassName="font-semibold"
            value={getRainPop(weatherData)}
            isLoading={loadingState.weather}
          />
        </div>
        <div className="bg-white/80 p-6 rounded-xl min-h-30 col-span-2">
          <div className="pb-3">미세먼지</div>
          <TextBoxWithLoader
            value={getAirPollutionInfoText(airPollutionData)}
            isLoading={loadingState.airPollution}
          />
        </div>
        {/* <div className="bg-white/80 p-6 min-h-30 rounded-xl col-span-2 sm:col-span-4">
          <HourlyWeatherBox
            data={weatherData}
            isLoading={loadingState.weather}
          />
        </div> */}
        <div className="bg-white/80 p-6 min-h-30 rounded-xl col-span-2 sm:col-span-4">
          <div className="pb-3">오늘의 복장 추천</div>
          <TextBoxWithLoader
            skeletonLines={4}
            value={outfitSuggestionMessage}
            isLoading={loadingState.outfitSuggestion}
          />
        </div>
        <div className="bg-white/80 h-30 flex flex-col justify-center px-2 rounded-2xl col-span-2 sm:col-span-4">
          <DailyWeatherBox
            data={weatherData}
            isLoading={loadingState.weather}
          />
        </div>
      </section>
    </main>
  );
}

// 유저 위치정보 요청
const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};
