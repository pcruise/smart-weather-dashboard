// 기본 Geolocation 등에서 사용하는 좌표계
export const WGS84 =
  "+title=WGS84 +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees" as const;
// 기상청 등에서 사용 중인 TM 중부 좌표계
export const EPSG5174 =
  "+proj=tmerc +lat_0=38 +lon_0=127.002890277778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +towgs84=-145.907,505.034,685.756,-1.162,2.347,1.592,6.342 +units=m +no_defs +type=crs" as const;
