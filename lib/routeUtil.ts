import { NextResponse } from "next/server";
import { ERROR_MESSAGES } from "./constants";

export const routeErrorHandler = (error: unknown) => {
  let message = `${ERROR_MESSAGES.UNKNOWN}`;
  if (error instanceof Error) message = error.message;
  return NextResponse.json({ error: message }, { status: 500 });
};
