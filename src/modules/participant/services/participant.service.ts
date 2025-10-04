import { Injectable, NotFoundException } from "@nestjs/common";
import { ParticipantRepository } from "../participant.repository";

@Injectable()
export class ParticipantService {
    constructor(
        private readonly participantRepository: ParticipantRepository
    ) { }

    async execute(userId: string) {
        const participant = await this.participantRepository.findAllByUserId(userId);

        if (!participant) throw new NotFoundException("Participant is not found");

        return {
            participant
        }
    }
}