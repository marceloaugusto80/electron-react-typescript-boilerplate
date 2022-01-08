import {createGlobalStyle } from "styled-components";
import { robotoFontFace } from "./fontFaces";

export const GlobalStyle = createGlobalStyle`

    ${robotoFontFace}

    body {
        margin: 0 !important;
        padding: 0 !important;
        font-family: Roboto;
        font-weight: 600;
    }

    a {
        color: unset;
        text-decoration: none;
        &:visited {
            text-decoration: none;
        }
    }
`;

