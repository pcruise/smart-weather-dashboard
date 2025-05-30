import { handleError } from "./errorUtil";

// 현재 날짜 안내 문자열 생성 [n요일 / 2025. 6. 7]
export const getHeaderDateText = (inp: Date) => {
  if (isDateInvalid(inp)) {
    // 에러 핸들링
    handleError("날짜 형식이 맞지 않습니다.");
    return "-";
  }
  return `${getWeekKor(inp)}요일 / ${inp.getFullYear()}. ${
    inp.getMonth() + 1
  }. ${inp.getDate()}.`;
};

// 한국어 요일 텍스트 변환
export const getWeekKor = (inp: Date) => {
  if (isDateInvalid(inp)) {
    handleError("요일 형식이 맞지 않습니다.");
    return "-";
  }
  return weekKor[inp.getDay()];
};

// Date.getDay 사용할 매핑값
const weekKor = ["일", "월", "화", "수", "목", "금", "토"];

// 날짜 유효성 확인
export const isDateInvalid = (inp: Date) => {
  if (isNaN(inp.getTime())) return true;
  return false;
};
