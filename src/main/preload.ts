import { SharedContext } from "@/shared/SharedContext";
import { contextBridge, ipcRenderer } from "electron";

const sharedContext: SharedContext = {
    readFileAsync: async (path: string) => {
        const response = await ipcRenderer.invoke("file-msg", path);
        if (typeof response == "string") return response;
        throw Error("Could not get file content.");
    }
}

contextBridge.exposeInMainWorld("sharedContext", sharedContext);
contextBridge.exposeInMainWorld("require", require);
