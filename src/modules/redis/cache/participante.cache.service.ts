import { Inject, Injectable } from "@nestjs/common";
import { Answer, Participant, User } from "@prisma/client";
import Redis from "ioredis";

interface RequestDefault {
    userId: string;
    quizId: string;
}

export type DetailtParticipant = Participant & { answers: Answer[] }

@Injectable()
export class ParticipanCachetService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) { }

    private getKey({ quizId, userId }: RequestDefault) {
        return `${quizId}:${userId}`;
    }


    async addParticipant(quizId: string, user: Participant & { answers: Answer[] }, ttl = 3600) {
        const key = this.getKey({ userId: user.userId as string, quizId });
        await this.redis.set(key, JSON.stringify(user), 'EX', ttl);
    }

    async getParticipantById({ quizId, userId }: RequestDefault): Promise<Participant & { answers: Answer[] } | null> {
        const key = this.getKey({ quizId, userId });
        const participant = await this.redis.get(key);

        return participant ? JSON.parse(participant) : null;
    }

    async updateParticipant(quizId: string, user: DetailtParticipant, ttl = 3600) {
        const key = this.getKey({ userId: user.userId as string, quizId });

        await this.redis.set(key, JSON.stringify(user), 'EX', ttl);
    }

    async deleteParticipant({ userId, quizId }: RequestDefault): Promise<number | null> {
        const key = this.getKey({ userId, quizId });
        return await this.redis.del(key);
    }
}