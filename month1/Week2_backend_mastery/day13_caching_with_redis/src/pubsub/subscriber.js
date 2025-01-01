import { createClient } from "redis";

const subscriber = createClient({
    url: process.env.REDIS_URL,
});

subscriber.on("error", (err) => {
    console.error("Subscriber connection error:", err);
});

// Subscribe to a Redis channel
const subscribeToChannel = async (channel) => {
    await subscriber.connect();
    console.log(`Subscribed to channel: ${channel}`);

    subscriber.subscribe(channel, (message) => {
        console.log(`Received message from channel ${channel}:`, JSON.parse(message));
    });
};

export default subscribeToChannel;
