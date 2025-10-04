import { Module } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { QuestionService } from "./question.service";
import { CreteQuestionController } from "./controllers/create-question.controller";
import { AuthModule } from "../auth/auth.module";
import { QuizModule } from "../quiz/quiz.module";

@Module({
    imports: [AuthModule, QuizModule],
    controllers: [CreteQuestionController],
    providers: [QuestionRepository, QuestionService],
    exports: [QuestionRepository]
})
export class QuestionModule { }