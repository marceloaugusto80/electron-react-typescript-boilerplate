import { app, BrowserWindow } from "electron";
import {initialize, enable} from "@electron/remote/main";

declare const ENVIRONMENT: String;

const IS_DEV              = (ENVIRONMENT == "development");
const DEV_SERVER_URL      = "http://localhost:9000";
const HTML_FILE_PATH      = "renderer/index.html";


let win: Electron.CrossProcessExports.BrowserWindow | null = null;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.maximize();
    win.webContents.openDevTools();
    if (IS_DEV) {
        win.loadURL(DEV_SERVER_URL);
    }
    else {
        win.loadFile(HTML_FILE_PATH);
    }
    
    win.on("closed", () => {
        win = null
    })
}

app.on("ready", () => {
    createWindow();
    initialize();
    if(!win?.webContents) throw Error("Web contents not initialized!");
    enable(win?.webContents);
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
