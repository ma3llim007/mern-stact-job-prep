import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { descrement, increament } from "../app/slices/counterSlice";

const DataMiddleware = () => {
    const dispatch = useDispatch();
    const { count } = useSelector((state) => state.counter);

    return (
        <>
            <h1>count is {count}</h1>
            <div className="card" style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => dispatch(increament())}>Increament</button>
                <button onClick={() => dispatch(descrement())}>Descreament</button>
            </div>
        </>
    );
};

export default DataMiddleware;
