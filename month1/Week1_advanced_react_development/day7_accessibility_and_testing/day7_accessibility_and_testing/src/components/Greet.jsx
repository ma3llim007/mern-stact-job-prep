import React from "react";

const Greet = ({ name }) => {
    if (name) return <h1>Hello {name}</h1>;
    
    return <button>Login</button>;
};

export default Greet;
