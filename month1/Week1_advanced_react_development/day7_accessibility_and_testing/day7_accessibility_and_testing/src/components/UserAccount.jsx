import React from "react";

const UserAccount = ({ user }) => {
    return (
        <>
            <h2>User Profile</h2>
            {user?.isAdmin && <button>Edit</button>}
            <div>
                <strong>Name: </strong> {user?.name}
            </div>
        </>
    );
};

export default UserAccount;
