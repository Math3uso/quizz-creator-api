import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IUserRepository } from "src/_interfaces/i-user.repository";
import { UnauthorizedError } from "src/common/errors/unauthorized.error";
import { UserRepository } from "../users/user.repository";
import { UserIsNotFoundError } from "src/common/errors/user-is-not-found.error";
import bcrypt from "bcrypt";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        @Inject(IUserRepository) private readonly userRepository: UserRepository
    ) { }

    async validateUser(email: string, password: string) {

        const user = await this.userRepository.findByEmail(email);

        // if (!user) throw new UserIsNotFoundError();
        if (!user) throw new NotFoundException("User is not found.");

        const isValidPassword = await bcrypt.compare(password, user.passwordHash);

        if (!isValidPassword) throw new UnauthorizedException();

        return {
            user
        }
    }

    async login(user: Prisma.UserCreateInput) {
        console.log(user);
        const payload = { sub: user.id, email: user.email, username: user.name };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}