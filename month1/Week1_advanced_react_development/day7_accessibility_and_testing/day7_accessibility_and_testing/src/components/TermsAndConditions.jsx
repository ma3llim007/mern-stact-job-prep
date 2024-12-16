import React, { useState } from "react";

const TermsAndConditions = () => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div>
            <h1>Terms & Conditions</h1>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit dolore corrupti provident odit pariatur
                iste ab tempore vitae tenetur, repellendus officia est itaque sunt laudantium asperiores aspernatur aut,
                autem maxime.
            </p>
            <div style={{ paddingBottom: "10px" }}>
                <label htmlFor="agree">
                    <input type="checkbox" id="agree" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />I
                    Accept The Terms And Conditions.
                </label>
            </div>
            <button disabled={!isChecked}>Submit</button>
        </div>
    );
};

export default TermsAndConditions;
