import { IStackTokens, Stack } from "@fluentui/react";
import { List, ListItem, ListItemText } from "@material-ui/core"
import { Text } from "@fluentui/react-northstar";
import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom"
import { IQuestion } from "../../models/question";
import { ISubSubject } from "../../models/sub-subject";
import Header from "../common/header/header";
import Divider from "../common/divider/divider";
import { getQuestionsBySubjectIdAsync } from "../../api/questions-api";
import { getTopicsBySubjectId } from "../../api/sub-subject-api";

import "./subject-page.scss";

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

interface ISubjectPageState {
    questions: IQuestion[];
    subjectId: string;
    topics: ISubSubject[];
}

interface ISubjectPageProps extends RouteComponentProps {
}

class SubjectPage extends React.Component<ISubjectPageProps, ISubjectPageState> {
    constructor (props: ISubjectPageProps){
        super(props);

        this.state = {
            questions: [],
            subjectId: "phy",
            topics: [],
        };
    }

    componentDidMount() {
        this.getQuestionsAsync();
        this.getTopicsAsync();
    }

    getQuestionsAsync = async () => {
        let response = await getQuestionsBySubjectIdAsync(this.state.subjectId)!;
        this.setState({
            questions: response,
        });
    }

    getTopicsAsync = async () => {
        let response = getTopicsBySubjectId(this.state.subjectId)!;
        this.setState({
            topics: response,
        });
    }

    /**
     * Handles when user click on question.
     * @param questionId Id of question to open.
     */
    onQuestionItemClick = (questionId: string) => {
        window.open(`/question/${questionId}`, "_self");
    }

    /**
     * Renders the sub category list.
     */
    renderSubCategoryList = () => {
        return <Stack className="sub-category-list" horizontalAlign="center">
            <Text content="Topics"/>
            <List component="nav" aria-label="secondary mailbox folders">
                {this.state.topics.map((topic: ISubSubject) => <ListItem button>
                    <ListItemText primary={topic.subSubjectName} />
                </ListItem>)}
            </List>
        </Stack>
    }

    /**
     * Renders the questions list.
     */
    renderQuestionsList = () => {
        return this.state.questions.map((question: IQuestion) => 
            <div >
            <Stack horizontal tokens={horizontalGapStackTokens} verticalAlign="center" className="question-info-container" >
                <Stack className="question-item">
                    <Text className="question-title" content={question.questionTitle} onClick={() => this.onQuestionItemClick(question.questionId)}/>
                    <span className="question-info" dangerouslySetInnerHTML={{__html: question.questionDescription}}></span>
                </Stack>

                <Stack horizontalAlign="end" className="answer-count-container">
                    <Stack className="answer-count">
                        <Text className="answer-number" content="1"/>
                        <Text content="Answered"/>
                    </Stack>
                </Stack>
            </Stack>
            <Divider width="auto" height="0.1rem" marginTop="auto" marginBottom="auto"/>
        </div>
        );
    }

    renderAboutSubject = () => {
        let a = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Diam sollicitudin tempor id eu nisl nunc mi ipsum. Mi in nulla posuere sollicitudin aliquam ultrices";
        return <Stack>
            <Text className="about-subject-header" content="About this subject!"/>
            <Text className="about-subject-text" content={a}/>
            <Text className="about-subject-header " content="Questions"/>
            {this.renderQuestionsList()}
        </Stack>
    }

    renderBody = () => {
        return <Stack>
            <Stack horizontal>
                <Stack className="about-subject-container">
                    {this.renderAboutSubject()}
                </Stack>
                <Stack className="right-bar" horizontalAlign="center">
                    {this.renderSubCategoryList()}
                </Stack>
            </Stack>
        </Stack>
    }

    render() {
        return <div className="subject-page">
            <Header subjectId="phy"/>
            {this.renderBody()}
        </div>
    }
}

export default (withRouter(SubjectPage));