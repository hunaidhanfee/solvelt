import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../components/home/home";

export const AppRoute: React.FunctionComponent<{}> = () => {
    return (
        <React.Suspense fallback={<div className="container-div"><div className="container-subdiv"></div></div>}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    </Switch>
            </BrowserRouter>
        </React.Suspense>
    );
};