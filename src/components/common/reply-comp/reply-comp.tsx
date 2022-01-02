import * as React from "react";
import { Stack } from "@fluentui/react";
import { TextField, Button } from "@material-ui/core";
import { submitReplyAsync } from "../../../api/reply-api";
import { IReply } from "../../../models/reply";
import { Guid } from "guid-typescript";
import Divider from "../divider/divider";

import "./reply-comp.scss";

interface IReplyCompProps {
    questionId: string;
    answerId: string;
    userId: string;
    onReplySubmit: (answerId: string) => void;
}

/** Renders navigation bar */
const ReplyComp: React.FC<IReplyCompProps> = props => {
    let [replyText, setReplyText] = React.useState("");

    const onReplySubmitClick = async () => {
        let reply: IReply = {
            questionId: props.questionId,
            answerId: props.answerId,
            replyId: Guid.create().toString(),
            replyText: replyText,
            userId: props.userId,
        }

        await submitReplyAsync(reply);
        props.onReplySubmit(props.answerId);
        setReplyText("");
    }
    
    const renderReply = () => {
        return <Stack className="reply-text-area">
            <Divider width="80%" height="0.08rem" marginTop="1rem" marginBottom="1rem"/>
            <TextField 
                placeholder="Write reply to the answer"
                multiline
                rows={5}
                onChange={(event: any) => {setReplyText(event.target.value)}}
                className="reply-text-field"
            />
            <Stack horizontal reversed>
                <Button variant="contained" className="post-answer-button" onClick={onReplySubmitClick}>Post Reply</Button>
            </Stack>
    </Stack>
    };

    return renderReply();
}

export default ReplyComp;