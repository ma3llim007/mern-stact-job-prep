import React from "react";

const UserList = ({ users }) => {
    if (users.length === 0) return <p>No Users Available.</p>;

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    <a href={`/users/${user?.id}`}>{user.name}</a>
                </li>
            ))}
        </ul>
    );
};

export default UserList;
