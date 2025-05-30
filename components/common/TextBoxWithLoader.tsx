import Skeleton from "react-loading-skeleton";

// 문자열 출력을 위한 박스
export function TextBoxWithLoader({
  value,
  skeletonLines,
  isLoading,
  styleClassName,
}: {
  value?: string;
  styleClassName?: string;
  skeletonLines?: number;
  isLoading: boolean;
}) {
  // 로딩 중 스켈레톤 출력 (로딩 끝났을 때 레이아웃 움직임을 최소화 하기 위해 약간의 튜닝 적용)
  if (isLoading || value === undefined) {
    if (skeletonLines) {
      return <Skeleton className="h-8" count={skeletonLines} />;
    }
    return (
      <div className="leading-none">
        <Skeleton className="h-8" />
      </div>
    );
  }

  // 추가 스타일 (Tailwind) 입력 시 기존 스타일 문자열 뒤에 붙이는 방식으로 추가
  return (
    <div
      className={`text-2xl font-normal whitespace-pre-line min-h-8${
        styleClassName ? " " + styleClassName : ""
      }`}
    >
      {value}
    </div>
  );
}
