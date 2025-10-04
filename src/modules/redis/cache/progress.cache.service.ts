import { Inject, Injectable } from "@nestjs/common";
import { Quiz } from "@prisma/client";
import Redis from "ioredis";

@Injectable()
export class ProgressCacheService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) { }

    async setProgress(participantId: string, content: number) {
        await this.redis.set(participantId, Number(content));
    }

    async getProgress(participantId: string): Promise<number | null> {
        return Number(await this.redis.get(participantId));
    }

    async deleteProgress(participantId: string): Promise<number | null> {
        return await this.redis.del(participantId);
    }
}