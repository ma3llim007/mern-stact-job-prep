const fetchData = () => {
    new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data");
        }, 100);
    });
};

test("Resolves With Correct Data", async () => {
    const data = await fetchData();
    expect(data).toBe("Data");
});
