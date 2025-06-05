import {
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
  OpenWeatherMapResponse,
  WeatherInfo,
} from "@/app/api/weather/schema";

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
      return "약간 흐림"; // 적은 구름
    case 802:
      return "흐림"; // 구름
    case 803:
    case 804:
      return "매우 흐림"; // 튼구름
  }
  return data.description;
};

// OpenWeather API에서 사용하는 dt 값을 JS Date로 반환
export function getDateFromOpenweathermapDt(dt: number) {
  return new Date(dt * 1000);
}

// 강수확률 구하기, 가까운 3시간동안의 강수확률 평균
export const getRainPop = (weatherData?: OpenWeatherMapResponse): string => {
  if (!weatherData?.hourly) return "";

  // 제일 가까운 데이터 중 강수확률이 0이 아니라면 그 데이터를 그대로 출력
  if (weatherData.hourly[0].pop > 0)
    return (weatherData.hourly[0].pop * 100).toFixed(1) + "%";

  // 그 외의 경우 가까운 12시간 동안 최대 강수확률을 표시
  const hourlyDatas = weatherData?.hourly.slice(0, 6);
  const maxPop =
    hourlyDatas.reduce((acc, cur) => (acc > cur.pop ? acc : cur.pop), 0) * 100;

  if (maxPop > 0) return "~" + maxPop + "%";
  return "0%";
};
