import { render } from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyle";
import MainLayout from "./MainLayout";

function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <MainLayout />
        </BrowserRouter>
    );
}

render(<App />, document.getElementById("root"));
