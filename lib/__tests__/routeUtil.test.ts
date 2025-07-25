import { routeErrorHandler } from "@/lib/routeUtil";
import { NextResponse } from "next/server";
import { ERROR_MESSAGES } from "@/lib/constants";
import { describe, expect, it } from "vitest";

describe("routeErrorHandler", () => {
  it("받은 에러 메세지를 포함하여 NextResponse에 에러를 추가해서 반환한다.", () => {
    const errorMessage = "오류 발생!";
    const error = new Error(errorMessage);
    const response = routeErrorHandler(error);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    expect(response.json()).resolves.toEqual({ error: errorMessage });
  });

  it("Error 객체를 입력받지 못했다면 기본 오류 메세지를 에러로 추가하여 반환한다.", () => {
    const error = "오류 발생!";
    const response = routeErrorHandler(error);
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    expect(response.json()).resolves.toEqual({ error: ERROR_MESSAGES.UNKNOWN });
  });
});
