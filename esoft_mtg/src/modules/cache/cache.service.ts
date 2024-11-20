import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  private redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    });
  }

  async getCache(key: string): Promise<any> {
    const cachedData = await this.redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async setCache(key: string, value: any, ttl: number): Promise<void> {
    await this.redisClient.set(key, JSON.stringify(value), 'EX', ttl);
  }

  async deleteCache(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}
