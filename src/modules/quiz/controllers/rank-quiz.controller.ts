import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { QuizRankService } from "../services/quiz-rank.service";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
import type { JwtPayload } from "jsonwebtoken";

@Controller("quiz")
export class QuizRankController {
    constructor(
        private readonly quizRankService: QuizRankService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("rank/:quizId")
    async execute(@Param("quizId") quizId: string, @User() user: JwtPayload) {
        try {

            const { participants } = await this.quizRankService.execute(quizId);

            return {
                participants
            }

        } catch (error) {
            throw error;
        }
    }
}