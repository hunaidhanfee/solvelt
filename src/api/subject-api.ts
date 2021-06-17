import { ISubject } from "../models/subject";

let subjects: ISubject[] = [
    {
        subjectDescription: "Physics is all about maths",
        subjectId: "phy",
        subjectName: "Physics"
    }
];

/**
 * Gets subject details.
 * @param subjectId Id of subject to get.
 */
 export const getSubject = (subjectId: string) => {
    console.log("HEY SUB");
    return subjects.find((sub: ISubject) => sub.subjectId === subjectId);
}