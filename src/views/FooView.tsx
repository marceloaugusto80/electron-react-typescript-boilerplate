import React, {PureComponent, useRef, useState} from 'react';
import fs from "fs";
import { useNavigate } from 'react-router-dom';

export function FooView() {

    const fileRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [text, setText] = useState("Open a file to display content here");

    const onGotoBarClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Navigating to Bar view");
        navigate("/bar");
    };

    const onOpenFileClick = () => {
        if (fileRef.current) {
            fileRef.current.click();
        }
    }

    const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        let paths = e.currentTarget.files;

        if (!paths || paths.length < 1) {
            return setText("Could not load files...");
        }

        let filePath = paths[0].path;

        loadFileContentAsync(filePath)
            .then(fileContent => setText(fileContent))
            .catch(err => setText(err.message));
    }

    const loadFileContentAsync = async (filePath: string): Promise<string> => {
        try {
            let content = await fs.promises.readFile(filePath, { encoding: "utf-8"});
            return content;
            
        } catch (error) {
            throw error;            
        }
    }

    return (
        <div>
            <h3>FOO View</h3>
            <p>
                {text}
            </p>

            <button onClick={onOpenFileClick}>Open file...</button>
            <input type="file" ref={fileRef} onChange={onFileInputChange} style={{ display: "none" }} />
            <button onClick={onGotoBarClick}>Go to Bar</button>
        </div>
    );

}
