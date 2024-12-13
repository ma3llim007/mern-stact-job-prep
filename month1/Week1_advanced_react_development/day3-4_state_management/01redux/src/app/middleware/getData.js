export const loggerMiddleware = (storeApi) => (next) => (action) => {
    console.log("Dispatching: ", action);
    const result = next(action);
    console.log("Next State:", storeApi.getState());
    return result;
};
