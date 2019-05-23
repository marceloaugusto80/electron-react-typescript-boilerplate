import * as DOM from "react-dom";
import * as React from "react";
import { hot } from "react-hot-loader/root";
import { App } from "./App";

const MyApp = hot(App);

DOM.render(<MyApp />, document.getElementById("root"));





