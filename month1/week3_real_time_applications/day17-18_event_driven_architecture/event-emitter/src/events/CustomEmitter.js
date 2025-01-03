import { EventEmitter } from "events";

class CustomEmitter extends EventEmitter {
    trigger(eventName, data) {
        console.log(`Event Triggered: ${eventName}`);
        this.emit(eventName, data);
    }
}

export default CustomEmitter;
