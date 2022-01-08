import "styled-components";

interface ThemeColor {
    main: string;
    contrast: string;
}

// allow intellisense and avoid tsc warnings or errors
declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            background: string;
            foreground: string;
            brand1: ThemeColor;
            brand2: ThemeColor;
            primary: ThemeColor;
            danger: ThemeColor;
            warning: ThemeColor;
        }
    }
}