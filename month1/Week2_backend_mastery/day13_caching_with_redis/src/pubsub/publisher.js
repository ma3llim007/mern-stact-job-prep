import redisClient from "../cache/redisClient.js";

const publishMessage = async (channel, message) => {
    try {
        console.log(`Publishing message to channel: ${channel}`);
        await redisClient.publish(channel, JSON.stringify(message));
    } catch (error) {
        console.error("Publish error:", error);
    }
};

export default publishMessage;
