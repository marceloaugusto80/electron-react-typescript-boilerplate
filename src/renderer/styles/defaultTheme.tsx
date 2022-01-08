import {DefaultTheme} from "styled-components";

// The .tsx extension in this file is to allow color picker extension in visual code. Change to .ts if you want.

const defaultTheme: DefaultTheme = {
    colors: {
        background:   "#f1f1f1",
        foreground:   "#111111",
        brand1: {
            main:     "#116f8b",
            contrast: "#dae9ee"
        },
        brand2: {
            main:     "#460261",
            contrast: "#e3d6e9"
        },
        primary: {
            main:     "#045f7a",
            contrast: "#d7f0f8"
        },
        danger: {
            main:     "#610202",
            contrast: "#f5dcdc"
        },
        warning: {
            main:     "#c2c500",
            contrast: "#fdfde0"
        },
        
    }
    
};

export default defaultTheme;