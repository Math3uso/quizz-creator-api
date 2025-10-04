import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { QuizAnswerService } from "../services/quiz-answer.service";
import type { JwtPayload } from "src/modules/auth/jwt.strategy";
import { User } from "src/decorators/user.decorator";

@Controller("question")
export class AnswerQuestionController {
    constructor(
        private readonly quizAnswerService: QuizAnswerService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("answer/:quizId/:id")
    async execute(
        @Param('quizId') quizId: string,
        @Param('id') id: number,
        @Query('answer') answer: number,
        @User() user: JwtPayload
    ) {

        try {

            const userId = user.sub;

            console.log("ID -> ", id);

            const { quiz, currentProgress, isCorrectAnswer, completed } = await this.quizAnswerService.execute({ quizId, userId, answer, currentQuestion: Number(id) });

            console.log()

            return {
                //quiz: [],
                //isParticipant,
                message: isCorrectAnswer ? "Resposta correta!" : "Resposta incorreta!",
                correct: isCorrectAnswer,
                currentProgress: currentProgress + 1,
                maxProgress: quiz.questions.length,
                completed,
            }

        } catch (error) {
            throw error;
        }
    }
}