import { ISubSubject } from "../models/sub-subject";

let subSubjects: ISubSubject[] = [
    {
        subSubjectDescription: "Physics is all about maths",
        subjectId: "phy",
        subSubjectName: "Physics A",
        subSubjectId: "ph1"
    },
    {
        subSubjectDescription: "Physics is all about maths",
        subjectId: "phy",
        subSubjectName: "Physics B",
        subSubjectId: "ph2"
    }
];

/**
 * Gets sub-subject details.
 * @param subSubjectId Id of subject to get.
 */
 export const getSubSubject = (subSubjectId: string) => {
     console.log("HEY SUBSUB");
    return subSubjects.find((sub: ISubSubject) => sub.subjectId === subSubjectId);
}

/**
 * Gets sub-subject details.
 * @param subSubjectId Id of subject to get.
 * @param subjectId Id of subject to get.
 */
 export const isSubjectFound = (subSubjectId: string, subjectId: string) => {
    let subSubject = subSubjects.find((sub: ISubSubject) => sub.subSubjectId === subSubjectId)!;
    return subSubject.subjectId === subjectId;
}