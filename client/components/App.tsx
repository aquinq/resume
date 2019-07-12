import * as React from "react";
import Home from "./Home/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <Route exact={true} path="/" component={Home} />
      </Router>
    );
  }
}
