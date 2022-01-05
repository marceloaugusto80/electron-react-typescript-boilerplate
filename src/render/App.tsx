import * as React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { FooView } from "./views/FooView";
import { BarView } from "./views/BarView";
import { Layout } from "./views/Layout";
import { GlobalStyle } from "./GlobalStyle";

export default function App() {
    return (
        <BrowserRouter>
            <GlobalStyle />
            <Layout>
                <Routes>
                    <Route path="/bar" element={<BarView />} />
                    <Route path="/" element={<FooView />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
