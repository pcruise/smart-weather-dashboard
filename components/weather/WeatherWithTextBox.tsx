import Skeleton from "react-loading-skeleton";

export function WeatherWithTextBox({
  value,
  isLoading,
}: {
  value?: string;
  isLoading: boolean;
}) {
  if (isLoading || value === undefined) {
    return <Skeleton className="h-10" />;
  }

  return <div className="text-2xl font-normal">{value}</div>;
}
