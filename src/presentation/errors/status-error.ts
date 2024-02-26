class StatusError extends Error {
  status;

  constructor(status: number, error: Error | string) {
    super();
    this.status = status;
    this.name = 'StatusError';
    
    if (error instanceof Error) {
      this.message = error.message ? error.message : 'Check the error code in the documentation';
    } else {
      this.message = error;
    }
  }
}

export { StatusError };
