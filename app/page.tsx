import WeatherDashboard from "./WeatherDashboard";
import WeatherDashboardFooter from "./WeatherDashboardFooter";

export default function Home() {
  return (
    <div className="flex flex-col bg-gradient-to-t from-sky-300/70 to-sky-100 dark:from-sky-700/70 dark:to-sky-950 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] py-4 px-4">
      <WeatherDashboard />
      <WeatherDashboardFooter />
    </div>
  );
}
