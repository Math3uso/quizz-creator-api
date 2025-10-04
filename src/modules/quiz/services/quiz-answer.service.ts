import { BadRequestException, ConflictException, GoneException, Injectable, NotFoundException } from "@nestjs/common";
import { ParticipanCachetService } from "../../redis/cache/participante.cache.service";
import { QuizRepositoryCache } from "../quiz.repository.cache";
import { ProgressCacheService } from "src/modules/redis/cache/progress.cache.service";
import { ParticipantRepository } from "src/modules/participant/participant.repository";

interface QuizAnswerRequest {
    userId: string;
    quizId: string;
    answer: number;
    currentQuestion: number;
}

@Injectable()
export class QuizAnswerService {
    constructor(
        private readonly participantCache: ParticipanCachetService,
        private readonly quizRepositoryCache: QuizRepositoryCache,
        private readonly progressCache: ProgressCacheService,
        private readonly participantRepository: ParticipantRepository
    ) { }

    async execute({ quizId, userId, answer, currentQuestion }: QuizAnswerRequest) {
        const isParticipant = await this.participantCache.getParticipantById({ quizId, userId });
        if (!isParticipant) throw new GoneException('Quiz expirado');

        let isCorrectAnswer: boolean = false;
        let currentProgress = await this.progressCache.getProgress(isParticipant.id) ?? 0;
        let completed = false;
        // if (currentProgress == 0 || !currentProgress) currentProgress = 1;

        //console.log(currentProgress);

        const quiz = await this.quizRepositoryCache.findById(quizId);
        //console.log(quiz?.quesions[0]);

        if (!quiz) throw new NotFoundException('Quiz is not found.');

        if (!quiz.start) throw new ConflictException("Quiz is not inicialized.");

        // if (currentProgress + 1 > quiz.quesions.length) throw new QuizFinishedError();
        if (currentProgress + 1 > quiz.questions.length) throw new BadRequestException('Quiz already finished.');

        if (currentProgress + 1 == quiz.questions.length) completed = true;

        const question = quiz.questions.find(el => el.id == currentQuestion);

        // if (!question) throw new QuestionIsNotFoundError();
        if (!question) throw new NotFoundException('Question is not found.');

        // if (!question.answer[answer]) throw new InvalidAnswerError();
        if (!question.answers[answer]) throw new NotFoundException('Invalid answer.');

        const questionAlreadyAnswered = isParticipant.answers.find(el => el.questionId === question.answers[answer].questionId);

        // if (questionAlreadyAnswered) throw new QuestionAlreadyAnsweredError();
        if (questionAlreadyAnswered) throw new ConflictException('Question already answered.');

        if (question.correctAnswer == answer) {
            isCorrectAnswer = true;
            isParticipant.correctAnswers += 1;
        }

        isParticipant.answers.push(question.answers[answer]);

        await this.participantCache.updateParticipant(quizId, isParticipant);

        await this.progressCache.setProgress(isParticipant.id, currentProgress + 1);

        console.log(question.answers);
        console.log("============= resposta enviada =============");
        console.log("reposta: ", answer);
        console.log(question.answers[answer]);
        console.log("progresso atual: ", currentProgress + 1);
        // console.log(`repondido ${currentProgress + 1} de ${quiz.questions.length}`);

        console.log(quiz.questions);

        if (completed) {
            await this.participantRepository.create({
                quizId: quiz.id,
                userId,
                correctAnswers: isParticipant.correctAnswers,
                answers: {
                    connect: isParticipant.answers.map((el) => ({ id: el.id }))
                }
            });
            console.log("============= quiz finalizado =============");
            console.log("quiz finalizado");
            console.log("salvo no banco de dados");
            console.log("============= quiz finalizado =============");
        }

        return {
            quiz,
            isParticipant,
            currentProgress,
            isCorrectAnswer,
            completed
        }

    }

}