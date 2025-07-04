import { UserPosition } from "@/lib/apiClient";
import { useEffect, useState } from "react";

const DEFAULT_COORDS: UserPosition = {
  lat: 37.559517,
  lon: 126.918567,
} as const; // 디폴트 좌표 (서울역)

// 사용자 위치 커스텀 훅
export const useGeolocation = () => {
  // 사용자 위치 정보
  const [userPosition, setUserPosition] = useState<UserPosition>();

  // 페이지 로드 후 현재 위치를 불러오기
  useEffect(() => {
    getUserLocation()
      .then((geoData: GeolocationPosition) => {
        setUserPosition({
          lat: geoData.coords.latitude,
          lon: geoData.coords.longitude,
        });
      })
      .catch(() => {
        // 좌표 오류 시 fallback 처리 - 서울역 좌표
        setUserPosition(DEFAULT_COORDS);
      });
  }, []);

  return userPosition;
};

// 유저 위치정보 요청
const getUserLocation = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  );
};
