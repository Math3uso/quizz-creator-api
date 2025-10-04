import { Global, Module } from "@nestjs/common";
import Redis from 'ioredis';
import { QuizCacheService } from "./cache/quiz.cache.service";
import { ParticipanCachetService } from "./cache/participante.cache.service";
import { ProgressCacheService } from "./cache/progress.cache.service";

@Global()
@Module({
    providers: [
        {
            provide: 'REDIS_CLIENT',
            useFactory: () => {
                return new Redis({
                    host: 'localhost',
                    port: 6379
                })
            }
        },
        QuizCacheService,
        ParticipanCachetService,
        ProgressCacheService
    ],
    exports: ['REDIS_CLIENT', QuizCacheService, ParticipanCachetService, ProgressCacheService]
})
export class RedisModule { }