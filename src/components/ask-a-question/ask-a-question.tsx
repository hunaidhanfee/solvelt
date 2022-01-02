import * as React from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { Text } from "@fluentui/react-northstar";
import { Stack, IStackTokens } from "@fluentui/react";
import TextEditor from "../common/text-editor/text-editor";
import { addQuestionAsync } from "../../api/questions-api";
import { IQuestion } from "../../models/question";
import { Guid } from "guid-typescript";

import "./ask-a-question.scss"

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

interface IAskAQuestionProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

const AskAQuestion: React.FC<IAskAQuestionProps> = props => {
    let [questionTitle, setQuestionTitle] = React.useState("");
    let [questionDescription, setQuestionDescription] = React.useState("");

    const modules = {
        formula: true,
        toolbar: [
          ['bold', 'italic', 'underline'],
          [{ 'script': 'sub'}, { 'script': 'super' }, 'formula'],
          ['link', 'image'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
    }

    const formats = [
        'script',
        'bold', 'italic', 'underline',
        'link', 'image',
        'formula'
    ]

    const onSubmit = async () => {
        //#TODO Need to update USERID
        if (questionTitle.trim() !== "" && questionDescription !== "") {
            let questionDetail: IQuestion = {
                questionDescription: questionDescription,
                questionId: Guid.create().toString(),
                questionTitle: questionTitle,
                userId: Guid.create().toString(),
                subjectId: "phy"
            }
            await addQuestionAsync(questionDetail);
            props.onSubmit();
        }
        else {
            props.onSubmit();
        }
    }

    const renderDialog = () => {
        return <Dialog onClose={() => {}} open={props.isOpen} maxWidth="lg" disableBackdropClick={false}>
        <DialogTitle className="customized-dialog-title">
          <span style={{fontWeight: 700, color: "#333333"}}>
            Ask a question
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="customized-dialog-content">
            {render()}
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit} className="customized-dialog-button">
            Post question
          </Button>
        </DialogActions>
      </Dialog>
    }
    

    const render = () => {
        return (
            <Stack tokens={horizontalGapStackTokens} className="ask-a-question-content">
                <Text content="Question" className="question-header"/>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="What's you question?"
                    multiline
                    rows={5}
                    onChange={(event: any) => {setQuestionTitle(event.target.value)}}
                />
                <div>
                    <div className="detail-text-container">
                        <Text content="Details" className="question-header"/>
                        <Text content=" (optional)" className="optional-text"/>
                    </div>
                    <TextEditor handleChange={(content: string) => {setQuestionDescription(content)}} placeholder="Write question" formats={formats} modules={modules} bound="ask-a-question-editor"/>
                </div>
            </Stack>
        );
    }

    /** Renders component */
    return renderDialog();
}

export default AskAQuestion;