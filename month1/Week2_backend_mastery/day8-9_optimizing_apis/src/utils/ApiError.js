class ApiError extends Error {
    constructor(statusCode, message = "Something Went Wrong", errors = [], stack = "") {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    toJSON() {
        const { statusCode, data, success, errors, message } = this;
        return {
            statusCode,
            data,
            success,
            errors,
            message,
        };
    }
}

export default ApiError;