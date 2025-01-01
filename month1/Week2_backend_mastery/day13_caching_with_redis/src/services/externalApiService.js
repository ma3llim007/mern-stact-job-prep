import axios from "axios";

const fetchData = async () => {
    try {
        const response = await axios.get("https://dummyjson.com/users");
        return response.data;
    } catch (error) {
        console.error("External API error:", error);
        throw new Error("Failed to fetch data");
    }
};

export default fetchData;
