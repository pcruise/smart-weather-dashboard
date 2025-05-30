import { ZodFormattedError } from "zod";

// 나중에 분리할 일이 생길 경우 대비해 에러 핸들러 작성
export function handleError(msg?: string | ZodFormattedError<unknown, string>) {
  if (typeof msg === "string") return console.error(new Error(msg));
  console.error(msg);
}
