import CustomEmitter from "./events/CustomEmitter.js";

const myEmitter = new CustomEmitter();

// Add event listeners
myEmitter.on("task:start", (taskName) => {
    console.log(`Task started: ${taskName}`);
});

myEmitter.once("task:complete", (taskName) => {
    console.log(`Task completed: ${taskName}`);
});

myEmitter.on("error", (error) => {
    console.error(`An error occurred: ${error.message}`);
});

// Emit events
myEmitter.trigger('task:start', 'Download File');
myEmitter.trigger('task:complete', 'Download File');

// This will not trigger the 'task:complete' listener again
myEmitter.trigger('task:complete', 'Upload File');

// Emit an error
myEmitter.trigger('error', new Error('Something went wrong!'));