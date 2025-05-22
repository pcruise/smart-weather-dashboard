import Skeleton from "react-loading-skeleton";

// % 등 값을 출력하기 위한 박스
export function ValueBoxWithLoader({
  value,
  isLoading,
  unit,
}: {
  value?: number;
  isLoading: boolean;
  unit?: string;
}) {
  // 로딩 중 스켈레톤 출력 (로딩 끝났을 때 레이아웃 움직임을 최소화 하기 위해 약간의 튜닝 적용)
  if (isLoading || value === undefined) {
    return (
      <div className="leading-none">
        <Skeleton className="h-8" />
      </div>
    );
  }

  // 단위 입력 받은게 있으면 문자열 뒤에 출력
  return (
    <div className="text-2xl text-left h-8">
      {value}
      {unit || ""}
    </div>
  );
}
