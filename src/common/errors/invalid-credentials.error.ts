export class InvalidCredentialsError extends Error {
    constructor() {
        super("credenciais invalidas");
    }
}