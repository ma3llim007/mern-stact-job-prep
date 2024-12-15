import User from "../classes/User";

test("Create a User Interfece", () => {
    const user = new User("Mohd Sameer");
    expect(user.name).toBe("Mohd Sameer");
});

test("Greet Method Works Correctly", () => {
    const user = new User("Bob");
    expect(user.greet()).toBe("Hello, My Name Is Bob");
});
