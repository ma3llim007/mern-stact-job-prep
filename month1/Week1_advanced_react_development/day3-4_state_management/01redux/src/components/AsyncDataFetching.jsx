import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../app/slices/dataSlice";

const AsyncDataFetching = () => {
    const dispatch = useDispatch();
    const { value, status } = useSelector((state) => state.data);

    // Dispatch fetchData thunk on component mount
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchData());
        }
    }, [dispatch, status]);

    // Conditional rendering based on based
    if (status === "loading") {
        return <p>Loading....</p>;
    }

    if (status === "failed") {
        return <p>Failed to fetch data.</p>;
    }

    if (status === "succeeded") {
        return (
            <div>
                <h1>Fetched Data:</h1>
                <div>{JSON.stringify(value)}</div>
            </div>
        );
    }
    return null;
};

export default AsyncDataFetching;
