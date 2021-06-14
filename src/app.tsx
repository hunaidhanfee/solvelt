import React from 'react';
import { AppRoute } from "./router/router";
import './App.css';
import "./styles/style.css";

export default class App extends React.Component<{}, {}> {

  constructor(props: any) {
      super(props);
  }

  /**
    * Renders the component
    */
   public render(): JSX.Element {
    return (
        <div>
            <div className="appContainer">
              <AppRoute />
            </div>
        </div>
    );
}
}

