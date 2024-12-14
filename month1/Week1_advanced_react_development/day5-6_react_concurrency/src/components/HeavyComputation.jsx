import React, { startTransition, useState } from "react";

const HeavyComputation = () => {
    const [count, setCount] = useState(0);
    const handleCompute = () => {
        startTransition(() => {
            let sum = 0;
            for (let i = 0; i <= 1e9; i++) sum += i;
            setCount(sum);
        });
    };
    return (
        <div>
            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleCompute}>Compute</button>
                <button onClick={() => setCount(0)}>Reset</button>
            </div>
            <p>Result: {count}</p>
        </div>
    );
};

export default HeavyComputation;
