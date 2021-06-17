import { IReply } from "../models/reply";

let replies: IReply[] = [
    {
        answerId: "1",
        replyId: "A",
        replyText: "Razor takes care of rendering your HTML based on the data in your model, while also supporting various conditionals and loops. On the other hand, Blazor is a technology similar to ASP.NET Core & ASP.NET MVC in that. It powers web applications It uses Razor as its template syntax for the creation of UI. A common point of misconception is that Blazor uses Razor. This further exacerbated by two other similar terms – Blazor components and Razor components. Those are widely used interchangeably but the correct terminology is Razor Component. A component is the combination of markup (written in HTML) and logic (in C#) in a single Razor file (with the .cshtml extension).",
        userId: "a",
        questionId: "1",
    }
];

/**
 * Gets the replies for an answer.
 * @param answerId Answer Id to fetch replies.
 * @returns Replies.
 */
 export const getRepliesByAnswerIdAsync = async (answerId: string) => {
    return replies.filter((reply: IReply) => reply.answerId === answerId);
}

/**
 * Submit reply for an answer
 * @param reply Reply to be added.
 */
 export const submitReplyAsync = async (reply: IReply) => {
    replies.push(reply);
}

/**
 * Get replies for a question.
 * @param answerId Question Id to fetch replies.
 */
 export const getRepliesByQuestionIdAsync = async (questionId: string) => {
    return replies.filter((reply: IReply) => reply.questionId === questionId);
}