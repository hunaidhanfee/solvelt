import { ArrowForwardIosOutlined } from "@material-ui/icons";
import { IAnswer } from "../models/answer";

let answers: IAnswer[] = [
    {
        userId: "A",
        questionId: "1",
        answerId: "1",
        answerTitle: "React is a JavaScript library",
        answerDescription: "React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It’s ‘V’ in MVC. ReactJS is an open-source, component-based front end library responsible only for the view layer of the application. It is maintained by Facebook.",
        isEditClicked: false,
    },
    {
        userId: "B",
        answerId: "2",
        questionId: "2",
        answerTitle: "A spoken or written representation or account of a person, object, or event.",
        answerDescription: "Get some descripiton based on my title.",
        isEditClicked: false,
    },
    {
        userId: "C",
        answerId: "3",
        questionId: "2",
        answerTitle: "This sample Title 3",
        answerDescription: "Answer description 3",
        isEditClicked: false,
    },
    {
        userId: "D",
        answerId: "4",
        questionId: "4",
        answerTitle: "This sample Title 4",
        answerDescription: "Answer description 4",
        isEditClicked: false,
    }
]

/**
 * Gets the answers of question.
 * @param questionId Question Id to fetch answers.
 * @returns Answers.
 */
 export const getAnswersAsync = async (questionId: string) => {
    return answers.filter((answer: IAnswer) => answer.questionId === questionId);
}

/**
 * Add answer of question.
 * @param answerDetail Answer to be added.
 */
 export const addAnswerAsync = async (answerDetail: IAnswer) => {
    answers.push(answerDetail);
}

/**
 * Add answer of question.
 * @param answerId Answer to be added.
 */
 export const updateAnswerAsync = async (answerId: string, updatedAnswer: IAnswer) => {
    let answer = answers.find((answer: IAnswer) => answer.answerId === answerId)!;
    answer.answerDescription = updatedAnswer.answerDescription;
    answer.answerTitle = updatedAnswer.answerTitle;
    let index = answers.indexOf(answer);
    answers[index] = answer;
}