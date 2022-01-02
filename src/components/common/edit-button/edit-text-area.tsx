import * as React from "react";
import { Stack } from "@fluentui/react";
import { Button } from "@material-ui/core";
import TextEditor from "../text-editor/text-editor";
import { IAnswer } from "../../../models/answer";

import "./edit-text-area.scss";

interface IEditTextAreaProps {
    answer: IAnswer;
    updateAnswer: () => void;
    handleEditAnswer: (content: string) => void;
}

/** Renders navigation bar */
const EditTextArea: React.FC<IEditTextAreaProps> = props => {

    const formats = [
        'header', 'size','script',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','formula'
    ];

    const modules = {
        formula: true,
        toolbar: [
          [{size: ["normal","large"]}],
          ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
          [{ 'script': 'sub'}, { 'script': 'super' }],
          [{'list': 'ordered'}, {'list': 'bullet'}, 
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          [{ 'align': [] }],
          ['clean'],
          ['formula'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
    };
    
    const renderNavBar = () => {
        return <Stack className="edit-text-area">
            <TextEditor formats={formats} modules={modules} placeholder={"Update your answer"} handleChange={props.handleEditAnswer} value={props.answer.answerDescription} bound={"123edit"}/>
            <Stack horizontal reversed>
                <Button variant="contained" className="post-answer-button" onClick={props.updateAnswer}>Post Answer</Button>
            </Stack>
        </Stack>
    };

    return renderNavBar();
}

export default EditTextArea;