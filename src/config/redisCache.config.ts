export default {
  host: process.env.REDIS_CACHE_HOST || 'localhost',
  port: parseInt(process.env.REDIS_CACHE_PORT || '6379'),
  ttl: parseInt(process.env.REDIS_CACHE_TTL || '1'),
  cache_db: parseInt(process.env.REDIS_CACHE_DB || '0'),
  queue_db: parseInt(process.env.REDIS_QUEUE_DB || '1'),
};
