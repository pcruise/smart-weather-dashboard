import { createClient } from "redis";

// redis client
const redis = await createClient({ url: process.env.REDIS_URL }).connect();

export default redis;
