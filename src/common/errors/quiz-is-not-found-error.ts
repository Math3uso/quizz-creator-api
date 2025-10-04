export class QuizIsNotFoundError extends Error {
    constructor() {
        super("Quiz is not found error.");
    }
}