import { BadRequestException, ConflictException, Injectable } from "@nestjs/common";
import { QuizRepository } from "../quiz.repository";
import { UpdateQuiz } from "src/schemas/quiz.schema";
import { Quiz } from "@prisma/client";

@Injectable()
export class QuizUpdateService {
    constructor(
        private readonly quizRepository: QuizRepository
    ) { }


    /**
     * @param - o guard (CheckQuizIsValid) armazena o currentQuiz na request
     */
    async execute({ quizId, title, description, currentQuiz }: UpdateQuiz & { currentQuiz: Quiz }) {

        if (currentQuiz.start) throw new BadRequestException("quiz already started");

        const updatedQuiz = await this.quizRepository.updateById(quizId, { title, description });

        return {
            updatedQuiz
        }
    }
}