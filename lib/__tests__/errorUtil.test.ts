import { describe, test, expect, vi, afterEach } from "vitest";
import { handleError, isWeatherDataError } from "../errorUtil";
import { ZodFormattedError } from "zod";

describe("errorUtil", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  afterEach(() => {
    consoleErrorSpy.mockClear();
  });

  describe("handleError", () => {
    test("문자열을 인자로 받으면 Error 객체를 생성하여 console.error를 호출해야 한다.", () => {
      const errorMessage = "테스트 에러 메시지";
      handleError(errorMessage);
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error(errorMessage));
    });

    test("ZodFormattedError 객체를 인자로 받으면 그대로 console.error를 호출해야 한다.", () => {
      const zodError = {
        _errors: ["Invalid input"],
        field1: { _errors: ["Required"] },
      };
      handleError(zodError as ZodFormattedError<unknown>);
      expect(consoleErrorSpy).toHaveBeenCalledWith(zodError);
    });
  });

  describe("isWeatherDataError", () => {
    test("WeatherDataError 객체일 경우 true를 반환해야 한다.", () => {
      const errorData = { error: "에러 발생" };
      expect(isWeatherDataError(errorData)).toBe(true);
    });

    test("WeatherDataError 객체가 아니면 false를 반환해야 한다.", () => {
      const data = { data: "에러 없는 데이터" };
      expect(isWeatherDataError(data)).toBe(false);
    });

    test("입력한 내용 중 error가 문자열이 아니면 false를 반환해야 한다.", () => {
      const invalidData = { error: new Error() };
      expect(isWeatherDataError(invalidData)).toBe(false);
    });

    test("입력이 null 또는 undefined일 경우 false를 반환해야 한다.", () => {
      expect(isWeatherDataError(null)).toBe(false);
      expect(isWeatherDataError(undefined)).toBe(false);
    });

    test("입력이 객체가 아닐 경우 false를 반환해야 한다.", () => {
      expect(isWeatherDataError("string")).toBe(false);
      expect(isWeatherDataError(123)).toBe(false);
      expect(isWeatherDataError(true)).toBe(false);
    });
  });
});
