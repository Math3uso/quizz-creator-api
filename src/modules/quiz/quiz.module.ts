import { Module } from "@nestjs/common";
import { CreateQuizController } from "./controllers/create-quiz.controller";
import { QuizService } from "./services/quiz.service";
import { QuizRepository } from "./quiz.repository";
import { AuthModule } from "../auth/auth.module";
import { QuizStartController } from "./controllers/start-quiz.controller";
import { RedisModule } from "../redis/redis.module";
import { QuizRepositoryCache } from "./quiz.repository.cache";
import { AnswerQuestionController } from "./controllers/answer-question.controller";
import { QuizAnswerService } from "./services/quiz-answer.service";
import { ResetProgressController } from "./controllers/reset-progress.controller";
import { QuizResetProgressService } from "./services/quiz-reset-progress.service";
import { ParticipantModule } from "../participant/participant.module";
import { QuizResultService } from "./services/quiz-result.service";
import { QuizResultController } from "./controllers/result-quiz.controller";
import { QuizDeleteController } from "./controllers/delete-quiz.controller";
import { QuizDeleteService } from "./services/quiz-delete.service";
import { QuizRankController } from "./controllers/rank-quiz.controller";
import { QuizRankService } from "./services/quiz-rank.service";
import { QuizUpdateController } from "./controllers/update-quiz.controller";
import { QuizUpdateService } from "./services/quiz-update.service";

@Module({
    imports: [AuthModule, RedisModule, ParticipantModule],
    controllers: [CreateQuizController, QuizStartController, AnswerQuestionController, ResetProgressController, QuizResultController, QuizDeleteController, QuizRankController, QuizUpdateController],
    providers: [QuizService, QuizRepository, QuizRepositoryCache, QuizAnswerService, QuizResetProgressService, QuizResultService, QuizDeleteService, QuizRankService, QuizUpdateService],
    exports: [QuizRepository],

})
export class QuizModule { }