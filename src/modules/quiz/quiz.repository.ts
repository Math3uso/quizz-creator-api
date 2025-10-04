import { Injectable } from "@nestjs/common";
import { Answer, Prisma, Question, Quiz } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

export type DetailtQuiz = Quiz & {
    questions: (Question & { answers: Answer[] })[];
};

@Injectable()
export class QuizRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.QuizCreateInput) {
        return await this.prisma.quiz.create({ data });
    }

    async findById(id: string): Promise<Quiz | null> {
        return await this.prisma.quiz.findUnique({
            where: { id },
            // include: {
            //     quesions: {
            //         include: {
            //             answer: true
            //         }
            //     }
            // }
        });
    }

    async findDetailtQuizById(id: string): Promise<DetailtQuiz | null> {
        return await this.prisma.quiz.findUnique({
            where: { id },
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });
    }

    async deleteById(id: string): Promise<Quiz | null> {
        return await this.prisma.quiz.delete({
            where: { id }
        });
    }

    async updateById(id: string, content: Quiz): Promise<Quiz | null> {
        return await this.prisma.quiz.update({
            where: { id },
            data: content
        });
    }
}