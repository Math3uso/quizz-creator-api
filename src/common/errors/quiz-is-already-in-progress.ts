export class QuizIsAlreadyInProgress extends Error {
    constructor() {
        super("Quiz is already in progress.");
    }
}