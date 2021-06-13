import * as React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { Text, Divider } from "@fluentui/react-northstar";
import { Stack, IStackTokens, Separator } from "@fluentui/react";
import { IQuestion } from "../../models/question";
import "./home.scss";

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 10,
    padding: 10,
};

interface IHomeState {
questionActivityState: number;
questionsList: IQuestion[]
}

interface IHomeProps {
}

class Home extends React.Component<IHomeProps, IHomeState> {
    constructor(props: IHomeProps) {
        super(props);
        this.state = {
            questionActivityState: 0,            
            questionsList: [
                {
                    questionDescription: "Desc",
                    questionId: "1",
                    questionTitle: "Testing Title",
                    userId: "UA"
                }
            ],
        }   
    }

    /**
     * Gets the header image.
     * @returns Header image
     */
    getImageHeader = () => {
        return (<div>
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
     * Renders the questions list.
     */
    renderQuestionList = () => {
        let a = this.state.questionsList.map((question: IQuestion, index: number) => 
                <div>
                    <Stack horizontal tokens={horizontalGapStackTokens} verticalAlign="center">
                        <Stack className="question-item">
                            <Text className="question-title" content={question.questionTitle} />
                            <Text className="question-info" content={question.questionDescription}/>
                        </Stack>

                        <Stack horizontalAlign="end" className="answer-count-container">
                            <Stack className="answer-count">
                                <Text className="answer-number" content="1"/>
                                <Text content="Answered"/>
                            </Stack>
                        </Stack>
                    </Stack>
                    <div className="separator-heavy">                        
                    </div>
                </div>
        )

        return a;
    }

    /** Renders component */
    render() {
        return (
            <div className="container-div">
                {this.getImageHeader()}
                {this.getQuestionActivityTab()}
                {this.renderQuestionList()}
            </div>
        );
    }
}

export default Home;