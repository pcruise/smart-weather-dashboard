// 날씨 아이템 하나 정보
export interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

// 날씨 응답 베이스
interface BaseResponseWeatherData {
  dt: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_deg: number;
  weather: WeatherInfo[];
}

// 현재 날씨
export interface CurrentWeather extends BaseResponseWeatherData {
  temp: number;
  feels_like: number;
  sunrise: number;
  sunset: number;
  rain: {
    "1h": number;
  };
  snow: {
    "1h": number;
  };
}

export interface HourlyWeather extends BaseResponseWeatherData {
  temp: number;
  feels_like: number;
  wind_gust: number;
  pop: number;
  rain: {
    "1h": number;
  };
  snow: {
    "1h": number;
  };
}

export interface DailyWeather
  extends Omit<BaseResponseWeatherData, "visibility"> {
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  wind_gust: number;
  rain?: number;
  uvi: number;
  pop: number;
}

export interface OpenWeatherMapResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}
