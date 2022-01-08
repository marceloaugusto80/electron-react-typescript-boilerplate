import React, { Fragment, useState } from 'react';
import {dialog} from "@electron/remote";
import fs from "fs";

export function ExampleView2() {

    const [text, setText] = useState<string|null>(null);

    const handleOpenFileClick = async () => {
        try {
            
            const result = await dialog.showOpenDialog({ properties: ["openFile"] });
            const { filePaths } = result;
            if (filePaths.length != 1) return;

            const response = await fs.promises.readFile(filePaths[0], { encoding: "utf-8" });
            setText(response);
        
        } catch (error) {
        
            setText((error as Error).message);
        
        }
    }

    return (
        <div>
            <h1>Example view 2</h1>
            <h3>Another example view.</h3>
            <p>Try to open a file to test electron dialog and file system:</p>
            <button onClick={handleOpenFileClick}>Open file...</button>
            {
                text &&
                <Fragment>
                    <p>File content:</p>
                    <p><code>{text}</code></p>
                    <button onClick={()=>setText(null)}>Clear</button>
                </Fragment>
            }
        </div>
    );

}
