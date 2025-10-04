import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { QuizCacheService } from "src/modules/redis/cache/quiz.cache.service";
import { startQuizSchema } from "src/schemas/quiz.schema";
import { QuizRepository } from "../quiz.repository";
import { QuizService } from "../services/quiz.service";
import { User } from "src/decorators/user.decorator";
import type { JwtPayload } from "src/modules/auth/jwt.strategy";
import { QuizIsNotFoundError } from "src/common/errors/quiz-is-not-found-error";
import { QuizIsAlreadyInProgress } from "src/common/errors/quiz-is-already-in-progress";

@Controller("quiz")
export class QuizStartController {
    constructor(
        private readonly quizService: QuizService
    ) { }


    @UseGuards(JwtAuthGuard)
    @Get('start/:id')
    async start(@Param('id') quizId: string, @User() user: JwtPayload) {
        try {


            const { newParticipant } = await this.quizService.startQuiz({ userId: user.sub, quizId });

            return {
                message: "quiz iniciado",
                newParticipant
            }

        } catch (error) {
            if (error instanceof QuizIsNotFoundError) {
                throw new HttpException(
                    {
                        message: "quiz is not found"
                    },
                    HttpStatus.NOT_FOUND
                );

            }

            if (error instanceof QuizIsAlreadyInProgress) {
                throw new HttpException(
                    {
                        message: error.message
                    },
                    HttpStatus.BAD_REQUEST
                );
            }

            throw error;
        }
    }
}