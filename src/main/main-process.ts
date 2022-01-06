import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";

declare const ENVIRONMENT: String;

const IS_DEV              = (ENVIRONMENT == "development");
const DEV_SERVER_URL      = "http://localhost:9000";
const HTML_FILE_PATH      = "renderer/index.html";
const PRELOAD_SCRIPT_PATH = path.resolve(__dirname, "preload.js");

let win: BrowserWindow | null = null;


function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            preload: PRELOAD_SCRIPT_PATH,
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

ipcMain.handle("file-msg", async (ev, arg: string) => {
    try {
        const content = await fs.promises.readFile(arg, { encoding: "utf-8" });
        return content;
    } catch (error) {
        // TODO better error handling
        return null;
    }
});