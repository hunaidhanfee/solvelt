import * as React from "react";
import { TextField } from "@material-ui/core";
import { Text } from "@fluentui/react-northstar";
import { Stack, IStackTokens } from "@fluentui/react";
import { IQuestion } from "../../models/question";
import { IAnswer } from "../../models/answer";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { getQuestionAsync } from "../../api/questions-api";
import { getAnswersAsync } from "../../api/answers-api";
import Divider from "../common/divider/divider";
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import AskAQuestion from "../ask-a-question/ask-a-question";
import CustomizeDialog from "../common/customize-dialog/customize-dialog";
import TextEditor from "../common/text-editor/text-editor";
import katex from "katex";

import "katex/dist/katex.min.css";
import "./question-page.scss"
window.katex = katex;

interface IQuestionPageState {
    questionActivityState: string;
    questionDetail: IQuestion;
    answersDetails: IAnswer[];
    isAskAQuestionDialogOpen: boolean;
    answerToSubmit: string;
}

interface IQuestionPageProps extends RouteComponentProps {
    questionId: string;    
}

class QuestionPage extends React.Component<IQuestionPageProps, IQuestionPageState> {
    params: { questionId: string | undefined } = { questionId: undefined };


    constructor(props: IQuestionPageProps) {
        super(props);
        let queryParams = this.props.match.params as { questionId?: string | undefined};
        this.params.questionId = queryParams.questionId;

        this.state = {
            questionActivityState: "",
            questionDetail: {
                questionId: "",
                questionDescription: "",
                questionTitle: "",
                userId: "",  
            },
            answersDetails: [],
            isAskAQuestionDialogOpen: false,
            answerToSubmit: "<p></p>"
        }
    }

    componentDidMount() {
        this.getQuestionAsync();
        this.getAnswersAsync();
    }

    /**
     * Get question details
     */
    getQuestionAsync = async () => {
        let response = await getQuestionAsync(this.params.questionId!);
        this.setState({
            questionDetail: response!,
        })
    }

    /**
     * Get question details
     */
     getAnswersAsync = async () => {
         let response = await getAnswersAsync(this.params.questionId!);
        this.setState({
            answersDetails: response!,
        })
    }

    /**
     * Gets the question header.
     */
     getQuestionPageHeader = () => {
        return <div className="question-page-header">
            <Text content={this.state.questionDetail.questionTitle} className="question-title" />
        </div>
    }

    /**
     * Handle when user wrtie answer.
     * @param content Content from text editor.
     */
    handleTextEditorChange = (content: string) => {
        this.setState({
            answerToSubmit: content,
        })
    }

    /**
     * Gets the question content.
     */
    getQuestionContent = () => {
        return <Stack>
            {this.state.answersDetails.map((answerdetail: IAnswer, index: number) => {
                return <Stack>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="answer-title-container" >
                                <Text content={answerdetail.answerTitle} className="answer-title"/>
                            </Stack>
                            <Stack horizontal verticalAlign="center" className="edit-option">
                                <EditTwoToneIcon fontSize="default" className="edit-icon"/>
                                <Text content="Edit" className="edit-text"/>
                            </Stack>
                        </Stack>
                    <Text content="Explanation:" className="explanation-text"/>                    
                    <Text content={answerdetail.answerDescription.trim()} className="answer-description"/>
                </Stack>
            })}
            <Divider width="75%" height="0.08rem" marginTop="1rem" marginBottom="1rem"/>
            <Text content="New answers should provide a new explanation. Otherwise, edit an answer above." className="answer-note"/>
            {/* <div className="answer-input">
                <Text content="Add an answer" className="answer-placeholder"/>
            </div> */}            
            <TextEditor handleChange={this.handleTextEditorChange} placeholder="Write your answer"/>
        </Stack>
    }

    /**
     * Get actions.
     */
    getActions = () => {
        return <Stack>
            <Stack horizontal className="action-container" verticalAlign="center" onClick={this.onAskAQuestionClick}>
                <EmojiObjectsTwoToneIcon fontSize="large" className="icon"/>
                <Text content="Ask a question" className="action-text"/>
            </Stack>
            <Stack horizontal className="action-container" verticalAlign="center">
                <StarBorderTwoToneIcon fontSize="large" className="icon"/>            
                <Text content="Answer questions" className="action-text"/>
            </Stack>
        </Stack>    
    }

    /**
     * Gets the question container.
     * @returns Question container.
     */
     getQuestionContainer = () => {
        return <div>
            <Stack horizontal>
                <Stack >
                    <div className="question-description-container">
                        {this.state.questionDetail.questionDescription.trim() !== "" && 
                            <Text content={this.state.questionDetail.questionDescription.trim()} className="question-description"/>
                        }
                    </div>
                    <Stack horizontal >
                        <Stack className="question-content">
                            <Text content={`${this.state.answersDetails.length} Answer`} className="answers-count"/>
                            <Divider width="75%" height="0.08rem" marginTop="1rem" marginBottom="1rem"/>
                            {this.getQuestionContent()}
                        </Stack>
                        <Stack className="question-page-options">
                            {this.getActions()}
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </div>
    }

    /**
     * Handler when user click on ask a question.
     */
     onAskAQuestionClick = () => {
        this.setState((prevState: IQuestionPageState) => (
        {
            isAskAQuestionDialogOpen: !prevState.isAskAQuestionDialogOpen,
        }));
    }

    /**
     * Handle when question text field change.
     * @param value The value of the Text Area
     */
    onQuestionTextAreaChange = (value: string) => {
        console.log(value);
    }

    /** Renders component */
    render() {
        
        return (
            <div className="question-page-container">
                
                
                
                <div>
                    {this.getQuestionPageHeader()}
                </div>
                <div>
                    {this.getQuestionContainer()}
                </div>
                <CustomizeDialog
                    isOpen={this.state.isAskAQuestionDialogOpen} 
                    onClose={this.onAskAQuestionClick} 
                    onSubmit={this.onAskAQuestionClick} 
                    content={<AskAQuestion onChange={this.onQuestionTextAreaChange}/>}
                />
                <div>
                    HUnaid
                </div>
                <div dangerouslySetInnerHTML={{ __html: this.state.answerToSubmit }}>
                    
                </div>
            </div>
        );
    }
}

export default (withRouter(QuestionPage));
