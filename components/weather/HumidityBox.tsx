import { OpenWeatherMapResponse } from "@/app/api/weather/schema";
import { ValueBoxWithLoader } from "../common";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";

export function HumidityBox({
  weatherData,
  isLoading,
}: {
  weatherData?: OpenWeatherMapResponse | WeatherDataError;
  isLoading: boolean;
}) {
  return (
    <DashboardItemWrapper>
      <div className="pb-3">습도</div>
      <ValueBoxWithLoader
        value={
          !isWeatherDataError(weatherData) && weatherData
            ? weatherData.current.humidity
            : null
        }
        styleClassName="text-center"
        unit="%"
        isLoading={isLoading}
      />
    </DashboardItemWrapper>
  );
}
