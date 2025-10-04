import { Body, Controller, HttpCode, Post, UseGuards } from "@nestjs/common";
import { createQuizSchema } from "src/schemas/quiz.schema";
import { QuizService } from "../services/quiz.service";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";
import type { JwtPayload } from "src/modules/auth/jwt.strategy";

@Controller("quiz")
export class CreateQuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    @HttpCode(203)
    @UseGuards(JwtAuthGuard)
    async execute(@Body() body: any, @User() user: JwtPayload) {
        try {

            const { title, description } = createQuizSchema.parse(body);

            const userId = user.sub;

            const { quiz } = await this.quizService.create({ title, description, userId });

            return {
                quiz
            }

        } catch (error) {
            throw error;
        }
    }

}