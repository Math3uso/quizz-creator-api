import z from "zod";

export const createQuizSchema = z.object({
    title: z.string(),
    description: z.string()
});

export const startQuizSchema = z.object({
    quizId: z.string()
});

export const defaulQuizDataSchema = z.object({
    quizId: z.string()
});

export const quizResultSchema = z.object({
    participantId: z.string()
});

export const updateQuizSchema = z.object({
    quizId: z.string(),
    title: z.string(),
    description: z.string()
});

export type UpdateQuiz = z.infer<typeof updateQuizSchema>;