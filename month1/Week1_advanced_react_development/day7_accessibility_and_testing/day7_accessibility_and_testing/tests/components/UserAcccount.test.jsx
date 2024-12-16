import React from "react";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import UserAccount from "../../src/components/UserAccount";

describe("User Account", () => {
    it("Should Render User Name", () => {
        const user = { id: 1, name: "Mohd" };
        render(<UserAccount user={user} />);

        expect(screen.getByText(user.name)).toBeInTheDocument();
    });

    it("Should Render Edit Button If User Is Admin", () => {
        const user = { id: 1, name: "Mohd", isAdmin: true };
        render(<UserAccount user={user} />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    });

    it("Should Not Render Edit Button If User Not Is Admin", () => {
        const user = { id: 1, name: "Mohd" };
        render(<UserAccount user={user} />);

        const button = screen.queryByRole("button");
        expect(button).not.toBeInTheDocument();
    });
});
