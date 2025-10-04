import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export interface JwtPayload {
    sub: string;      // userId
    email: string;
    username: string;
}


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Pega o token do header
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'supersecret',
        });
    }
    async validate(payload: JwtPayload) {
        // aqui vc pode buscar o usuário no banco se quiser
        console.log("validando");
        //  return { userId: payload.sub, email: payload.email };
        return payload;
    }
}