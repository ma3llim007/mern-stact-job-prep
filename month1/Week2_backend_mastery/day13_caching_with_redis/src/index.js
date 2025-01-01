import { config } from "dotenv";
import app from "./app.js";

config();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
