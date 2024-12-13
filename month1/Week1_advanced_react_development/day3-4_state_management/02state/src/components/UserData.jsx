import React from "react";
import { useRecoilValue } from "recoil";
import { userDataSelector } from "../recoilStore/selectors/userDataSelector";

const UserData = () => {
    const userData = useRecoilValue(userDataSelector);

    return (
        <>
            <div>
                <h1>{userData?.name}</h1>
                <p>{userData?.login}</p>
                <p>{userData?.bio}</p>
                <img src={userData?.avatar_url} alt="Avatar" width="100" />
            </div>
        </>
    );
};

export default UserData;
