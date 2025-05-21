import Skeleton from "react-loading-skeleton";

export function WeatherWithTextBox({
  value,
  skeletonLines,
  isLoading,
}: {
  value?: string;
  skeletonLines?: number;
  isLoading: boolean;
}) {
  if (isLoading || value === undefined) {
    if (skeletonLines) {
      return <Skeleton className="h-8" count={skeletonLines} />;
    }
    return (
      <div className="leading-none">
        <Skeleton className="h-8" />
      </div>
    );
  }

  return (
    <div className="text-2xl font-normal whitespace-pre-line min-h-8">
      {value}
    </div>
  );
}
