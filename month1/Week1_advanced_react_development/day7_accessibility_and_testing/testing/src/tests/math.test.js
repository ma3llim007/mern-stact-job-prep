import { add, divide, multiply, subtract } from "../classes/math";

test("Add Two Numbers", () => {
    expect(add(2, 3)).toBe(5);
});

test("Subtract Two Numbers", () => {
    expect(subtract(5, 3)).toBe(2);
});

test("multiplies numbers correctly", () => {
    expect(multiply(3, 4)).toBe(12);
});

test("divides numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
});
