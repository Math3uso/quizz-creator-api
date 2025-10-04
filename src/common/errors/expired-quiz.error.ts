export class ExpiredQuizError extends Error {
    constructor() {
        super("quiz expired, try launching again");
    }
}