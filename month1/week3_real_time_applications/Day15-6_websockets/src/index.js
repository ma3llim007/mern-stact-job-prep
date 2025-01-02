import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

// Socket IO
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// Middleware for Socket.IO
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    console.log(token);
    if (token) {
        return next();
    }
    return next(new Error("Authentication error"));
});

// Event handling
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Listen for custom events
    socket.on("message", (data) => {
        console.log("Received message:", data);
        socket.emit("messageResponse", { status: "Message Received" });
    });

    socket.on("disconnect", (reason) => {
        console.log("User disconnected:", reason);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});