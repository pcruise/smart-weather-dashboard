import { getWeatherDescription } from "@/lib/openWeatherUtil";
import { WeatherConditionIcon } from "../common";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";

export function MainWeatherBox({
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
      <div className="absolute">날씨</div>
      <div className="flex flex-grow justify-center items-center">
        <MainWeatherContent weatherData={weatherData} isLoading={isLoading} />
      </div>
    </DashboardItemWrapper>
  );
}

const MainWeatherContent = ({
  weatherData,
  isLoading,
}: {
  weatherData?: OpenWeatherMapResponse | WeatherDataError;
  isLoading: boolean;
}) => {
  // 로딩중일 때 빈 박스 출력
  if (isLoading || !weatherData || isWeatherDataError(weatherData)) {
    return <div className="flex"></div>;
  }

  const currentData = weatherData.current;
  const currentWeatherDescription = getWeatherDescription(
    currentData.weather[0]
  );
  return (
    <div className="flex flex-col items-center">
      <div className="-mb-5">
        <WeatherConditionIcon weather={currentData.weather[0]} size={150} />
      </div>
      <div className="text-3xl">{currentData.temp.toFixed(1)}°C</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {currentWeatherDescription}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-400">
        체감온도 {currentData.feels_like.toFixed(1)}°C
      </div>
    </div>
  );
};
