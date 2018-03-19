class ServerError extends Error {
  constructor(statusCode, message) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }

    this.statusCode = statusCode;
  }

  static ErrorBuilder(preferredStatusCode, err) {
    if (err instanceof ServerError) {
      return err;
    }
    return new ServerError(preferredStatusCode, err.message);
  }
}

module.exports = ServerError;
