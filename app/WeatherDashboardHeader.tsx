import { WeatherLoadingState } from "@/hooks/useWeatherData";
import { getHeaderDateText } from "@/lib/dateUtil";
import { getDateFromOpenweathermapDt } from "@/lib/openWeatherUtil";
import { OpenWeatherMapResponse } from "./api/weather/schema";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";

export function WeatherDashboardHeader({
  loadingState,
  weatherData,
}: {
  loadingState: WeatherLoadingState;
  weatherData?: OpenWeatherMapResponse | WeatherDataError;
}) {
  return (
    <header className="w-full flex justify-between">
      <span className="text-xl/10">Weather Dashboard</span>
      <div className="flex right text-sm/10">
        {getHeaderDateText(
          // 초기에는 현재 시간을 기준으로 UI 표기 후 받아온 날씨 데이터 시간을 추가로 표시
          loadingState.weather &&
            !isWeatherDataError(weatherData) &&
            typeof weatherData !== "undefined"
            ? getDateFromOpenweathermapDt(weatherData.current.dt)
            : new Date()
        )}
      </div>
    </header>
  );
}
