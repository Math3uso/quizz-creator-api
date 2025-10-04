import { Prisma, Quiz } from "@prisma/client";

export abstract class IQuizRepository {
    abstract create(data: Prisma.QuizCreateInput): Promise<Quiz>;
    abstract findById(id: string): Promise<Quiz | null>;
}