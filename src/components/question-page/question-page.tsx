import * as React from "react";
import { withRouter } from "react-router-dom"
import { Button } from "@material-ui/core";
import { Text } from "@fluentui/react-northstar";
import { Stack } from "@fluentui/react";
import { IQuestion } from "../../models/question";
import { IAnswer } from "../../models/answer";
import { RouteComponentProps } from "react-router-dom";
import { getQuestionAsync } from "../../api/questions-api";
import { addAnswerAsync, getAnswersAsync, updateAnswerAsync } from "../../api/answers-api";
import Divider from "../common/divider/divider";
import EmojiObjectsTwoToneIcon from '@material-ui/icons/EmojiObjectsTwoTone';
import StarBorderTwoToneIcon from '@material-ui/icons/StarBorderTwoTone';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import AskAQuestion from "../ask-a-question/ask-a-question";
import TextEditor from "../common/text-editor/text-editor";
import katex from "katex";

import "katex/dist/katex.min.css";
import "./question-page.scss"
import { Guid } from "guid-typescript";
import EditButton from "../common/edit-button/edit-button";
window.katex = katex;

interface IQuestionPageState {
    questionActivityState: string;
    questionDetail: IQuestion;
    answersDetails: IAnswer[];
    isAskAQuestionDialogOpen: boolean;
    answerToSubmit: string;
    editedAnswer: string;
}

interface IQuestionPageProps extends RouteComponentProps {
    questionId: string;    
}

class QuestionPage extends React.Component<IQuestionPageProps, IQuestionPageState> {
    params: { questionId: string | undefined } = { questionId: undefined };
    formats = [
        'header', 'size','script',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image','formula'
    ];

    modules = {
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
            answerToSubmit: "",
            editedAnswer: ""
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

    onPostClick = async () => {
        let answerDetail: IAnswer = {
            userId: Guid.create().toString(),
            answerDescription: this.state.answerToSubmit,
            answerId: Guid.create().toString(),
            answerTitle: "",
            questionId: this.params.questionId!,
            isEditClicked: false,
        };

        await addAnswerAsync(answerDetail);
        await this.getAnswersAsync();
    }

    onEditClick = (answerId: string) => {
        let answers = this.state.answersDetails;
        let answer = answers.find((answer: IAnswer)=> answer.answerId === answerId)!;
        let index = answers.indexOf(answer);
        answer.isEditClicked = !answer.isEditClicked;

        answers[index] = answer;
        this.setState({
            answersDetails: answers,
        });
    }

    updateAnswer = () => {
        let answers = this.state.answersDetails;
        let answer = answers.find((answer: IAnswer)=> answer.isEditClicked)!;
        let index = answers.indexOf(answer);
        answer.answerDescription = this.state.editedAnswer;
        answer.isEditClicked = false;

        answers[index] = answer;
        this.setState({
            answersDetails: answers,
        })
    }

    handleEditAnswer = (content: string) => {
        this.setState({
            editedAnswer: content,
        });
    }

    /**
     * Gets the question content.
     */
    getQuestionContent = () => {
        let isEditDisabled = this.state.answersDetails.filter((answer: IAnswer) => answer.isEditClicked);
        return <Stack>
            {this.state.answersDetails.map((answerDetail: IAnswer, index: number) => {
                return <Stack>                    
                        <Divider width="75%" height="0.08rem" marginTop="1rem" marginBottom="1rem"/>
                        <Stack horizontal verticalAlign="center">
                            <Stack className="answer-title-container" >
                                <Text content={answerDetail.answerTitle} className="answer-title"/>
                            </Stack>
                            <Stack horizontal verticalAlign="center" className="edit-option">
                                <Button disabled={isEditDisabled.length > 0} onClick={() => {this.onEditClick(answerDetail.answerId)}} variant="contained" className="edit-option">
                                    <EditTwoToneIcon fontSize="default" className="edit-icon"/>
                                    <Text content="Edit" className="edit-text"/>
                                </Button>
                            </Stack>
                        </Stack>
                    <Text content="Explanation:" className="explanation-text"/>                    
                    <span dangerouslySetInnerHTML={{__html: answerDetail.answerDescription.trim()}} className="answer-description"></span>
                    {answerDetail.isEditClicked && <EditButton answer={answerDetail} updateAnswer={this.updateAnswer} handleEditAnswer={this.handleEditAnswer}/>}
                </Stack>
                
            })}
            <Divider width="75%" height="0.08rem" marginTop="1rem" marginBottom="1rem"/>
            <Text content="New answers should provide a new explanation. Otherwise, edit an answer above." className="answer-note"/>
            {/* <div className="answer-input">
                <Text content="Add an answer" className="answer-placeholder"/>
            </div> */}            
            <TextEditor handleChange={this.handleTextEditorChange} placeholder="Write your answer" formats={this.formats} modules={this.modules} bound={"hunaid"}/>
            <Stack horizontal reversed>
                <Button variant="contained" className="post-answer-button" disabled={this.state.answerToSubmit.trim() == ""} onClick={this.onPostClick}>Post Answer</Button>
            </Stack>
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
                <AskAQuestion 
                    isOpen={this.state.isAskAQuestionDialogOpen} 
                    onClose={this.onAskAQuestionClick} 
                    onSubmit={this.onAskAQuestionClick}
                />
                <div dangerouslySetInnerHTML={{ __html: this.state.answerToSubmit }}>                    
                </div>
            </div>
        );
    }
}

export default (withRouter(QuestionPage));