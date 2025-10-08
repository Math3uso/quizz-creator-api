import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";
import { CreteQuestionController } from "./controllers/create-question.controller";
import { AuthModule } from "../auth/auth.module";
import { QuizModule } from "../quiz/quiz.module";
import { ParticipantModule } from "../participant/participant.module";

@Module({
    imports: [AuthModule, QuizModule, ParticipantModule],
    controllers: [CreteQuestionController],
    providers: [QuestionRepository, QuestionService],
    exports: [QuestionRepository]
})
export class QuestionModule {
    // configure(consumer: MiddlewareConsumer) {
    //     consumer.apply(ParticipantRoleMiddleware).forRoutes({ path: "question", method: RequestMethod.POST })
    // }
}