import React from "react";

const ProductImageGallery = ({ imagesUrls }) => {
    if (imagesUrls.length === 0) return null;

    return (
        <>
            <ul>
                {imagesUrls.map((url) => (
                    <li key={url}>
                        <img src={url} alt="Image" />
                    </li>
                ))}
            </ul>
        </>
    );
};

export default ProductImageGallery;
