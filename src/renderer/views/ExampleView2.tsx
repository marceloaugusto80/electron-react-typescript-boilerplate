import React, { useRef, useState} from 'react';

export function ExampleView2() {

    const fileRef = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("Open a file to display content here");

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
        </div>
    );

}
