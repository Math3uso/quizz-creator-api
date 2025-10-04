import { Controller, Get, UseGuards } from "@nestjs/common";
import { User } from "src/decorators/user.decorator";
import { JwtAuthGuard } from "src/modules/auth/jwt-auth.guard";
import type { JwtPayload } from "src/modules/auth/jwt.strategy";
import { ParticipantService } from "../services/participant.service";

@Controller("participant")
export class ParticipantController {
    constructor(
        private readonly participantService: ParticipantService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("participated")
    async execute(@User() user: JwtPayload) {

        try {
            const { participant } = await this.participantService.execute(user.sub);
            return {
                participant
            }

        } catch (error) {
            throw error;
        }
    }
}