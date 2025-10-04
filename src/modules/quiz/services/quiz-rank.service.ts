import { Injectable, NotFoundException } from "@nestjs/common";
import { ParticipantRepository } from "src/modules/participant/participant.repository";
import { QuizRepository } from "../quiz.repository";

@Injectable()
export class QuizRankService {
    constructor(
        private readonly participantRepository: ParticipantRepository,
        private readonly quizRepository: QuizRepository
    ) { }

    async execute(quizId: string) {

        const isValidQuiz = await this.quizRepository.findById(quizId);

        if (!isValidQuiz) throw new NotFoundException("Quiz is not found");

        let participants = await this.participantRepository.findAllByQuizId(quizId, "participant");

        participants.sort((a, b) => b.correctAnswers - a.correctAnswers);

        return {
            participants
        }
    }
}