import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./controllers/user.controller";
import { UserRepository } from "./user.repository";
import { IUserRepository } from "src/_interfaces/i-user.repository";

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        {
            provide: IUserRepository, // token
            useClass: UserRepository,   // classe concreta
        },
    ],

    exports: [IUserRepository]
})
export class UserModule { }
