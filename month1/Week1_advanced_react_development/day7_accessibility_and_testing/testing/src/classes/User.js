export default class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        return `Hello, My Name Is ${this.name}`;
    }
}
