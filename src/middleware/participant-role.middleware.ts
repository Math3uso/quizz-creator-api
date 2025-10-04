import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction } from "express";

@Injectable()
export class ParticipantRoleMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        console.log("middleware");
        next();
    }
}