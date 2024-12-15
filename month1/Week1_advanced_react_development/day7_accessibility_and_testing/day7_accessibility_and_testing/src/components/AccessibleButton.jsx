import React from "react";

const AccessibleButton = () => {
    return (
        <div className="card">
            <div
                style={{ border: "1px solid black", padding: "1rem 0.5rem", borderRadius: "1rem", fontSize: "2rem" }}
                role="button"
                tabIndex={0}
                onClick={() => alert("Button Click")}
            >
                click me
            </div>
        </div>
    );
};

export default AccessibleButton;
