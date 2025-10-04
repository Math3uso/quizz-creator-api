export class QuestionIsNotFoundError extends Error {
    constructor() {
        super("Question is not found.");
    }
}