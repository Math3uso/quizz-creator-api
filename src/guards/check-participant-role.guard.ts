import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "src/modules/auth/jwt.strategy";
import { ParticipantRepository } from "src/modules/participant/participant.repository";
import z, { string } from "zod";

const basicInfoBody = z.object({
    quizId: string()
});

@Injectable()
export class CheckParticipantRoleGuard implements CanActivate {
    constructor(private readonly participanRepository: ParticipantRepository) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {

        try {
            const request: Request & { user: JwtPayload } = context.switchToHttp().getRequest();

            const { quizId } = basicInfoBody.parse(request.body);

            const isAdmin = await this.participanRepository.findByUserIdAndQuizId(request.user.sub, quizId);

            if (!isAdmin) throw new UnauthorizedException();

            return true;
        } catch (error) {
            throw error;
        }

    }

}