import express from "express";
import cors from "cors";
import { Product } from "./models/product.model.js";
import { createClient } from "redis";
import { generateCacheKey } from "./utils/redisFunctions.js";
const app = express();

const client = await createClient()
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.get("/api/products", async (req, res) => {
    try {
        // Generate a unique cache key based on the request (e.g., query parameters)
        const key = generateCacheKey(req);

        if (!key) {
            throw new Error("Generated cache key is invalid or empty.");
        }
        // Check if data exists in Redis cache
        const cachedProducts = await client.get(key);
        if (cachedProducts) {
            console.log("Cache Hit");
            res.json(JSON.parse(cachedProducts));
            return;
        }
        console.log("Cache Miss");
        const query = {};

        if (req.query.category) {
            query.category = req.query.category;
        }

        const products = await Product.find(query);
        // If products are found, cache the results in Redis for future requests
        if (products.length) {
            await client.set(key, JSON.stringify(products));
            console.log(`Cached data under key: ${key}`);
        }

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.put("/api/products/:id", async (req, res) => {
    const productId = req.params.id;
    const updateData = req.body;

    const updateProduct = await Product.findByIdAndUpdate(productId, { $set: updateData }, { new: true });
    if (!updateProduct) {
        return res.status(400).json({ success: false, message: "Product Not Found" });
    }

    const listCacheKey = "api:products*";
    const keys = await client.keys(listCacheKey);

    if (keys.length > 0) {
        await client.del(keys);
    }

    res.json({
        success: true,
        message: "Product Update Successfully",
    });
});

export { app };
