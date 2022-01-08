import React, { Fragment } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '@/renderer/styles/defaultTheme';
import { GlobalStyle } from "@/renderer/styles/GlobalStyle";
import { ExampleView1 } from '@/renderer/views/ExampleView1';
import { ExampleView2 } from '@/renderer/views/ExampleView2';
import HomeView from '@/renderer/views/HomeView';

export default function MainLayout() {

    return (
        <Fragment>
            <ThemeProvider theme={defaultTheme}>
                <GlobalStyle />
                <HashRouter>
                    <Content>
                        <SidePanel>
                            <Link to="/">Home</Link>
                            <Link to="/example-view-1">Example 1</Link>
                            <Link to="/example-view-2">Example 2</Link>
                        </SidePanel>
                        <Header>
                            <Link to="/">
                                <h1>The header</h1>
                            </Link>
                        </Header>
                        <Body>
                            <Routes>
                                <Route path="/example-view-1" element={<ExampleView1 />} />
                                <Route path="/example-view-2" element={<ExampleView2 />} />
                                <Route path="/" element={<HomeView />} />
                            </Routes>
                        </Body>
                        <Footer>
                            The footer
                        </Footer>
                    </Content>
                </HashRouter>
            </ThemeProvider>
        </Fragment>
    );
}

const Content = styled.div`
    min-height: 100vh;
    overflow-x: hidden;
    display: grid;
    grid-template-areas: 
        "header  header"
        "panel   body"
        "footer footer";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
`;

const SidePanel = styled.div`
    grid-area: panel;
    padding: 16px;
    background-color: ${props => props.theme.colors.brand2.main};
    color: ${props => props.theme.colors.brand2.contrast};
    a {
        display: block;
        margin-top: 32px;
    }
`;

const Header = styled.div`
    grid-area: header;
    background-color: ${props => props.theme.colors.brand1.main};
    color: ${props => props.theme.colors.brand1.contrast};
    padding: 16px;
`;

const Body = styled.div`
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.foreground};
    grid-area: body;
    padding: 16px;
`;

const Footer = styled.div`
    grid-area: footer;
    padding: 2px;
    background-color: ${props => props.theme.colors.brand1.main};
    color: ${props => props.theme.colors.brand1.contrast};
`;