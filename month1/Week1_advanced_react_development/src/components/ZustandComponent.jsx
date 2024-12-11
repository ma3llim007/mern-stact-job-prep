import React from "react";
import Store from "../store/store";

const ZustandComponent = () => {
    const { count, increament, descreament } = Store();
    return (
        <div className="card">
            <h2>count is {count}</h2>
            <div className="card" style={{ display: "flex", gap: "5px" }}>
                <button onClick={increament}>Increment</button>
                <button onClick={descreament}>Descrement</button>
            </div>
        </div>
    );
};

export default ZustandComponent;
