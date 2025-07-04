import WeatherDashboard from "./WeatherDashboard";
import WeatherDashboardFooter from "./WeatherDashboardFooter";

export default function Home() {
  // 다크모드일 때 폰트가 밝게 나오는 문제 때문에 임시로 text-black 추가
  // TODO: 추후에 다크모드 대응 추가개발
  return (
    <div className="flex flex-col bg-linear-to-t from-sky-300/70 to-sky-100 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] py-4 px-4 text-black">
      <WeatherDashboard />
      <WeatherDashboardFooter />
    </div>
  );
}
