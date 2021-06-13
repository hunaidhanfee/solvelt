import * as React from "react";
import { TextField } from "@material-ui/core";
import { Text } from "@fluentui/react-northstar";
import { Stack, IStackTokens } from "@fluentui/react";
import "./ask-a-question.scss"

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

interface IAskAQuestionProps {
    onChange: (value: string) => void;
}

const AskAQuestion: React.FC<IAskAQuestionProps> = props => {
    let [questionTitle, setQuestionTitle] = React.useState("");
    let [questionDescription, setQuestionDescription] = React.useState("");

    const render = () => {
        return (
            <Stack tokens={horizontalGapStackTokens} className="ask-a-question-content">
                <Text content="Question" className="question-header"/>
                <TextField
                    id="outlined-multiline-static"
                    placeholder="What's you question?"
                    multiline
                    rows={5}
                    onChange={(event: any) => props.onChange(event.target.value)}
                />
                <div>
                    <Text content="Details" className="question-header"/>
                    <Text content=" (optional)" className="optional-text"/>
                </div>
            </Stack>
        );
    }

    /** Renders component */
    return render();
}

export default AskAQuestion;