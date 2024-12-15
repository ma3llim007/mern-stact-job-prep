import React from "react";
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    return (
        <div className="card">
            <h1>Count: {count}</h1>
            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setCount(count + 1)}>Increment</button>
                <button onClick={() => setCount(count - 1)}>Descrement</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
        </div>
    );
};

export default Counter;
