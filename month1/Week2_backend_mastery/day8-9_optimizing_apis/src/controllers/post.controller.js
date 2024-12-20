import { validationResult } from "express-validator";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiRsponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const insertMultiplePost = asyncHandler(async (req, res) => {
    const data = [
        {
            title: "Nurse Practicioner",
            content:
                "Nondisplaced fracture of base of third metacarpal bone, right hand, initial encounter for open fracture",
        },
    ];

    const insertPost = await Post.insertMany(data);

    return res.status(201).json(new ApiRsponse(201, insertPost, "Post Insert Successfully"));
});

// Pagination API
const postWithPagination = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const posts = await Post.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        return res.status(200).json(new ApiRsponse(200, posts, "Post Fetch Successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err?.message));
    }
});

// Cursor-Based Pagination
const postWithCursorBasedPagination = asyncHandler(async (req, res) => {
    const { lastId, limit = 10 } = req.query;

    try {
        const query = lastId ? { _id: { $gt: lastId } } : {};
        const posts = await Post.find(query).sort({ _id: 1 }).limit(Number(limit));

        return res.status(200).json(new ApiRsponse(200, posts, "Post Fetch Successfully"));
    } catch (err) {
        return res.status(500).json(new ApiError(500, err?.message));
    }
});

// User With Filtering
const usersWithFiltering = asyncHandler(async (req, res) => {
    try {
        const filters = req.query;
        const users = await User.find(filters);

        return res.status(200).json(new ApiRsponse(200, users, "Post Fetch Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error?.message));
    }
});

const usersWithSorting = asyncHandler(async (req, res) => {
    // Validate inputs
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, errors));
    }

    try {
        const { sort = "name", order = "asc" } = req.query;
        const sortOrder = order === "desc" ? -1 : 1;

        const users = await User.find().sort({ [sort]: sortOrder });
        return res.status(200).json(new ApiRsponse(200, users, "Post Fetch Successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, error?.message));
    }
});

const getResponse = asyncHandler(async (req, res) => {
    res.send("Public API endpoint with rate limiting.");
});
export {
    insertMultiplePost,
    postWithPagination,
    postWithCursorBasedPagination,
    usersWithFiltering,
    usersWithSorting,
    getResponse,
};
