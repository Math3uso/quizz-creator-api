export class UserIsNotFoundError extends Error {
    constructor() {
        super("user is not found error");
    }
}