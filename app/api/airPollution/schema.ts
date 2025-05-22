import { z } from "zod";

// 가까운 측정소 호출 API 응답
export const NearbyStationResponseSchema = z.object({
  response: z.object({
    body: z.object({
      items: z
        .array(
          z.object({
            stationName: z.string(),
          })
        )
        .nonempty(),
    }),
  }),
});

// 미세먼지 포함 대기 오염 정보
export const AirPollutionDataSchema = z.object({
  dataTime: z.string(),
  pm10Value: z.string(),
});

// 미세먼지 포함 대기 오염 정보 호출 API 응답
export const AirPollutionResponseSchema = z.object({
  response: z.object({
    body: z.object({
      items: z.array(AirPollutionDataSchema).nonempty(),
    }),
  }),
});

export type AirPollutionData = z.infer<typeof AirPollutionDataSchema>;
export type AirPollutionResponse = z.infer<typeof AirPollutionResponseSchema>;
export type StationResponse = z.infer<typeof NearbyStationResponseSchema>;
