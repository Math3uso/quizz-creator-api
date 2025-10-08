import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Quiz } from "@prisma/client";
import { JwtPayload } from "src/modules/auth/jwt.strategy";
import { QuizRepository } from "src/modules/quiz/quiz.repository";
import z, { string } from "zod";

const basicInfoBody = z.object({
    quizId: string()
});

@Injectable()
export class CheckQuizIsValid implements CanActivate {
    constructor(private readonly quizRepository: QuizRepository) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request: Request & { user: JwtPayload; quiz: Quiz } = context.switchToHttp().getRequest();

            const { quizId } = basicInfoBody.parse(request.body);

            const isValidQuiz = await this.quizRepository.findById(quizId);
            if (!isValidQuiz) throw new NotFoundException("quiz is not found");

            request.quiz = isValidQuiz;

            return true;
        } catch (error) {
            throw error;
        }

    }

}