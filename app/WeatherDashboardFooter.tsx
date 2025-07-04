import Image from "next/image";

export default function WeatherDashboardFooter() {
  return (
    <footer className="flex w-full flex-col sm:flex-row items-center justify-center pt-12 gap-2 sm:gap-6">
      <span className="text-sm">
        <b className="font-semibold">정보 출처</b> - OpenWeather, 한국환경공단
        에어코리아
      </span>
      <span className="text-sm">
        <b className="font-semibold">AI 모델</b> - Gemini-2.5
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
  );
}
