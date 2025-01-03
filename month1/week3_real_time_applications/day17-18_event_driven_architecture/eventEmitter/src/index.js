import { EventEmitter } from "events";

// Create an Instance
const eventEmitter = new EventEmitter();

// Attach a listener.
eventEmitter.on("greet", (name) => {
    console.log(`Hello, ${name}!`);
});

// Attach a one-time listener.
eventEmitter.once("sayOnce", () => {
    console.log("This will only run once.");
});

// Error Handling
eventEmitter.on("error", (err) => {
    console.error("Error event triggered:", err.message);
});

// Calling the event
eventEmitter.emit("sayOnce");
eventEmitter.emit("greet", "Alice");
eventEmitter.emit('error', new Error('Something went wrong!'));