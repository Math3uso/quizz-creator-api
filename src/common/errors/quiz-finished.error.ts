export class QuizFinishedError extends Error {
    constructor() {
        super("Quiz finished.");
    }
}