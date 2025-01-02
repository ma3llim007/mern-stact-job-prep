import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
app.use(express.static("public"));

// Socket IO
const io = new Server(server);

// stores uses in memoery for praticse based
const onlineUsers = {};

// Handle socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // User joins with a username (chat initialization)
    socket.on("joinChat", (username) => {
        onlineUsers[socket.id] = username;
        console.log(`${username} joined the chat.`);
        socket.broadcast.emit("notification", { message: `${username} has joined the chat.` });
    });

    // Handle incoming chat messages
    socket.on("chatMessage", (data) => {
        console.log(`Message from ${data.sender}: ${data.message}`);
        // Broadcast the message to all other users
        socket.broadcast.emit("chatMessage", data);
    });

    // Push notification trigger (e.g., new activity)
    socket.on("triggerNotification", (data) => {
        console.log(`Notification triggered: ${data.message}`);
        io.emit("notification", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        const username = onlineUsers[socket.id];
        if (username) {
            delete onlineUsers[socket.id];
            console.log(`${username} left the chat.`);
            socket.broadcast.emit("notification", { message: `${username} has left the chat.` });
        }
    });
});
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/chatMessage.html");
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
