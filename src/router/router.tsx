import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AskAQuestion from "../components/ask-a-question/ask-a-question";
import QuestionPage from "../components/question-page/question-page";
import Home from "../components/home/home";

export const AppRoute: React.FunctionComponent<{}> = () => {
    return (
        <React.Suspense fallback={<div className="container-div"><div className="container-subdiv"></div></div>}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/ask-a-question" component={AskAQuestion} />
                    <Route exact path="/question/:questionId" component={QuestionPage} />
                    </Switch>
            </BrowserRouter>
        </React.Suspense>
    );
};