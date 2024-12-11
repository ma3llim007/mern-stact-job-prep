import { debounce } from "lodash";
import React, { useMemo, useState } from "react";

const DebouncedSearch = () => {
    const [query, setQuery] = useState("");

    // Debounce the search function
    const handleSearch = useMemo(
        () =>
            debounce((value) => {
                console.log("Searching For: ", value);
            }, 500),
        []
    );
    const onChangeInput = (e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
    };
    return (
        <>
            <input type="text" name="search" id="search" value={query} onChange={onChangeInput} placeholder="Search...." />
        </>
    );
};

export default DebouncedSearch;
