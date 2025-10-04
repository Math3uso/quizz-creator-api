import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { createQuizSchema } from "src/schemas/quiz.schema";
import { QuizService } from "../services/quiz.service";

@Controller("quiz")
export class CreateQuizController {
    constructor(private readonly quizService: QuizService) { }

    @Post()
    @HttpCode(203)
    async execute(@Body() body: any) {
        try {

            const { title, description } = createQuizSchema.parse(body);

            const { quiz } = await this.quizService.create({ title, description });

            return {
                quiz
            }

        } catch (error) {
            throw error;
        }
    }

}