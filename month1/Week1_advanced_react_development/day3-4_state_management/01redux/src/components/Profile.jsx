import React from "react";
import { useGetUserQuery } from "../app/slices/apiSlice";

const Profile = () => {
    const { data, error, isLoading } = useGetUserQuery("ma3llim007");

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something Went Wrong!..</p>;

    return (
        <div>
            <h1>{data?.name}</h1>
            <p>{data?.login}</p>
            <p>{data?.bio}</p>
            <img src={data?.avatar_url} alt="Avatar" width="100" />
        </div>
    );
};

export default Profile;
