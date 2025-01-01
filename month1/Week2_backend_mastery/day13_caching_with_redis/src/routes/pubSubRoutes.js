import { Router } from "express";
import publishMessage from "../pubsub/publisher.js";

const router = Router();

router.post("/publish", async (req, res) => {
    const { channel, message } = req.body;

    if (!channel || !message) {
        return res.status(400).json({ error: "Channel and message are required" });
    }

    await publishMessage(channel, message);
    res.status(200).json({ message: "Message published" });
});

export default router;
