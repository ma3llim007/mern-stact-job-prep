import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8001, () => {
            console.log(`⚙️  Server is running : localhost:${process.env.PORT}`);
        });
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
