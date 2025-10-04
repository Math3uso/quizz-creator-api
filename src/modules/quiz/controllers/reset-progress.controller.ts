import { Body, Controller, Delete, HttpCode, HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { QuizResetProgressService } from "../services/quiz-reset-progress.service";
import { User } from "src/decorators/user.decorator";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import type { JwtPayload } from "src/modules/auth/jwt.strategy";
import { defaulQuizDataSchema } from "src/schemas/quiz.schema";
import { ParticipantIsNotFoundError } from "src/common/errors/participant-is-not-found.error";

@Controller("quiz")
export class ResetProgressController {
    constructor(private readonly resetProgressService: QuizResetProgressService) { }

    @UseGuards(JwtAuthGuard)
    @Delete("reset")
    @HttpCode(204)
    async execute(@Body() body: any, @User() user: JwtPayload) {
        try {

            const { quizId } = defaulQuizDataSchema.parse(body);

            await this.resetProgressService.execute({ userId: user.sub, quizId });

        } catch (error) {

            if (error instanceof ParticipantIsNotFoundError) {
                throw new HttpException(
                    {
                        message: error.message
                    },
                    HttpStatus.NOT_FOUND
                );
            }

            throw error;
        }
    }
}