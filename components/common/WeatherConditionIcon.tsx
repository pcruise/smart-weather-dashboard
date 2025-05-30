import { WeatherInfo } from "@/app/api/weather/schema";
import { getWeatherDescription } from "@/lib/openWeatherUtil";
import Image from "next/image";

const NOT_GRAYSCALE_ICONS = ["01n", "13d", "13n", "50d", "50n"];
const SUN_ICON = "01d";

// OpenWeatherMap API 날씨 아이콘 출력
export function WeatherConditionIcon({
  weather,
  size,
}: {
  weather: WeatherInfo;
  size: number;
}) {
  // 맑음 아이콘을 해 모양으로 변경
  if (SUN_ICON === weather.icon)
    return (
      <Image
        className="m-auto"
        width={size}
        height={size}
        src="/sun-icon-alt2.png"
        alt={getWeatherDescription(weather)}
      />
    );

  // OpenWeatherMap API 제공 Icon 그대로 사용
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
