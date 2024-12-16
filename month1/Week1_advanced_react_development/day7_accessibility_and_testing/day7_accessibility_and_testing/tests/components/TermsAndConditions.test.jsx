import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TermsAndConditions from "../../src/components/TermsAndConditions";
import React from "react";
import userEvent from "@testing-library/user-event";

describe("TermsAndConditions", () => {
    it("should render with correct text and initial state", () => {
        render(<TermsAndConditions />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent("Terms & Conditions");

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/submit/i);
        expect(button).toBeDisabled();
    });

    it("should enable the button when the checkbox is checked", async () => {
        render(<TermsAndConditions />);

        const checkbox = screen.getByRole("checkbox");
        const user = userEvent.setup();
        await user.click(checkbox);

        expect(screen.getByRole("button")).toBeEnabled();
    });
});
