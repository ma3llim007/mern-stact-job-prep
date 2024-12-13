import React from "react";
import useStore from "../store/useStore";

const Zustand = () => {
    const { count, increment, decrement } = useStore();
    return (
        <div className="card">
            <h1>Count: {count}</h1>
            <div className="card" style={{ display: "flex", gap: "10px" }}>
                <button onClick={increment}>Increment</button>
                <button onClick={decrement}>Decrement</button>
            </div>
        </div>
    );
};

export default Zustand;
