import redis from "@/redis";

type CacheableApi<T> = () => Promise<T>;

// redis 사용한 기본 캐싱
export async function withCache<T>(
  key: string,
  fn: CacheableApi<T>,
  ttlSeconds = 60 * 60 // 기본 TTL (1시간)
): Promise<T> {
  const cached = await redis.get(key);
  if (cached) return JSON.parse(cached);

  const result = await fn();
  await redis.set(key, JSON.stringify(result), {
    expiration: { type: "EX", value: ttlSeconds },
  });
  return result;
}
