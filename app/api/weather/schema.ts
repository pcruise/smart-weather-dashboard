import { z } from "zod";

// 날씨 아이템 개별 정보 (weather 키에 사용)
export const WeatherInfoSchema = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type WeatherInfo = z.infer<typeof WeatherInfoSchema>;

// 날씨 응답 베이스
export const BaseResponseWeatherDataSchema = z.object({
  dt: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  visibility: z.number().optional(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  weather: z.array(WeatherInfoSchema),
});

export type BaseResponseWeatherData = z.infer<
  typeof BaseResponseWeatherDataSchema
>;

// 현재 날씨
export const CurrentWeatherSchema = BaseResponseWeatherDataSchema.extend({
  temp: z.number(),
  feels_like: z.number(),
  sunrise: z.number(),
  sunset: z.number(),
  rain: z.object({ "1h": z.number() }).optional(),
  snow: z.object({ "1h": z.number() }).optional(),
});

export type CurrentWeather = z.infer<typeof CurrentWeatherSchema>;

// 날씨 예보 (시간별 자료)
export const HourlyWeatherSchema = BaseResponseWeatherDataSchema.extend({
  temp: z.number(),
  feels_like: z.number(),
  wind_gust: z.number(),
  pop: z.number(),
  rain: z.object({ "1h": z.number() }).optional(),
  snow: z.object({ "1h": z.number() }).optional(),
});

export type HourlyWeather = z.infer<typeof HourlyWeatherSchema>;

// 날씨 예보 (날짜별 자료)
export const DailyWeatherSchema = BaseResponseWeatherDataSchema.omit({
  visibility: true,
}).extend({
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  summary: z.string(),
  temp: z.object({
    day: z.number(),
    min: z.number(),
    max: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  }),
  feels_like: z.object({
    day: z.number(),
    night: z.number(),
    eve: z.number(),
    morn: z.number(),
  }),
  wind_gust: z.number(),
  rain: z.number().optional(),
  uvi: z.number(),
  pop: z.number(),
});

export type DailyWeather = z.infer<typeof DailyWeatherSchema>;

// 전체 응답 Schema
export const OpenWeatherMapResponseSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: CurrentWeatherSchema,
  hourly: z.array(HourlyWeatherSchema),
  daily: z.array(DailyWeatherSchema),
});

export type OpenWeatherMapResponse = z.infer<
  typeof OpenWeatherMapResponseSchema
>;
