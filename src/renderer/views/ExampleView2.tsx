import React, { useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';

export function ExampleView2() {

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
    }

    return (
        <div>
            <h3>FOO View hurray</h3>
            <p>
                {text}
            </p>

            <button onClick={onOpenFileClick}>Open file...</button>
            <input type="file" ref={fileRef} onChange={onFileInputChange} style={{ display: "none" }} />
            <button onClick={onGotoBarClick}>Go to Bar</button>
        </div>
    );

}
