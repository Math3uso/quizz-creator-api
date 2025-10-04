import { Injectable } from "@nestjs/common";
import { ParticipanCachetService } from "src/modules/redis/cache/participante.cache.service";
import { ProgressCacheService } from "src/modules/redis/cache/progress.cache.service";
import { ParticipantIsNotFoundError } from "src/common/errors/participant-is-not-found.error";

interface ResetProgressRequest {
    userId: string;
    quizId: string;
}

@Injectable()
export class QuizResetProgressService {
    constructor(
        private readonly participantCache: ParticipanCachetService,
        private readonly progressCache: ProgressCacheService
    ) { }

    async execute({ userId, quizId }: ResetProgressRequest) {
        const participant = await this.participantCache.getParticipantById({ userId, quizId });

        if (!participant) throw new ParticipantIsNotFoundError();

        await this.progressCache.deleteProgress(participant.id);
        await this.participantCache.deleteParticipant({ userId, quizId });

        return;
    }
}