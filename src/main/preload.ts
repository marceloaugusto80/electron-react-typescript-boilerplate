import { contextBridge, ipcMain, ipcRenderer } from "electron";
import { SharedContext } from "@/shared/SharedContext";

const sharedContext: SharedContext = {
    getSomeData: () => {
        return {someNumber: 49, someString: "hello"}
    },
    setSomeData: (someData) => console.log(someData)
}

contextBridge.exposeInMainWorld("sharedContext", sharedContext);
