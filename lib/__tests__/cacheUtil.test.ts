import { afterEach, describe, expect, test, vi, beforeEach } from "vitest";
import { withCache } from "@/lib/cacheUtil";
import redis from "@/redis";

describe("withCache", () => {
  const key = "test-key";
  const value = { data: "test-data" };
  const fn = vi.fn().mockResolvedValue(value);
  const ttlSeconds = 3600;

  beforeEach(() => {
    // redis 모듈 모킹
    vi.mock("@/redis", () => ({
      default: {
        get: vi.fn(),
        set: vi.fn(),
      },
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test("캐시가 없을 때 fn()을 호출하고 결과를 캐시에 저장해야 한다.", async () => {
    // given
    vi.mocked(redis.get).mockResolvedValue(null);

    // when
    const result = await withCache(key, fn, ttlSeconds);

    // then
    expect(redis.get).toHaveBeenCalledWith(key);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(redis.set).toHaveBeenCalledWith(key, JSON.stringify(value), {
      expiration: { type: "EX", value: ttlSeconds },
    });
    expect(result).toEqual(value);
  });

  test("캐시가 있을 때 fn()을 호출하지 않고 캐시된 값을 반환해야 한다.", async () => {
    // given
    vi.mocked(redis.get).mockResolvedValue(JSON.stringify(value));

    // when
    const result = await withCache(key, fn, ttlSeconds);

    // then
    expect(redis.get).toHaveBeenCalledWith(key);
    expect(fn).not.toHaveBeenCalled();
    expect(redis.set).not.toHaveBeenCalled();
    expect(result).toEqual(value);
  });
});
