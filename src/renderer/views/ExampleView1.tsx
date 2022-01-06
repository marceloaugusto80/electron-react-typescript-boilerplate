import React, { useEffect, useRef, useState } from 'react';
import ExampleCoreLogic from "@/renderer/core/ExampleCoreLogic";
import { useNavigate } from 'react-router-dom';
import clock from "@/renderer/resources/images/clock-64x64.png";

export function ExampleView1() {

    const objRef = useRef<ExampleCoreLogic>();
    const [theNumber, setTheNumber] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        objRef.current = new ExampleCoreLogic((n: number) => setTheNumber(n));
        objRef.current.run();
        return () => {
            if(objRef.current) objRef.current.stop();
        }
    }, []);

    return (
        <div>
            <h1>Example view 1</h1>
            <img src={clock} />
            <p>{theNumber}</p>
        </div>
    );

}
