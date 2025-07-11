"use client";

import "react-loading-skeleton/dist/skeleton.css";

import { AirPollutionBox } from "@/components/weather/AirPollutionBox";
import { DailyWeatherBox } from "@/components/weather/DailyWeatherBox";
import { HumidityBox } from "@/components/weather/HumidityBox";
import { MainWeatherBox } from "@/components/weather/MainWeatherBox";
import { OutfitSuggetionBox } from "@/components/weather/OutfitSuggetionBox";
import { RainPopBox } from "@/components/weather/RainPopBox";
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
        {/* span 2x2 */}
        <MainWeatherBox
          weatherData={weatherData}
          isLoading={loadingState.weather}
          className="min-h-60 row-span-2 col-span-2"
        />
        <HumidityBox
          weatherData={weatherData}
          isLoading={loadingState.weather}
        />
        <RainPopBox
          weatherData={weatherData}
          isLoading={loadingState.weather}
        />
        {/* span 2x1 */}
        <AirPollutionBox
          airPollutionData={airPollutionData}
          isLoading={loadingState.airPollution}
          className="col-span-2"
        />
        {/* span 4x1 (한 줄)*/}
        <OutfitSuggetionBox
          outfitSuggestionMessage={outfitSuggestionMessage}
          isLoading={loadingState.outfitSuggestion}
          className="col-span-2 sm:col-span-4"
        />
        {/* span 4x1 (한 줄) */}
        <DailyWeatherBox
          weatherData={weatherData}
          isLoading={loadingState.weather}
          className="px-2 col-span-2 sm:col-span-4"
        />
      </section>
    </main>
  );
}
