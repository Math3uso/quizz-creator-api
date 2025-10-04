import { Body, Controller, Get, HttpCode, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { QuizResultService } from "../services/quiz-result.service";

@Controller("quiz")
export class QuizResultController {
    constructor(
        private readonly quizResultService: QuizResultService
    ) { }

    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Get("result/:participantId")
    async execute(
        @Param("participantId") participantId: string,
    ) {

        try {

            const data = await this.quizResultService.execute(participantId);

            return {
                data
            }

        } catch (error) {
            throw error;
        }

    }
}