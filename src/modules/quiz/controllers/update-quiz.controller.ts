import { Body, Controller, HttpCode, Patch, Post, UseGuards } from "@nestjs/common";
import type { Quiz } from "@prisma/client";
import { CurrentQuiz } from "src/decorators/current-quiz.decorator";
import { CheckQuizIsValid } from "src/guards/check-quiz-is-valid.guard";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { updateQuizSchema } from "src/schemas/quiz.schema";
import { QuizUpdateService } from "../services/quiz-update.service";

@Controller("quiz")
export class QuizUpdateController {

    constructor(
        private readonly quizUpdateService: QuizUpdateService
    ) { }

    @Patch()
    @UseGuards(JwtAuthGuard, CheckQuizIsValid)
    @HttpCode(204)
    async execute(
        @Body() body: any,
        @CurrentQuiz() currentQuiz: Quiz
    ) {
        const { quizId, title, description } = updateQuizSchema.parse(body);

        await this.quizUpdateService.execute({ quizId, title, description, currentQuiz });

        return;
    }
}