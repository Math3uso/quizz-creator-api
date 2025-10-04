import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/_interfaces/i-user.repository";
import hash from "bcrypt";
import { UserAlreadyExistsError } from "src/common/errors/user-already-exists.error";

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository
    ) { }

    async create({ name, email, password }: CreateUserRequest) {

        const isValidUser = await this.userRepository.findByEmail(email);

        if (isValidUser) throw new UserAlreadyExistsError();

        const passwordHash = await hash.hash(password, 6);
        const user = await this.userRepository.create({ name, email, passwordHash });

        return {
            user
        };
    }
}