import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global() // pode ser usando sem imports
@Module({
    providers: [PrismaService],
    exports: [PrismaService] // aq permite imports, mas graças ao global n será necessario
})
export class PrismaModule { } // seus providers podem ser injetados