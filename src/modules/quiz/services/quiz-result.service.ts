import { Injectable, NotFoundException } from "@nestjs/common";
import { ParticipantRepository } from "src/modules/participant/participant.repository";

@Injectable()
export class QuizResultService {
    constructor(
        private readonly participantRepository: ParticipantRepository
    ) { }

    async execute(participantId: string) {

        const details = await this.participantRepository.findDetails(participantId);
        if (!details) throw new NotFoundException("Participant not found");

        details.quiz?.questions.forEach(q => q.correctAnswer = null);

        return {
            correctAnswers: details.correctAnswers,
            quizId: details.quizId,
            participantId: details.id,
            quiz: {
                id: details.quiz?.id,
                title: details.quiz?.title,
                description: details.quiz?.description,
                questions: details.quiz?.questions,
            },
        }
    }
}