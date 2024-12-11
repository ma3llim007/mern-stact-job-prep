import React, { useCallback, useState } from "react";

const CallBackComponent = () => {
    const [count, setCount] = useState(0);

    const incrementCount = useCallback(() => {
        setCount((prev) => prev + 1);
    }, []);

    const descrementCount = useCallback(() => {
        setCount((prev) => prev - 1);
    }, []);

    console.log("Rendered");
    return (
        <>
            <div className="card">
                <h2>count is {count}</h2>
                <div className="card" style={{ display: "flex", gap: "5px" }}>
                    <button onClick={incrementCount}>Increment</button>
                    <button onClick={descrementCount}>Descrement</button>
                </div>
            </div>
        </>
    );
};

export default CallBackComponent;
