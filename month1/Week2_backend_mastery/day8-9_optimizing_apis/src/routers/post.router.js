import { Router } from "express";
import {
    getResponse,
    insertMultiplePost,
    postWithCursorBasedPagination,
    postWithPagination,
    usersWithFiltering,
    usersWithSorting,
} from "../controllers/post.controller.js";
import { query } from "express-validator";
import useLimiter from "../middleware/useLimiter.js";
import throttleMiddleware from "../middleware/throttleMiddleware.js";

const router = Router();

router.route("/insert-multitple").post(insertMultiplePost);
// Pagination API
router.route("/posts-with-paginaion").get(postWithPagination);
router.route("/posts-cursor").get(postWithCursorBasedPagination);
router
    .route("/users")
    .get([query("age").optional().isNumeric().withMessage("Age Must Be a Number")], usersWithFiltering);
router
    .route("/user-sorting")
    .get(
        [
            query("sort").isString().withMessage("Sort Field Must Be A String"),
            query("order").isIn(["asc", "desc"]).withMessage("Order Must Be asc or desc"),
        ],
        usersWithSorting
    );

// rate limit
router.route("/public").get(throttleMiddleware, getResponse);

export default router;
