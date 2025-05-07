// OpenWeather API에서 사용하는 dt 값을 JS Date로 반환
export function getDateFromOpenweathermapDt(dt: number) {
  return new Date(dt * 1000);
}

// Date.getDay 사용할 매핑값
export const weekKor = ["일", "월", "화", "수", "목", "금", "토"];
