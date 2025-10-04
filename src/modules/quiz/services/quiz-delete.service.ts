import { Injectable, NotFoundException } from "@nestjs/common";
import { QuizRepositoryCache } from "../quiz.repository.cache";
import { QuizRepository } from "../quiz.repository";

@Injectable()
export class QuizDeleteService {
    constructor(
        private readonly quizRepositoryCache: QuizRepositoryCache,
        private readonly quizRepository: QuizRepository,
    ) { }

    async execute(quizId: string) {

        const isValidQuiz = await this.quizRepository.findById(quizId);
        if (!isValidQuiz) throw new NotFoundException("quiz is not found");

        const data = await this.quizRepositoryCache.deleteById(quizId);

        return { data }
    }
}