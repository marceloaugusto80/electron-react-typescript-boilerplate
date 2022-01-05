import {createGlobalStyle} from "styled-components";

export const Colors = {
    color1:  "#0077b5",
    color2:  "#000000",
    color3:  "#eeeeee",
}

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }

    body {
        padding: 0px 16px;
        min-height: 100%;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    button {
        background-color: ${Colors.color1};
        color: ${Colors.color3};
        padding: 8px;
        font-weight: bold;
        border-radius: 4px;
        border-style: none;
    }
`;

