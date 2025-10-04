export class QuestionAlreadyAnsweredError extends Error {
    constructor() {
        super("questionalready answered.");
    }
}