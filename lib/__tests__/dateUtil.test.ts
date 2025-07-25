import { describe, it, expect } from "vitest";
import { getHeaderDateText, getWeekKor, isDateInvalid } from "@/lib/dateUtil";

describe("getHeaderDateText", () => {
  it('유효한 날짜를 입력하면 "요일 / YYYY. M. D." 형식의 문자열을 반환한다', () => {
    const date = new Date("2025-07-23");
    const result = getHeaderDateText(date);
    expect(result).toBe("수요일 / 2025. 7. 23.");
  });

  it('유효하지 않은 날짜를 입력하면 "-" 를 반환한다', () => {
    const invalidDate = new Date("잘못된 날짜");
    const result = getHeaderDateText(invalidDate);
    expect(result).toBe("-");
  });
});

describe("getWeekKor", () => {
  it("유효한 Date를 입력하면 그에 맞는 요일이 반환된다.", () => {
    expect(getWeekKor(new Date("2025-07-23"))).toBe("수");
    expect(getWeekKor(new Date("2025-07-21"))).toBe("월");
  });

  it('유효하지 않은 Date를 입력하면 "-"이 반환된다.', () => {
    expect(getWeekKor(new Date("잘못된 날짜"))).toBe("-");
  });
});

describe("isDateInvalid", () => {
  it("유효한 Date를 입력하면 false가 반환된다.", () => {
    expect(isDateInvalid(new Date("2025-07-23"))).toBe(false);
  });

  it("유효하지 않은 Date를 입력하면 true가 반환된다.", () => {
    expect(isDateInvalid(new Date("잘못된 날짜"))).toBe(true);
  });
});
