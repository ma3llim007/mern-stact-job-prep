import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import ProductImageGallery from "../../src/components/ProductImageGallery";
import React from "react";

describe("ProductImageGallery", () => {
    it("should render nothing if given an empty array", () => {
        const { container } = render(<ProductImageGallery imagesUrls={[]} />);
        expect(container).toBeEmptyDOMElement();
    });

    it("should render a list of images", () => {
        const imagesUrls = ["url1", "url2"];
        render(<ProductImageGallery imagesUrls={imagesUrls} />);

        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(2);
        imagesUrls.forEach((url, index) => {
            expect(images[index]).toHaveAttribute("src", url);
        });
    });
});
