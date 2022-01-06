import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Colors } from "./GlobalStyle";
import { ExampleView1 } from './views/ExampleView1';
import { ExampleView2 } from './views/ExampleView2';
import HomeView from './views/HomeView';

export default function MainLayout() {

    return (
        <Content>
            <SidePanel>
                <Link to="/">Home</Link>
                <Link to="/example-view-2">Example 2</Link>
                <Link to="/example-view-1">Example 1</Link>
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
    );
}

const Content = styled.div`
    min-height: 100vh;
    overflow-x: hidden;
    display: grid;
    grid-template-areas: 
        "header  header"
        "panel   body"
        "foother footer";
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
`;

const SidePanel = styled.div`
    grid-area: panel;
    padding: 16px;
    grid-column: 1;
    background-color: ${Colors.color1};
    a {
        color: ${Colors.color3};
        display: block;
        margin-top: 32px;
    }
`;

const Header = styled.div`
    grid-row: 1;
    grid-column: 1 / span 2;
    background-color: ${Colors.color2};
    color: ${Colors.color3};
    padding: 16px;
`;

const Body = styled.div`
    padding: 16px;
    min-height: 600px;
    grid-column: 2;
    background-color: ${Colors.color3};
`;

const Footer = styled.div`
    padding: 16px;
    grid-row: 3;
    grid-column: 1 / span 2;
    background-color: ${Colors.color2};
    color: ${Colors.color3};
`;