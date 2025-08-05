import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  removeDt,
  getWeatherDescription,
  getDateFromOpenweathermapDt,
  getRainPop,
} from "@/lib/openWeatherUtil";
import { isWeatherDataError, WeatherDataError } from "@/lib/errorUtil";
import {
  CurrentWeather,
  OpenWeatherMapResponse,
} from "@/app/api/weather/schema";
import { isDateInvalid } from "@/lib/dateUtil";
import { MOCK_OPEN_WEATHER_SUCCESS_RESPONSE } from "./mocks/openWeatherMapResponse.mock";

describe("removeDt", () => {
  // 샘플 데이터
  const exampleData = Object(MOCK_OPEN_WEATHER_SUCCESS_RESPONSE.current);

  beforeEach(() => {
    vi.mock("@/lib/errorUtil", () => ({
      isWeatherDataError: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("객체에서 dt를 제거한다.", () => {
    const item = Object(exampleData) as CurrentWeather;
    const result = removeDt(item);
    expect(result).not.toHaveProperty("dt");
    expect(exampleData).toEqual(exampleData);
    expect(result).not.haveOwnPropertyDescriptor("dt");
  });

  it("dt 속성이 없다면 객체를 그대로 반환해야 한다.", () => {
    const item = Object({ ...exampleData, dt: undefined }) as CurrentWeather;
    const result = removeDt(item);
    expect(exampleData).toEqual(exampleData);
    expect(result).toEqual(item);
  });
});

describe("getWeatherDescription", () => {
  it('id가 801일 때 "약간 흐림"을 반환한다.', () => {
    expect(
      getWeatherDescription({ id: 801, main: "", description: "", icon: "" })
    ).toBe("약간 흐림");
  });

  it('id가 802일 때 "흐림"을 반환한다.', () => {
    expect(
      getWeatherDescription({ id: 802, main: "", description: "", icon: "" })
    ).toBe("흐림");
  });

  it('id가 803일 때 "매우 흐림"을 반환한다.', () => {
    expect(
      getWeatherDescription({ id: 803, main: "", description: "", icon: "" })
    ).toBe("매우 흐림");
  });

  it('id가 804일 때 "매우 흐림"을 반환한다.', () => {
    expect(
      getWeatherDescription({ id: 804, main: "", description: "", icon: "" })
    ).toBe("매우 흐림");
  });

  it("다른 id의 경우 description을 반환한다.", () => {
    expect(
      getWeatherDescription({
        id: 100,
        main: "",
        description: "맑음",
        icon: "",
      })
    ).toBe("맑음");
    expect(
      getWeatherDescription({
        id: 700,
        main: "",
        description: "안개",
        icon: "",
      })
    ).toBe("안개");
  });
});

describe("getDateFromOpenweathermapDt", () => {
  it("OpenWeatherMap dt값을 Date 객체로 변환해서 반환한다.", () => {
    const dt = 1753466400;
    const expectedDate = new Date(dt * 1000);
    expect(getDateFromOpenweathermapDt(dt)).toEqual(expectedDate);
  });

  it("잘못된 dt값을 받으면 내부 함수로 판별 가능한 invalid date를 반환한다.", () => {
    expect(getDateFromOpenweathermapDt(Number.MAX_SAFE_INTEGER)).toSatisfy(
      isDateInvalid
    );
    expect(getDateFromOpenweathermapDt(-Number.MAX_SAFE_INTEGER)).toSatisfy(
      isDateInvalid
    );
  });
});

describe("getRainPop", () => {
  const exampleData = Object(MOCK_OPEN_WEATHER_SUCCESS_RESPONSE);
  beforeEach(() => {
    vi.mocked(isWeatherDataError).mockReturnValue(false);
  });

  afterEach(() => vi.resetAllMocks());

  it("입력받은 객체가 WeatherDataError일 경우 빈 문자열을 반환한다.", () => {
    vi.mocked(isWeatherDataError).mockReturnValue(true);
    expect(getRainPop({ error: "오류" } as WeatherDataError)).toBe("");
  });

  it("데이터가 없을 경우 빈 문자열을 반환한다", () => {
    expect(
      getRainPop({ ...exampleData, current: {}, hourly: [], daily: [] })
    ).toBe("");
    expect(getRainPop({ ...exampleData, hourly: [] })).toBe("");
  });

  it("현재 강수 확률이 0보다 클 경우 현재 강수 확률을 반환한다.", () => {
    const weatherData = {
      ...exampleData,
      hourly: [{ pop: 0.5 }, { pop: 0.1 }, { pop: 0.2 }],
    } as OpenWeatherMapResponse;

    expect(getRainPop(weatherData)).toBe("50%");
  });

  it("현재 강수 확률이 1 이상일 경우 100%를 반환한다.", () => {
    const weatherData = {
      ...exampleData,
      hourly: [{ pop: 1.5 }, { pop: 0.1 }, { pop: 0.2 }],
    } as OpenWeatherMapResponse;

    expect(getRainPop(weatherData)).toBe("100%");
  });

  it("현재 강수 확률이 0일 경우 다음 6시간 중 최대 강수 확률을 ~ 문자와 함께 반환한다.", () => {
    const weatherData = {
      ...exampleData,
      hourly: [
        { pop: 0 },
        { pop: 0.1 },
        { pop: 0.3 },
        { pop: 0.05 },
        { pop: 0.2 },
        { pop: 0.15 },
        { pop: 0.0 },
      ],
    } as OpenWeatherMapResponse;
    expect(getRainPop(weatherData)).toBe("~30%");
  });

  it("현재 강수 확률이 0이고 다음 6시간 동안 강수 확률이 없는 경우 0%를 반환한다.", () => {
    const weatherData = {
      ...exampleData,
      hourly: [
        { pop: 0 },
        { pop: 0 },
        { pop: 0 },
        { pop: 0 },
        { pop: 0 },
        { pop: 0 },
      ],
    } as OpenWeatherMapResponse;
    expect(getRainPop(weatherData)).toBe("0%");
  });

  it("현재 강수 확률이 0이고 시간별 데이터가 6개 미만일 때도 가장 높은 강수 확률을 ~ 문자와 함께 반환한다.", () => {
    const weatherData = {
      ...exampleData,
      hourly: [{ pop: 0 }, { pop: 0.1 }, { pop: 0.2 }],
    } as OpenWeatherMapResponse;

    expect(getRainPop(weatherData)).toBe("~20%");
  });
});
