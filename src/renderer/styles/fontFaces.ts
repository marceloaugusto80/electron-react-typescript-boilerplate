import { css } from "styled-components"
import RobotoBoldItalic   from "@fontsource/roboto/files/roboto-latin-ext-700-italic.woff"
import RobotoBoldNormal   from "@fontsource/roboto/files/roboto-latin-ext-700-normal.woff"
import RobotoNormalItalic from "@fontsource/roboto/files/roboto-latin-ext-300-italic.woff"
import RobotoNormalNormal from "@fontsource/roboto/files/roboto-latin-ext-300-normal.woff"

export const robotoFontFace = css`
    @font-face {
        font-family: 'Roboto';
        font-weight: normal;
        font-style: normal;
        src: url(${RobotoNormalNormal}) format('woff');
    }
    @font-face {
        font-family: 'Roboto';
        font-weight: normal;
        font-style: italic;
        src: url(${RobotoNormalItalic}) format('woff');
    }
    @font-face {
        font-family: 'Roboto';
        font-weight: bold;
        font-style: normal;
        src: url(${RobotoBoldNormal}) format('woff');
    }
    @font-face {
        font-family: 'Roboto';
        font-weight: bold;
        font-style: italic;
        src: url(${RobotoBoldItalic}) format('woff');
    }
`;