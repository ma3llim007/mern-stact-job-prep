import React, { memo } from "react";

const MemoComponest = memo(({ data }) => {
    console.log("Rendered");
    return <div>{data}</div>;
});

export default MemoComponest;
