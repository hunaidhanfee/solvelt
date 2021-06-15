import * as React from "react";
import { Tabs, Tab, Slide } from "@material-ui/core";
import { Text } from "@fluentui/react-northstar";
import { Stack, IStackTokens } from "@fluentui/react";
import { IQuestion } from "../../models/question";
import CustomizeDialog from "../common/customize-dialog/customize-dialog"
import AskAQuestion from "../ask-a-question/ask-a-question"
import NavBar from "../common/nav-bar/nav-bar"
import Divider from "../common/divider/divider";
import { getQuestionsAsync}  from "../../api/questions-api";

import "./home.scss";

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

interface IHomeState {
    questionActivityState: number;
    questionsList: IQuestion[];
    isAskAQuestionDialogOpen: boolean;
}

interface IHomeProps {
}

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            questionActivityState: 0,            
            questionsList: [],
            isAskAQuestionDialogOpen: false,
        }   
    }

    componentDidMount() {
        this.getQuestionsAsync();
    }

    getQuestionsAsync = async () => {
        let response = await getQuestionsAsync();
        this.setState({
            questionsList: response,
        })
    }

    /**
     * Gets the header image.
     * @returns Header image
     */
    getImageHeader = () => {
        return (<div className="home=header">
            <img src="/images/Solvelt.png" className="header-image"/>
        </div>);
    }

    /**
     * Renders Questions/Activity tab.
     * @returns Return question activity tab.
     */
    getQuestionActivityTab = () => {
        return <Tabs
        value={this.state.questionActivityState}
        onChange={this.handleQuestionActivityTabChange}
        className="tabs-container"
      >
        <Tab label="Questions" />
        <Tab label="Activity" />
      </Tabs>
    }

    /**
     * Handler when user select tab.
     * @param event Event info.
     * @param state State selected by user.
     */
    handleQuestionActivityTabChange = (event: any, state: number) => {
        this.setState({
            questionActivityState: state,
        })
    }

    /**
     * Handler when user click on ask a question.
     */
    onAskAQuestionClick = () => {
        this.setState((prevState: IHomeState) => (
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

    onQuestionItemClick = (questionId: string) => {
        window.open(`/question/${questionId}`, "_self");
    }

    /**
     * Renders the questions list.
     */
    renderQuestionList = () => {
        return this.state.questionsList.map((question: IQuestion, index: number) => 
            <div >
                <Stack horizontal tokens={horizontalGapStackTokens} verticalAlign="center" className="question-info-container" onClick={() => this.onQuestionItemClick(question.questionId)}>
                    <Stack className="question-item">
                        <Text className="question-title" content={question.questionTitle} />
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
    
    /**
     * Renders tab container.
     */
    renderTabContainer = () => {
        return <Stack horizontal>
                {this.getQuestionActivityTab()}
            <Stack className="ask-question-container" verticalAlign="center" onClick={this.onAskAQuestionClick}>
                <Text content="Ask a Question" />
            </Stack>
        </Stack>
    }
    
    /** Renders component */
    render() {
        return (
            <div className="container-div">
                {this.getImageHeader()}
                <NavBar/>
                {this.renderTabContainer()}
                {this.renderQuestionList()}
                <AskAQuestion 
                    isOpen={this.state.isAskAQuestionDialogOpen} 
                    onClose={this.onAskAQuestionClick} 
                    onSubmit={this.onAskAQuestionClick}
                /> 
            </div>
        );
    }
}

export default Home;