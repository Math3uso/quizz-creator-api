import { Controller, Delete, HttpCode, Param } from "@nestjs/common";
import { QuizDeleteService } from "../services/quiz-delete.service";

@Controller("quiz")
export class QuizDeleteController {
    constructor(
        private readonly quizDeleteService: QuizDeleteService
    ) { }

    @Delete(":quizId")
    @HttpCode(203)
    async execute(@Param("quizId") quizId: string) {
        try {

            const { data } = await this.quizDeleteService.execute(quizId);
            return {}

        } catch (error) {
            throw error;
        }
    }
}