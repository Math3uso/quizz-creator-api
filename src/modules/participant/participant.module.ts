import { Module } from "@nestjs/common";
import { PrismaModule } from "../prisma/prisma.module";
import { ParticipantService } from "./services/participant.service";
import { ParticipantRepository } from "./participant.repository";
import { ParticipantController } from "./controller/participant.controller";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [ParticipantController],
    providers: [ParticipantRepository, ParticipantService],
    exports: [ParticipantRepository],
})
export class ParticipantModule { }