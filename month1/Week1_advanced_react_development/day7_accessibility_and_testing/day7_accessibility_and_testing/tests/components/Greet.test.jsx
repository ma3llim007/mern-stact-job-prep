import React from "react";
import Greet from "../../src/components/Greet";
import { render, screen } from "@testing-library/react";

describe("Greet", () => {
    it("Should Render Hello With The Name When Name Is Provided", () => {
        render(<Greet name="mohd sameer" />);

        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/mohd sameer/i);
    });

    it("Should Render Login Button When Name Is Not Provided", () => {
        render(<Greet />);

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/login/i);
    });
});
