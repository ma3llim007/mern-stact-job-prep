import React, { memo } from "react";
import { FixedSizeList } from "react-window";

const ReactWindowComponent = memo(() => {
    const items = Array(500).fill("Item");
    return (
        <FixedSizeList height={400} itemCount={items.length} itemSize={35} width={400} initialScrollOffset={0}>
            {({ index, style }) => (
                <div key={index} style={style}>
                    Item {index + 1}
                </div>
            )}
        </FixedSizeList>
    );
});

export default ReactWindowComponent;
