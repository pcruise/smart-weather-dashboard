import Image from "next/image";
import WeatherDashboard from "./WeatherDashboard";

export default function Home() {
  // 다크모드 대응 임시로 text-black 추가
  return (
    <div className="flex flex-col bg-linear-to-t from-sky-300/70 to-sky-100 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)] py-4 px-4 text-black">
      <WeatherDashboard />
      <footer className="flex w-full flex-col lg:flex-row items-center justify-center pt-12 gap-2 lg:gap-6">
        <span className="text-sm">
          <b className="font-semibold">정보 출처</b> - OpenWeather, 한국환경공단
          에어코리아
        </span>
        <span className="text-sm">
          <b className="font-semibold">AI 모델</b> - Gemini-2.0
        </span>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4 font-semibold"
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
