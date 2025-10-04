import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { QuestionRepository } from "./question.repository";
import { CreateQuestion } from "src/schemas/question.schemas";
import { QuizRepository } from "../quiz/quiz.repository";


@Injectable()
export class QuestionService {
    constructor(
        private readonly questionRepository: QuestionRepository,
        private readonly quizRepository: QuizRepository
    ) { }

    async create({ quizId, question, correctAnswer, answer }: CreateQuestion) {


        const isValidQuiz = await this.quizRepository.findById(quizId);
        if (!isValidQuiz) throw new NotFoundException("Quiz is not found.");

        if (isValidQuiz.start) throw new BadRequestException("quiz already started");

        const createdQuestion = await this.questionRepository.create({ quizId, question, correctAnswer });

        const createdAnswers = await Promise.all(
            answer.map(el => (
                this.questionRepository.createAnswer({
                    content: el.content,
                    questionId: createdQuestion.id
                })
            ))
        );

        return {
            id: createdQuestion.id,
            quizId: createdQuestion.quizId,
            question,
            answers: createdAnswers
        }

    }
}