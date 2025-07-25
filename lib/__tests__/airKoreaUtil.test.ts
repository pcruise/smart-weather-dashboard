import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { getAirPollutionInfoText, getPm10GradeText } from "@/lib/airKoreaUtil";
import {
  AirPollutionData,
  isAirPollutionData,
} from "@/app/api/airPollution/schema";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";
import { ERROR_MESSAGES } from "@/lib/constants";

describe("getPm10GradeText", () => {
  beforeEach(() => {
    vi.mock("@/app/api/airPollution/schema", () => ({
      isAirPollutionData: vi.fn(),
    }));

    vi.mock("@/lib/errorUtil", () => ({
      isWeatherDataError: vi.fn(),
    }));
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('입력값 <= 10 에 대하여 "매우 좋음" 을 반환한다.', () => {
    expect(getPm10GradeText(0)).toBe("매우 좋음");
    expect(getPm10GradeText(10)).toBe("매우 좋음");
  });

  it('입력값 <= 30 에 대하여 "좋음" 을 반환한다.', () => {
    expect(getPm10GradeText(11)).toBe("좋음");
    expect(getPm10GradeText(30)).toBe("좋음");
  });

  it('입력값 <= 80 에 대하여 "보통" 을 반환한다.', () => {
    expect(getPm10GradeText(31)).toBe("보통");
    expect(getPm10GradeText(80)).toBe("보통");
  });

  it('입력값 <= 150 에 대하여 "나쁨" 을 반환한다.', () => {
    expect(getPm10GradeText(81)).toBe("나쁨");
    expect(getPm10GradeText(150)).toBe("나쁨");
  });

  it('입력값 >= 150 에 대하여 "매우 나쁨" 을 반환한다.', () => {
    expect(getPm10GradeText(151)).toBe("매우 나쁨");
    expect(getPm10GradeText(200)).toBe("매우 나쁨");
  });

  it('입력값 NaN 에 대하여 "측정 오류" 를 반환한다.', () => {
    expect(getPm10GradeText(NaN)).toBe("측정 오류");
  });
});

describe("getAirPollutionInfoText", () => {
  beforeEach(() => {
    vi.mocked(isAirPollutionData).mockReturnValue(false);
    vi.mocked(isWeatherDataError).mockReturnValue(false);
  });

  it("에러가 발생했을 때 에러 메세지를 출력한다.", () => {
    vi.mocked(isWeatherDataError).mockReturnValue(true);
    const errorData = { error: "API 오류" };
    expect(getAirPollutionInfoText(errorData as WeatherDataError)).toBe(
      "⚠️ API 오류"
    );
  });

  it("AirPollutionData 데이터에 맞는 텍스트를 출력한다.", () => {
    vi.mocked(isAirPollutionData).mockReturnValue(true);
    const airPollutionData = { pm10Value: "25" }; // '좋음'
    expect(getAirPollutionInfoText(airPollutionData as AirPollutionData)).toBe(
      "좋음 (25㎍/㎥)"
    );

    const airPollutionData2 = { pm10Value: "5" }; // '매우 좋음'
    expect(getAirPollutionInfoText(airPollutionData2 as AirPollutionData)).toBe(
      "매우 좋음 (5㎍/㎥)"
    );

    const airPollutionData3 = { pm10Value: "90" }; // '나쁨'
    expect(getAirPollutionInfoText(airPollutionData3 as AirPollutionData)).toBe(
      "나쁨 (90㎍/㎥)"
    );
  });

  it("AirPollutionData가 없거나 맞지 않는 형식이고, 오류도 받아오지 못했다면 기본 에러 메세지를 출력한다.", () => {
    expect(getAirPollutionInfoText(undefined)).toBe(
      `⚠️ ${ERROR_MESSAGES.UNKNOWN}`
    );
    expect(getAirPollutionInfoText({} as WeatherDataError)).toBe(
      `⚠️ ${ERROR_MESSAGES.UNKNOWN}`
    );
  });
});
