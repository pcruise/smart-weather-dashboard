"use client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";
import { MainWeather } from "@/components/weather/MainWeather";
import { OpenWeatherMapResponse } from "./api/weather/weather.types";
import { WeatherWithPercentBox } from "@/components/weather/WeatherWithPercentBox";
import { WeatherWithTextBox } from "@/components/weather/WeatherWithTextBox";
import { DailyWeatherBox } from "@/components/weather/DailyWeatherBox";
import { getHeaderDateTextFromDt, weekKor } from "@/lib/dateUtil";

export default function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState<OpenWeatherMapResponse>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 페이지 로드 후 현재 위치 불러오기
    navigator.geolocation.getCurrentPosition(
      async (geoResult) => {
        const res = await fetch(
          `/api/weather?lat=${geoResult.coords.latitude}&lon=${geoResult.coords.longitude}`
        );

        const weatherData = await res.json();
        setWeatherData(weatherData);
        setIsLoading(false);
        console.log(weatherData);
      },
      () => {
        // 오류 시 서울 좌표로 fallback - 서울역 기준
        fetch(`/api/weather?lat=37.559517&lon=126.918567`)
          .then((r) => r.json())
          .then((weatherData) => {
            setWeatherData(weatherData);
            setIsLoading(false);
            console.log(weatherData);
          })
          .catch(() => {
            // 오류 처리
          });
      }
    );
  }, []);

  return (
    <main className="flex-grow flex flex-col items-center justify-center min-w-lg font-semibold">
      <header className="w-full flex justify-between">
        <span className="text-xl/10">Weather Dashboard</span>
        <div className="flex right text-sm/10">
          {isLoading || !weatherData ? (
            <Skeleton />
          ) : (
            getHeaderDateTextFromDt(weatherData.current.dt)
          )}
        </div>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(5,minmax(0,1fr))] lg:grid-rows-[auto_auto_auto] gap-4 w-full">
        <div className="flex flex-col bg-white/80 min-h-60 rounded-xl p-6 row-span-2 lg:col-span-1">
          <div className="flex">날씨</div>
          <div className="flex flex-grow justify-center items-center">
            <MainWeather data={weatherData} isLoading={isLoading} />
          </div>
        </div>
        <div className="flex flex-row lg:col-start-2 lg:row-start-1 gap-4">
          <div className="flex-1 justify-between bg-white/80 min-h-30 p-6 rounded-xl">
            <div className="pb-3">습도</div>
            <WeatherWithPercentBox
              value={weatherData && weatherData.current.humidity}
              isLoading={isLoading}
            />
          </div>
          <div className="flex-1 justify-between bg-white/80 min-h-30 p-6 rounded-xl">
            <div className="pb-3">강수확률</div>
            <WeatherWithPercentBox
              value={weatherData?.current?.rain?.["1h"] || 0}
              isLoading={isLoading}
            />
          </div>
        </div>
        <div className="bg-white/80 min-h-30 p-6 rounded-xl lg:col-start-2 lg:row-start-2">
          <div className="pb-3">미세먼지</div>
          {
            <WeatherWithTextBox
              value={"매우 좋음 (임시)"}
              isLoading={isLoading}
            />
          }
        </div>
        <div className="bg-white/80 min-h-30 p-6 rounded-xl col-span-2">
          <div className="pb-3">오늘의 복장 추천</div>
          {
            <WeatherWithTextBox
              value={"대충 아주 멋진 복장 추천 문구 (임시)"}
              isLoading={isLoading}
            />
          }
        </div>
        <div className="bg-white/80 min-h-30 py-4 px-2 rounded-2xl col-span-2">
          <DailyWeatherBox data={weatherData} isLoading={isLoading} />
        </div>
      </section>
    </main>
  );
}
