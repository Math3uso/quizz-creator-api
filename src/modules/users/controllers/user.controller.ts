import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserService } from "../user.service";
import { UserAlreadyExistsError } from "src/common/errors/user-already-exists.error";
import { createUserSchema } from "src/schemas/create-user.schema";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createNewUser(@Body() body: any) {

        try {

            const { name, email, password } = createUserSchema.parse(body);

            const { user } = await this.userService.create({ name, email, password });

            return {
                message: "usuario criado",
                user
            }
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                throw new HttpException(
                    {
                        message: 'Esse e-mail já está cadastrado',
                    },
                    HttpStatus.BAD_REQUEST
                );
            }
            throw error;
        }
    }
}