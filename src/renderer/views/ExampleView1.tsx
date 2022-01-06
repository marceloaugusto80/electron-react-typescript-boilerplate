import React, { useEffect, useRef, useState } from 'react';
import Clock from "../core/Clock";
import { useNavigate } from 'react-router-dom';
import clock from "../resources/images/clock-64x64.png";

export function ExampleView1() {

    const clockRef = useRef<Clock>();
    const [timeStr, setTimeStr] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        clockRef.current = new Clock((time: string) => setTimeStr(time));
        clockRef.current.run();
        return () => {
            if(clockRef.current) clockRef.current.stop();
        }
    }, []);

    const onGotoFooClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log("Navigating to Foo view");
        navigate("/");
    };

    return (
        <div>
            <img src={clock} />
            <h3>BAR</h3>
            <p>What time is it?</p>
            <p>{timeStr}</p>
            <button onClick={onGotoFooClick}>Go to Foo</button>
        </div>
    );

}
