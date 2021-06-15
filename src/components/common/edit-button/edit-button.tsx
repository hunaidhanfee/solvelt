import * as React from "react";
import { Text } from "@fluentui/react-northstar";
import { Stack } from "@fluentui/react";
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import { Button } from "@material-ui/core";
import TextEditor from "../text-editor/text-editor";
import { IAnswer } from "../../../models/answer";
import { updateAnswerAsync } from "../../../api/answers-api";

interface IEditButtonProps {
    answer: IAnswer;
    updateAnswer: () => void;
    handleEditAnswer: (content: string) => void;
}
/** Renders navigation bar */
const EditButton: React.FC<IEditButtonProps> = props => {
    const [description, setDescription] = React.useState("");

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
        return <Stack>
            <TextEditor formats={formats} modules={modules} placeholder={"Update your answer"} handleChange={props.handleEditAnswer} value={props.answer.answerDescription} bound={"123edit"}/>
            <Stack horizontal reversed>
                <Button variant="contained" className="post-answer-button" onClick={props.updateAnswer}>Post Answer</Button>
            </Stack>
        </Stack>
    };

    return renderNavBar();
}

export default EditButton;