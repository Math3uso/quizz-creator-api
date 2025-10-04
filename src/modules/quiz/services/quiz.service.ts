import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { Answer, Participant, Prisma } from "@prisma/client";
import { QuizRepository } from "../quiz.repository";
import { QuizCacheService } from "../../redis/cache/quiz.cache.service";
import { ParticipanCachetService } from "../../redis/cache/participante.cache.service";
import { QuizIsAlreadyInProgress } from "src/common/errors/quiz-is-already-in-progress";
import { randomUUID } from "crypto";
import { ParticipantRepository } from "src/modules/participant/participant.repository";

interface CreateQuizRequest {
    userId: string;
    title: string;
    description: string;
}

interface StartQuizRequest {
    userId: string;
    quizId: string;
}

@Injectable()
export class QuizService {
    constructor(
        private readonly quizRepository: QuizRepository,
        private readonly quizCache: QuizCacheService,
        private readonly participantCache: ParticipanCachetService,
        private readonly participantRepository: ParticipantRepository
    ) { }

    async create({ userId, title, description }: CreateQuizRequest) {

        const quiz = await this.quizRepository.create({ title, description });

        await this.participantRepository.create({ userId, role: "Admin", quizId: quiz.id, correctAnswers: 0 });

        return {
            quiz
        }
    }

    async startQuiz({ userId, quizId }: StartQuizRequest) {

        const validQuiz = await this.quizRepository.findDetailtQuizById(quizId);
        if (!validQuiz) throw new NotFoundException("Quiz is not found.");

        let quiz = await this.quizCache.getQuizById(quizId);

        if (!quiz) {
            // await this.quizRepository.
            // const data = await this.quizRepository.findDetailtQuizById(quizId);

            // if (!data) throw new QuizIsNotFoundError();

            console.log("add no cache");

            console.log(validQuiz);

            if (!validQuiz.start) {
                validQuiz.start = true;
                await this.quizRepository.updateById(validQuiz.id, validQuiz);
            }


            this.quizCache.addQuiz(quizId, validQuiz);
            quiz = validQuiz;
        }

        const participant = await this.participantCache.getParticipantById({ quizId, userId });
        if (participant) throw new QuizIsAlreadyInProgress();

        console.log(participant);

        const newParticipant: Participant & { answers: Answer[] } = {
            id: randomUUID(),
            userId,
            quizId,
            correctAnswers: 0,
            answers: [],
            role: "Participant"
        }

        await this.participantCache.addParticipant(quizId, newParticipant)

        console.log("enviado do cache");

        return {
            newParticipant
        }
    }
}