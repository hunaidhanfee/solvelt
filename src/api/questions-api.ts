import { IQuestion } from "../models/question";

let questions: IQuestion[] = [
    {
        userId: "A",
        questionId: "1",
        questionTitle: "What is react?",
        questionDescription: "",
    },
    {
        userId: "B",
        questionId: "2",
        questionTitle: "What is description?",
        questionDescription: "You can see I have added some question descripiton here.",
    },
    {
        userId: "C",
        questionId: "3",
        questionTitle: "This sample Title 3",
        questionDescription: "Question description 3",
    },
    {
        userId: "D",
        questionId: "4",
        questionTitle: "This sample Title 4",
        questionDescription: "Question description 4",
    }
]

/**
 * Gets the question details.
 * @param questionId Question Id of question to get.
 * @returns Question details.
 */
 export const getQuestionAsync = async (questionId: string) => {
    return questions.find((question: IQuestion) => question.questionId === questionId);
}

/**
 * Gets the questions.
 * @returns Questions.
 */
 export const getQuestionsAsync = async () => {
    return questions;
}

/**
 * Add a questions.
 * @param questionId Question Id of question to get.
 */
 export const addQuestionAsync = async (questionDetail: IQuestion) => {
    questions.push(questionDetail);
}