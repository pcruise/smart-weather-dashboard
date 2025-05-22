import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  WeatherInfo,
} from "@/app/api/weather/weather.types";

// 데이터의 dt 값 제거 헬퍼 함수
export const removeDt = (
  item: CurrentWeather | HourlyWeather | DailyWeather
): Omit<CurrentWeather | HourlyWeather | DailyWeather, "dt"> => {
  const { dt: _dt, ...rest } = item;
  return rest;
};

// 구름 설명이 어색한 표현이라 더 친숙한 표현으로 수정하고, 나머지는 그대로 사용
export const getWeatherDescription = (data: WeatherInfo) => {
  switch (data.id) {
    case 801:
      return "약간 흐림";
    case 802:
      return "흐림";
    case 803:
    case 804:
      return "매우 흐림";
  }
  return data.description;
};
