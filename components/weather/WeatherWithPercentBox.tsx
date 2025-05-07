import Skeleton from "react-loading-skeleton";

export function WeatherWithPercentBox({
  value,
  isLoading,
}: {
  value?: number;
  isLoading: boolean;
}) {
  if (isLoading || value === undefined) {
    return <Skeleton className="h-10" />;
  }

  return <div className="text-2xl text-center">{value.toFixed(1)}%</div>;
}
