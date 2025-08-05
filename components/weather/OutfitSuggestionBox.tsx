import { TextBoxWithLoader } from "../common";
import { DashboardItemWrapper } from "../common/DashboardItemWrapper";

export function OutfitSuggestionBox({
  outfitSuggestionMessage,
  isLoading,
  className,
}: {
  outfitSuggestionMessage?: string;
  isLoading: boolean;
  className: string;
}) {
  return (
    <DashboardItemWrapper className={className}>
      <div className="pb-3">오늘의 복장 추천</div>
      <TextBoxWithLoader
        skeletonLines={3}
        value={outfitSuggestionMessage}
        isLoading={isLoading}
      />
    </DashboardItemWrapper>
  );
}
