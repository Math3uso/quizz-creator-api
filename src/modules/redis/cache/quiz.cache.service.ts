import { Inject, Injectable } from "@nestjs/common";
import { Quiz } from "@prisma/client";
import Redis from "ioredis";

@Injectable()
export class QuizCacheService {
    constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) { }

    async addQuiz(quizId: string, quiz: Quiz, ttl = 3600) {
        await this.redis.set(quizId, JSON.stringify(quiz), 'EX', ttl);
    }

    async getQuizById(quizId: string) {
        const quiz = await this.redis.get(quizId);

        return quiz ? JSON.parse(quiz) : null;
    }

    async removeByid(quizId: string) {
        return await this.redis.del(quizId);
    }
}