test("Combines Array Using the Spread Operator", () => {
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combined = [...arr1, ...arr2];
    expect(combined).toEqual([1, 2, 3, 4]);
});
