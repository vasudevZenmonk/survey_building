class CustomError extends Error {
  /**
   * Constructor for the CustomError class.
   *
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code to be used in the response.
   */
  statusCode: number;
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

class BadGatewayError extends CustomError {
  constructor(message) {
    super(message || 'Bad Gateway', HTTP_STATUS_CODE.BAD_GATEWAY);
  }
}

class GatewayTimeoutError extends CustomError {
  constructor(message) {
    super(message || 'Gateway Timeout', HTTP_STATUS_CODE.GATEWAY_TIMEOUT);
  }
}

class NotFoundError extends CustomError {
  constructor(message) {
    super(
      message || 'Requested resource not found',
      HTTP_STATUS_CODE.NOT_FOUND,
    );
  }
}

class ForbiddenError extends CustomError {
  constructor(message) {
    super(message || 'Forbidden', HTTP_STATUS_CODE.FORBIDDEN);
  }
}

class ConflictError extends CustomError {
  constructor(message) {
    super(message || 'Same resource already exists', HTTP_STATUS_CODE.CONFLICT);
  }
}

module.exports = {
  BadGatewayError,
  GatewayTimeoutError,
  NotFoundError,
  ForbiddenError,
  ConflictError,
};
