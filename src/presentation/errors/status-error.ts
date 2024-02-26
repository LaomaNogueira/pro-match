class StatusError extends Error {
    status;

    constructor(status: number, error: Error) {
        super();
        this.status = status;
        this.name = 'StatusError';
        this.message = error.message
        ? error.message
        : 'Check the error code in the documentation';
    }
}

export { StatusError };
