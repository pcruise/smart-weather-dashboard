import { getWeatherDescription } from "@/lib/openWeatherUtil";
import { WeatherConditionIcon } from "../common";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";

export function MainWeather({
  data,
  isLoading,
}: {
  data?: OpenWeatherMapResponse;
  isLoading: boolean;
}) {
  // 로딩중일 때 빈 박스 출력
  if (isLoading || !data) {
    return <div className="flex"></div>;
  }

  const currentData = data.current;
  const currentWeatherDescription = getWeatherDescription(
    currentData.weather[0]
  );

  return (
    <div className="flex flex-col items-center">
      <div className="-mb-5">
        <WeatherConditionIcon weather={currentData.weather[0]} size={150} />
      </div>
      <div className="text-3xl">{currentData.temp.toFixed(1)}°C</div>
      <div className="text-sm text-gray-500">{currentWeatherDescription}</div>
      <div className="text-sm text-gray-500">
        체감온도 {currentData.feels_like.toFixed(1)}°C
      </div>
    </div>
  );
}
