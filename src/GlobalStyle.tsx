import {createGlobalStyle} from "styled-components";
import "fontsource-roboto";

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
        font-family: "Roboto";
        padding: 0px 16px;
        min-height: 100%;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    h1 {
        font-family: "Roboto";
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

