"use client";

import "react-loading-skeleton/dist/skeleton.css";

import { TextBoxWithLoader, ValueBoxWithLoader } from "@/components/common";
import { DailyWeatherBox } from "@/components/weather/DailyWeatherBox";
import { MainWeather } from "@/components/weather/MainWeather";
import { getAirPollutionInfoText } from "@/lib/airKoreaUtil";
import { getRainPop } from "@/lib/openWeatherUtil";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useWeatherDashboardData } from "@/hooks/useWeatherData";
import { WeatherDashboardHeader } from "./WeatherDashboardHeader";

export default function WeatherDashboard() {
  // 사용자 위치 커스텀 훅
  const userPosition = useGeolocation();
  // 날씨 대시보드 정보 커스텀 훅
  const {
    loadingState,
    weatherData,
    airPollutionData,
    outfitSuggestionMessage,
  } = useWeatherDashboardData(userPosition);

  return (
    <main className="flex-grow flex flex-col items-center justify-center w-full min-w-xs sm:w-lg font-semibold">
      <WeatherDashboardHeader
        loadingState={loadingState}
        weatherData={weatherData}
      />
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
            styleClassName="text-center"
            unit="%"
            isLoading={loadingState.weather}
          />
        </div>
        <div className="bg-white/80 p-6 rounded-xl min-h-30">
          <div className="pb-3">강수확률</div>
          <TextBoxWithLoader
            styleClassName="font-semibold text-center"
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
