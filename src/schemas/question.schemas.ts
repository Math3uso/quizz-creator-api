import z, { string } from "zod";

export const createQuestionSchema = z.object({
    quizId: z.string(),
    question: z.string(),
    correctAnswer: z.number(),
    answer: z.array(z.object({
        content: z.string()
    }))
});

export type CreateQuestion = z.infer<typeof createQuestionSchema>;