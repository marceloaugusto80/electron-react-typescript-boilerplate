import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {Colors} from "../GlobalStyle";

export interface ILayoutProps {
}

export const Layout: React.FunctionComponent<ILayoutProps> = ({ children }) => {

    const getTime = () => {
        let now = new Date();
        let year = now.getFullYear().toString();
        let month = now.getMonth().toString().padStart(2, "0");
        let day = now.getDate().toString().padStart(2, "0");
        return [year, month, day].reduce((prev, curr) => prev + "-" + curr);
    }

    return (
        <Content>
            <SideBar>
                <Link to="/">Foo</Link>
                <Link to="/bar">Bar</Link>
            </SideBar>
            <Header>
                <h1>My Application</h1>
            </Header>
            <Body>
                {children}
            </Body>
            <Footer>
                <p>Today is: {getTime()}</p>
            </Footer>
        </Content>
    );
}

const Content = styled.div`
    gap: 8px;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: auto 100% auto;
`;

const SideBar = styled.div`
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