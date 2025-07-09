import { NextResponse } from "next/server";

export const routeErrorHandler = (error: unknown) => {
  let message = `${ERROR_MSG_UNKNOWN}`;
  if (error instanceof Error) message = error.message;
  return NextResponse.json({ error: message }, { status: 500 });
};

const ERROR_MSG_UNKNOWN = "Unknown Error" as const;
