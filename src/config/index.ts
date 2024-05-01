import * as dotenv from 'dotenv';
dotenv.config();

export { default as mongoConfig } from './mongo.config';
export { default as apiConfig } from './api.config';
export { default as redisCacheConfig } from './redisCache.config';
