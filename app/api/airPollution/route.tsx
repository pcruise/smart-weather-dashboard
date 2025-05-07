import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://apis.data.go.kr/B552584/ArpltnInforInqireSvc";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json(
      { error: "위치 정보에 문제가 있습니다." },
      { status: 400 }
    );
  }

  const res = await fetch(`${API_URL}?`);

  const data = await res.json();
  return NextResponse.json(data);
}
