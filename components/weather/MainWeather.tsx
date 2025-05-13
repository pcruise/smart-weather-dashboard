import { OpenWeatherMapResponse } from "@/app/api/weather/weather.types";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export function MainWeather({
  data,
  isLoading,
}: {
  data?: OpenWeatherMapResponse;
  isLoading: boolean;
}) {
  if (isLoading || !data) {
    return (
      <div className="flex flex-grow justify-center items-center">
        <Skeleton circle className="w-36 h-36" />
      </div>
    );
  }

  const currentData = data.current;

  return (
    <div className="flex flex-col items-center">
      <div className="-mb-5 -mt-5">
        <Image
          width="150"
          height="150"
          src={`https://openweathermap.org/img/wn/${currentData.weather[0].icon}@4x.png`}
          alt="data.current.weather[0].description"
        />
      </div>
      <div className="text-3xl">{currentData.temp.toFixed(1)}°C</div>
      <div className="text-sm text-gray-500">
        {currentData.weather[0].description}
      </div>
      <div className="text-sm text-gray-500">
        체감온도 {currentData.feels_like.toFixed(1)}°C
      </div>
    </div>
  );
}
