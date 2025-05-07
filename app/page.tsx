import Image from "next/image";
import WeatherDashboard from "./WeatherDashboard";

export default function Home() {
  return (
    <div className="flex flex-col bg-linear-to-t from-sky-300/70 to-sky-100 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <WeatherDashboard />
      <footer className="flex w-full items-center justify-center py-4 gap-4">
        <span className="text-sm">
          날씨, 대기정보 출처: OpenWeather, 한국환경공단 에어코리아 대기오염정보
        </span>
        <span>/</span>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/pcruise/smart-weather-dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github-mark.svg"
            alt="Github icon"
            width={16}
            height={16}
          />
          Github
        </a>
      </footer>
    </div>
  );
}
