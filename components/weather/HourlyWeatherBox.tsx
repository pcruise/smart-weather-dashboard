import {
  HourlyWeather,
  OpenWeatherMapResponse,
} from "@/app/api/weather/schema";
import Skeleton from "react-loading-skeleton";
import { WeatherConditionIcon } from "../common";

export function HourlyWeatherBox({
  data,
  isLoading,
}: {
  data?: OpenWeatherMapResponse;
  isLoading: boolean;
}) {
  if (isLoading || !data) {
    return <Skeleton height={86} />;
  }

  const hourlyData = data.hourly;

  console.log(hourlyData);

  return (
    <div className="grid grid-cols-7 justify-between divide-x divide-gray-200">
      {hourlyData.slice(1, 8).map((weather, idx) => {
        return (
          <HourlyWeatherItem data={weather} key={`hourly-weather-box-${idx}`} />
        );
      })}
    </div>
  );
}

function HourlyWeatherItem({ data }: { data: HourlyWeather }) {
  return (
    <div className="flex flex-col">
      {/* <div className="text-center">{getDateFromOpenweathermapDt(data.dt)}</div> */}
      <div className="-mb-1 -mt-1">
        <WeatherConditionIcon weather={data.weather[0]} size={50} />
      </div>
      {/* <div className="text-sm text-center">{data.temp.day.toFixed(0)}°C</div> */}
    </div>
  );
}
