import Skeleton from "react-loading-skeleton";

export function WeatherWithPercentBox({
  value,
  isLoading,
  unit,
}: {
  value?: number;
  isLoading: boolean;
  unit?: string;
}) {
  if (isLoading || value === undefined) {
    return (
      <div className="leading-none">
        <Skeleton className="h-8" />
      </div>
    );
  }

  return (
    <div className="text-2xl text-left h-8">
      {value}
      {unit || "%"}
    </div>
  );
}
