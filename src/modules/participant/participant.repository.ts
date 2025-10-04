import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Participant, Prisma } from "@prisma/client";

@Injectable()
export class ParticipantRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(data: Prisma.ParticipantUncheckedCreateInput) {
        return await this.prisma.participant.create({ data });
    }

    async findById(id: string) {
        return await this.prisma.participant.findUnique({ where: { id } });
    }

    async findByUserIdAndQuizId(userId: string, quizId: string): Promise<Prisma.ParticipantGetPayload<{ include: { quiz: true } }> | null> {
        return await this.prisma.participant.findFirst({ where: { userId, quizId }, include: { quiz: true } });
    }

    async findDetails(id: string): Promise<Prisma.ParticipantGetPayload<{ include: { quiz: { include: { questions: true } } } }> | null> {
        return await this.prisma.participant.findUnique({
            where: { id },
            include: {
                quiz: {
                    include: {

                        questions: true
                    }
                }
            }
        });
    }

    async findByUserId(userId: string): Promise<Participant | null> {
        return await this.prisma.participant.findFirst({
            where: { userId }
        });
    }

    async findAllByUserId(userId: string): Promise<Participant[]> {
        return await this.prisma.participant.findMany({
            where: { userId },
            include: {
                quiz: true
            }
        });
    }

    async findAllByQuizId(quizId: string, type: "all" | "participant") {
        return await this.prisma.participant.findMany({
            where: {
                quizId,
                ...(type === "participant" && { role: { not: "Admin" } }),
            },
        });
    }
}