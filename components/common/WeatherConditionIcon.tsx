import { WeatherInfo } from "@/app/api/weather/weather.types";
import { getWeatherDescription } from "@/lib/openWeatherUtils";
import Image from "next/image";

const NOT_GRAYSCALE_ICONS = ["01d", "01n", "13d", "13n", "50d", "50n"];

export function WeatherConditionIcon({
  weather,
  size,
}: {
  weather: WeatherInfo;
  size: number;
}) {
  if (NOT_GRAYSCALE_ICONS.includes(weather.icon))
    return (
      <Image
        className="m-auto"
        width={size}
        height={size}
        src={getIconSrc(weather.icon)}
        alt={getWeatherDescription(weather)}
      />
    );

  // 구름 아이콘이 너무 흰색이라 안보이는 문제가 있어서 필터 추가
  return (
    <Image
      className="m-auto brightness-90"
      width={size}
      height={size}
      src={getIconSrc(weather.icon)}
      alt={getWeatherDescription(weather)}
    />
  );
}

const getIconSrc = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@4x.png`;
