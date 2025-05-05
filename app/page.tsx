import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col bg-linear-to-t from-sky-300/70 to-sky-100 items-center justify-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <main className="flex-grow flex flex-col items-center justify-center min-w-lg font-semibold">
        <header className="w-full flex justify-between">
          <span className="text-xl/10">Weather Dashboard</span>
          <div className="flex right text-sm/10">2025. 06. 07. 수요일</div>
        </header>
        <section className="grid grid-cols-1 lg:grid-cols-2 grid-rows-[repeat(5,minmax(0,1fr))] lg:grid-rows-[auto_auto_auto] gap-4 w-full">
          <div className="bg-white/80 min-h-60 rounded-xl p-4 row-span-2 lg:col-span-1">
            메인 날씨
          </div>
          <div className="flex flex-row lg:col-start-2 lg:row-start-1 gap-4">
            <div className="flex-1 bg-white/80 min-h-30 p-4 rounded-xl">
              습도
            </div>
            <div className="flex-1 bg-white/80 min-h-30 p-4 rounded-xl">
              강수확률
            </div>
          </div>
          <div className="bg-white/80 min-h-30 p-4 rounded-xl lg:col-start-2 lg:row-start-2">
            미세먼지
          </div>
          <div className="bg-white/80 min-h-30 p-4 rounded-xl col-span-2">
            오늘의 복장 추천
          </div>
          <div className="bg-white/80 min-h-30 p-4 rounded-2xl col-span-2">
            주간 날씨
          </div>
        </section>
      </main>
      <footer className="flex w-full items-center justify-center py-4">
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
