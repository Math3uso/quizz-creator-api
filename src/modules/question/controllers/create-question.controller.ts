import { Body, Controller, HttpCode, Injectable, Post, UseGuards } from "@nestjs/common";
import { QuestionService } from "../question.service";
import { createQuestionSchema } from "src/schemas/question.schemas";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";

@Controller("question")
export class CreteQuestionController {
    constructor(private readonly questionService: QuestionService) { }


    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(203)

    async create(@Body() body: any) {
        try {

            const data = createQuestionSchema.parse(body);

            const question = await this.questionService.create(data);

            return question;

        } catch (error) {
            throw error;
        }
    }
}