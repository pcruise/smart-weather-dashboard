import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchWeather,
  fetchAirPollution,
  fetchOutfitSuggestion,
} from "@/lib/apiClient";
import { ERROR_MESSAGES } from "@/lib/constants";
import { OpenWeatherMapResponse } from "@/app/api/weather/schema";

describe("apiClient", () => {
  const mockFetch = vi.fn();
  const DEFAULT_COORDS = { lat: 12.3, lon: 45.6 };
  const exampleWeatherData = {
    dt: 1753466400,
    pressure: 1008,
    humidity: 64,
    dew_point: 21.99,
    uvi: 0,
    clouds: 57,
    visibility: 10000,
    wind_speed: 0.8,
    wind_deg: 91,
    weather: [{ id: 803, main: "Clouds", description: "튼구름", icon: "04n" }],
    temp: 26.86,
    feels_like: 28.18,
    wind_gust: 0.83,
    pop: 0,
  };
  const exampleWeatherResponse = {
    lat: 1,
    lon: 2,
    timezone: "3",
    timezone_offset: 4,
    current: Object(exampleWeatherData),
    hourly: [],
    daily: [],
  } as OpenWeatherMapResponse;

  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("fetchWeather", () => {
    it("날씨 정보 API를 정상적으로 호출해야 한다.", async () => {
      const mockResponse = { weather: "awesome weather" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await fetchWeather(DEFAULT_COORDS);

      expect(mockFetch).toHaveBeenCalledWith(
        `/api/weather?lat=${DEFAULT_COORDS.lat}&lon=${DEFAULT_COORDS.lon}`,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetch가 실패하면 에러를 발생시켜야 한다.", async () => {
      const errorMessage = "API Error";
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      await expect(fetchWeather(DEFAULT_COORDS)).rejects.toThrow(errorMessage);
    });

    it("특정 에러 메시지 없이 fetch가 실패하면 기본 에러 메시지의 오류를 발생시켜야 한다.", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      await expect(fetchWeather(DEFAULT_COORDS)).rejects.toThrow(
        ERROR_MESSAGES.UNKNOWN
      );
    });
  });

  describe("fetchAirPollution", () => {
    it("대기오염 정보 API를 정상적으로 호출해야 한다.", async () => {
      const mockResponse = { air: "good" };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const coords = { lat: 12.3, lon: 45.6 };
      const result = await fetchAirPollution(coords);

      expect(mockFetch).toHaveBeenCalledWith(
        `/api/airPollution?lat=${coords.lat}&lon=${coords.lon}`,
        undefined
      );
      expect(result).toEqual(mockResponse);
    });

    it("fetch가 실패하면 에러를 발생시켜야 한다.", async () => {
      const errorMessage = "API Error";
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      await expect(fetchAirPollution(DEFAULT_COORDS)).rejects.toThrow(
        errorMessage
      );
    });

    it("특정 에러 메시지 없이 fetch가 실패하면 기본 에러 메시지의 오류를 발생시켜야 한다.", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      await expect(fetchAirPollution(DEFAULT_COORDS)).rejects.toThrow(
        ERROR_MESSAGES.UNKNOWN
      );
    });
  });

  describe("fetchOutfitSuggestion", () => {
    it("옷차림 추천 API를 성공적으로 호출해야 한다.", async () => {
      const mockResponse = "result text";
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const weatherData = Object(exampleWeatherData);
      const result = await fetchOutfitSuggestion(weatherData);

      expect(mockFetch).toHaveBeenCalledWith(`/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weatherData }),
      });
      expect(result).toEqual(mockResponse);
    });

    it("fetch가 실패하면 에러를 발생시켜야 한다.", async () => {
      const errorMessage = "API Error";
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ error: errorMessage }),
      });

      const weatherData: OpenWeatherMapResponse = Object(
        exampleWeatherResponse
      );
      await expect(fetchOutfitSuggestion(weatherData)).rejects.toThrow(
        errorMessage
      );
    });

    it("특정 에러 메시지 없이 fetch가 실패하면 기본 에러 메시지의 오류를 발생시켜야 한다.", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({}),
      });

      const weatherData: OpenWeatherMapResponse = Object(
        exampleWeatherResponse
      );
      await expect(fetchOutfitSuggestion(weatherData)).rejects.toThrow(
        ERROR_MESSAGES.UNKNOWN
      );
    });
  });
});
