import { Injectable } from "@nestjs/common";
import { Prisma, User } from "@prisma/client";
import { IUserRepository } from "src/_interfaces/i-user.repository";
import { PrismaService } from "src/modules/prisma/prisma.service";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(private readonly prisma: PrismaService) { }
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await this.prisma.user.create({ data });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }
    async findById(id: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { id }
        });
    }

}