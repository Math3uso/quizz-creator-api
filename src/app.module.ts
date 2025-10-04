import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionModule } from './modules/question/question.module';
import { RedisModule } from './modules/redis/redis.module';

@Module({
  imports: [UserModule, PrismaModule, AuthModule, QuizModule, QuestionModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
