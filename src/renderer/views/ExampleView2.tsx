import React, { useState} from 'react';

export function ExampleView2() {

    const [text, setText] = useState("Open a file to display content here");

    const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const {files} = e.currentTarget;
        if(!files || files.length != 1) return;
        try {
            const response =  await window.sharedContext.readFileAsync(files[0].path);
            if (typeof response == "string") setText(response);
        } catch (error) {
            setText((error as Error).message);
        }
    }

    return (
        <div>
            <h1>Example view 2</h1>
            <p>Open a file</p>
            <input type="file" multiple={false} onChange={onFileInputChange} />
            <p>File content:</p>
            <p>{text}</p>
        </div>
    );

}
