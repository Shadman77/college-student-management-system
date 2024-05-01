export default {
  host: process.env.REDIS_CACHE_HOST || 'localhost',
  port: process.env.REDIS_CACHE_PORT || 6379,
  ttl: parseInt(process.env.REDIS_CACHE_TTL || '1'),
  db: process.env.REDIS_CACHE_DB || 0,
};
