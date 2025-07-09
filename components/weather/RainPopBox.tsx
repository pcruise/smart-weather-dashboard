import { OpenWeatherMapResponse } from "@/app/api/weather/schema";
import { TextBoxWithLoader } from "../common";
import { getRainPop } from "@/lib/openWeatherUtil";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";

export function RainPopBox({
  weatherData,
  isLoading,
}: {
  weatherData?: OpenWeatherMapResponse;
  isLoading: boolean;
}) {
  return (
    <DashboardItemWrapper>
      <div className="pb-3">강수확률</div>
      <TextBoxWithLoader
        styleClassName="font-semibold text-center"
        value={getRainPop(weatherData)}
        isLoading={isLoading}
      />
    </DashboardItemWrapper>
  );
}
