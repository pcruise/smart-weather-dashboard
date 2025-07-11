import { getWeekKor } from "@/lib/dateUtil";
import Skeleton from "react-loading-skeleton";
import { WeatherConditionIcon } from "../common";
import { getDateFromOpenweathermapDt } from "@/lib/openWeatherUtil";
import { DailyWeather, OpenWeatherMapResponse } from "@/app/api/weather/schema";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";

export function DailyWeatherBox({
  weatherData,
  isLoading,
  className,
}: {
  weatherData?: OpenWeatherMapResponse | WeatherDataError;
  isLoading: boolean;
  className: string;
}) {
  return (
    <DashboardItemWrapper className={className}>
      <DailyWeatherContent weatherData={weatherData} isLoading={isLoading} />
    </DashboardItemWrapper>
  );
}
const DailyWeatherContent = ({
  weatherData,
  isLoading,
}: {
  weatherData?: OpenWeatherMapResponse | WeatherDataError;
  isLoading: boolean;
}) => {
  if (isLoading || !weatherData) {
    return <Skeleton height={86} />;
  }

  if (isWeatherDataError(weatherData)) {
    return <div>날씨 정보를 받아오지 못했습니다.</div>;
  }

  const dailyData = weatherData.daily;

  return (
    <div className="grid grid-cols-7 justify-between divide-x divide-gray-200">
      {dailyData.slice(1, 8).map((weather, idx) => {
        return (
          <DailyWeatherItem data={weather} key={`daily-weather-box-${idx}`} />
        );
      })}
    </div>
  );
};

const DailyWeatherItem = ({ data }: { data: DailyWeather }) => {
  return (
    <div className="flex flex-col">
      <div className="text-center">
        {getWeekKor(getDateFromOpenweathermapDt(data.dt))}
      </div>
      <div className="-mb-1 -mt-1">
        <WeatherConditionIcon weather={data.weather[0]} size={50} />
      </div>
      <div className="text-sm text-center">{data.temp.day.toFixed(0)}°C</div>
    </div>
  );
};
