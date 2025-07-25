import { describe, test, expect } from "vitest";
import { convertToTM } from "../proj4Util";

describe("proj4Util", () => {
  describe("convertToTM", () => {
    test("WGS84 좌표를 TM(중부) 좌표로 정확하게 변환해야 한다.", () => {
      // 시청역 좌표 (WGS84)
      const lat = 37.5653;
      const lon = 126.9772;

      const expectedTmX = 197730.5;
      const expectedTmY = 451757.0;

      const [tmX, tmY] = convertToTM(lat, lon);

      // 오차를 감안하여 근사치 비교 (10m 이내)
      expect(tmX).toBeCloseTo(expectedTmX, -1);
      expect(tmY).toBeCloseTo(expectedTmY, -1);
    });
  });
});
