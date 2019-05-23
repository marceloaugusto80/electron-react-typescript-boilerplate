import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import FooView from "./views/FooView";
import BarView from "./views/BarView";
import "./styles/main.scss";

export function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/bar" component={BarView} />
                <Route exact path="/" component={FooView} />
                <Redirect from="*" to="/" />
            </Switch>
        </BrowserRouter>
    );
}

