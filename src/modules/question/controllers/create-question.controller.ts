import { Body, Controller, HttpCode, Injectable, Param, Post, UseGuards } from "@nestjs/common";
import { QuestionService } from "../question.service";
import { createQuestionSchema } from "src/schemas/question.schemas";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import { CheckParticipantRoleGuard } from "src/guards/check-participant-role.guard";

@Controller("question/:quizId")
export class CreteQuestionController {
    constructor(private readonly questionService: QuestionService) { }


    @UseGuards(JwtAuthGuard, CheckParticipantRoleGuard)
    @Post()
    @HttpCode(203)
    async create(
        @Body() body: any,
    ) {
        try {

            const data = createQuestionSchema.parse(body);
            const question = await this.questionService.create(data);

            return question;

        } catch (error) {
            throw error;
        }
    }
}