import { Injectable } from "@nestjs/common";
import { Answer, Prisma, Question, Quiz } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { QuizCacheService } from "../redis/cache/quiz.cache.service";
import { QuizIsNotFoundError } from "src/common/errors/quiz-is-not-found-error";
import { DetailtQuiz, QuizRepository } from "./quiz.repository";

@Injectable()
export class QuizRepositoryCache {
    constructor(
        private readonly prisma: PrismaService,
        private readonly quizCache: QuizCacheService,
        private readonly quizRepository: QuizRepository
    ) { }

    async findById(id: string): Promise<DetailtQuiz | null> {

        let quiz = await this.quizCache.getQuizById(id);

        if (!quiz) {
            const data = await this.quizRepository.findDetailtQuizById(id);

            if (!data) throw new QuizIsNotFoundError();

            console.log("add no cache");

            this.quizCache.addQuiz(id, data);
            quiz = data;
        }

        console.log("enviado do cache");

        return quiz;
    }

    async deleteById(id: string): Promise<Quiz | null> {
        await this.quizCache.removeByid(id);
        return await this.quizRepository.deleteById(id);
    }
}