import { OpenWeatherMapResponse } from "@/app/api/weather/schema";
import { ValueBoxWithLoader } from "../common";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";

export function HumidityBox({
  weatherData,
  isLoading,
}: {
  weatherData?: OpenWeatherMapResponse;
  isLoading: boolean;
}) {
  return (
    <DashboardItemWrapper>
      <div className="pb-3">습도</div>
      <ValueBoxWithLoader
        value={weatherData && weatherData.current.humidity}
        styleClassName="text-center"
        unit="%"
        isLoading={isLoading}
      />
    </DashboardItemWrapper>
  );
}
