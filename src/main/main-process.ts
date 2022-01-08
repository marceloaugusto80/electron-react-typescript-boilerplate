import { app, BrowserWindow } from "electron";
import { initialize, enable } from "@electron/remote/main";

declare const ENVIRONMENT: String;

const IS_DEV = (ENVIRONMENT == "development"); // const injected via webpack define plugin.
const DEV_SERVER_URL = "http://localhost:9000"; // must match webpack dev server port.
const HTML_FILE_PATH = "renderer/index.html";

function createWindow(): BrowserWindow | null {
    
    let win: BrowserWindow | null = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    if (IS_DEV) {
        win.webContents.openDevTools();
        win.loadURL(DEV_SERVER_URL);
    }
    else {
        win.loadFile(HTML_FILE_PATH);
        win.removeMenu();
    }

    return win;
}

app.whenReady()
    .then(() => {

        let win = createWindow();
        if (!win) throw Error("BrowserWindow is null. Check main process initialization!");
        initialize();

        win.maximize();
        enable(win.webContents);

        win.on("closed", () => {
            win = null;
        });

        app.on('window-all-closed', () => {
            if (process.platform != "darwin") {
                app.quit()
            }
        })

        app.on('activate', () => {
            if (win === null) {
                createWindow()
            }
        })

    });