import { ISubject } from "../models/subject";

let subjects: ISubject[] = [
    {
        subjectDescription: "Physics is all about maths",
        subjectId: "phy",
        subjectName: "Physics"
    },
    {
        subjectDescription: "Physics is all about maths",
        subjectId: "chem",
        subjectName: "Chemistry"
    },
    {
        subjectDescription: "Physics is all about maths",
        subjectId: "math",
        subjectName: "Math"
    }
];

/**
 * Gets subject details.
 * @param subjectId Id of subject to get.
 */
 export const getSubject = (subjectId: string) => {
    return subjects.find((sub: ISubject) => sub.subjectId === subjectId);
}

/**
 * Gets subject details.
 */
 export const getSubjects = () => {
    return subjects;
}