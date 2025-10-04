export class ParticipantIsNotFoundError extends Error {
    constructor() {
        super("Participant not found or quiz not initialized.");
    }
}