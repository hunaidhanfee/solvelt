import { IAnswer } from "../models/answer";

let questions: IAnswer[] = [
    {
        userId: "A",
        questionId: "1",
        answerId: "1",
        answerTitle: "React is a JavaScript library",
        answerDescription: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It’s ‘V’ in MVC. ReactJS is an open-source, component-based front end library responsible only for the view layer of the application. It is maintained by Facebook.",
    },
    {
        userId: "B",
        answerId: "2",
        questionId: "2",
        answerTitle: "A spoken or written representation or account of a person, object, or event.",
        answerDescription: "Get some descripiton based on my title.",
    },
    {
        userId: "C",
        answerId: "3",
        questionId: "3",
        answerTitle: "This sample Title 3",
        answerDescription: "Answer description 3",
    },
    {
        userId: "D",
        answerId: "4",
        questionId: "4",
        answerTitle: "This sample Title 4",
        answerDescription: "Answer description 4",
    }
]

/**
 * Gets the answers of question.
 * @param questionId Question Id to fetch answers.
 * @returns Answers.
 */
 export const getAnswersAsync = async (questionId: string) => {
    return questions.filter((answer: IAnswer) => answer.questionId === questionId);
}