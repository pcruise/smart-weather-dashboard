import {
  DailyWeather,
  OpenWeatherMapResponse,
} from "@/app/api/weather/weather.types";
import { getDateFromOpenweathermapDt, weekKor } from "@/lib/dateUtil";
import Skeleton from "react-loading-skeleton";
import { WeatherConditionIcon } from "../common";

export function DailyWeatherBox({
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

  const dailyData = data.daily;

  return (
    <div className="grid grid-cols-7 justify-between divide-x divide-gray-200">
      {dailyData.slice(1, 8).map((weather, idx) => {
        return (
          <DailyWeatherItem data={weather} key={`daily-weather-box-${idx}`} />
        );
      })}
    </div>
  );
}

function DailyWeatherItem({ data }: { data: DailyWeather }) {
  return (
    <div className="flex flex-col">
      <div className="text-center">
        {weekKor[getDateFromOpenweathermapDt(data.dt).getDay()]}
      </div>
      <div className="-mb-1 -mt-1">
        <WeatherConditionIcon weather={data.weather[0]} size={50} />
      </div>
      <div className="text-sm text-center">{data.temp.day.toFixed(0)}°C</div>
    </div>
  );
}
