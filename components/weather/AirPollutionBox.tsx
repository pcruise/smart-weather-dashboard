import { AirPollutionData } from "@/app/api/airPollution/schema";
import { TextBoxWithLoader } from "../common";
import { getAirPollutionInfoText } from "@/lib/airKoreaUtil";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";

export function AirPollutionBox({
  airPollutionData,
  isLoading,
  className,
}: {
  airPollutionData?: AirPollutionData;
  isLoading: boolean;
  className: string;
}) {
  return (
    <DashboardItemWrapper className={className}>
      <div className="pb-3">미세먼지</div>
      <TextBoxWithLoader
        value={getAirPollutionInfoText(airPollutionData)}
        isLoading={isLoading}
      />
    </DashboardItemWrapper>
  );
}
