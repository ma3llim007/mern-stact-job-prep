import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import UserList from "../../src/components/UserList";

describe("UserList", () => {
    it("should render no users when the users array is empty", () => {
        render(<UserList users={[]} />);

        expect(screen.getByText(/no users/i)).toBeInTheDocument();
    });

    it("should render a list of users", () => {
        const users = [
            { id: 1, name: "mosh" },
            { id: 2, name: "johd" },
        ];
        render(<UserList users={users} />);

        users.forEach((user) => {
            const link = screen.getByRole("link", { name: user.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", `/users/${user.id}`);
        });
    });
});
