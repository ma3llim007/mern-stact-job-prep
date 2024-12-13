import { selector } from "recoil";

export const userDataSelector = selector({
    key: "userDataSelector",
    get: async () => {
        const controller = new AbortController();
        const signal = controller.signal;
        try {
            const response = await fetch("https://api.github.com/users/ma3llim007", { signal });
            return response.json();
        } catch (error) {
            if (error.name === "AbortError") {
                console.log("Fetch aborted");
            } else {
                throw error;
            }
        }
    },
});
