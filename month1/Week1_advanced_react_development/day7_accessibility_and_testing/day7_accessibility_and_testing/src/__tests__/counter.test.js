import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Counter from "../components/Counter";

test("Increments Count On Button Click", () => {
    render(<Counter />);

    const button = screen.getByText("Increment");
    userEvent.click(button);

    const count = screen.getByText("Count: 1");
    expect(count).toBeInTheDocument();
});
