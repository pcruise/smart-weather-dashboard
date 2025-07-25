import { NextResponse } from "next/server";
import { ERROR_MESSAGES } from "./constants";

// app/api 에서 NextResponse에 에러를 추가하여 반환합니다.
export const routeErrorHandler = (error: unknown) => {
  let message = `${ERROR_MESSAGES.UNKNOWN}`;
  if (error instanceof Error) message = error.message;
  return NextResponse.json({ error: message }, { status: 500 });
};
