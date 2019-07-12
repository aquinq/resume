import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { hot } from "react-hot-loader/root";
import "./styles/main.scss";

const app = () => <App />;
const root = document.getElementById("react-app-root-node");

ReactDOM.render(app(), root);

// Enables React Hot Loader.
export default hot(app);
