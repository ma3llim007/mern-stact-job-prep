import React, { useMemo } from "react";

const MemoHookComponent = ({ numbers }) => {
    const total = useMemo(() => {
        return numbers.reduce((sum, n) => sum + n, 0);
    },[numbers]);
    return <div>total: {total}</div>;
};

export default MemoHookComponent;
