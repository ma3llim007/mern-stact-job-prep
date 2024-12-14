import React, { useEffect, useState } from "react";

const UserComponent = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch("https://api.github.com/users/ma3llim007");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                setError(error?.message);
            }
        };

        setTimeout(() => {
            getUserData();
        }, 3000);
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.bio}</p>
            <img loading="lazy" src={user?.avatar_url} alt="Avatar Url" width={"70%"} />
        </div>
    );
};

export default UserComponent;
