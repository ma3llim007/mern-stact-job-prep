import React from "react";
import { useRecoilState } from "recoil";
import { counterState } from "../recoilStore/counterState";

const RecoilCounter = () => {
    const [count, setCount] = useRecoilState(counterState);
    return (
        <>
            <div
                className="card"
                style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
                <h1>Recoil Counter: {count}</h1>
                <div className="card" style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => setCount(count + 1)}>Increment</button>
                    <button onClick={() => setCount(count - 1)}>Decrement</button>
                </div>
            </div>
        </>
    );
};

export default RecoilCounter;
