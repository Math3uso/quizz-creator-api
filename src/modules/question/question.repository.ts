import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Prisma, Question } from "@prisma/client";

@Injectable()
export class QuestionRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.QuestionUncheckedCreateInput): Promise<Question> {
        return await this.prisma.question.create({ data });
    }

    async createAnswer(data: Prisma.AnswerUncheckedCreateInput) {
        return await this.prisma.answer.create({ data });
    }

    async findById(id: number): Promise<Question | null> {
        return await this.prisma.question.findUnique({
            where: { id }
        });
    }

    async findByQuizId(quizId: string): Promise<Question[]> {
        return await this.prisma.question.findMany({
            where: { quizId }
        });
    }
}