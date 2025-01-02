import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
app.use(express.static("public"));

// Socket IO
const io = new Server(server);

// Handle connection
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Emit a welcome message to the client
    socket.emit("serverMessage", { message: "welcome to the websocket server!" });

    // Listen for 'clientMessage' event from the client
    socket.on("clientMessage", (data) => {
        console.log(`Received message from client:`, data);

        socket.emit("serverResponse", { message: "Message Received Successfully" });
    });

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
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
