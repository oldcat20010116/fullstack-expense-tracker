function notFound(request, response) {
  response.status(404).json({
    success: false,
    message: `Route ${request.method} ${request.originalUrl} was not found.`,
  });
}

function errorHandler(error, request, response, next) {
  console.error(error);

  if (error.name === 'CastError') {
    return response.status(400).json({
      success: false,
      message: 'Invalid transaction identifier.',
    });
  }

  if (error.name === 'ValidationError') {
    return response.status(400).json({
      success: false,
      message: 'Database validation failed.',
      errors: Object.values(error.errors).map((item) => item.message),
    });
  }

  response.status(500).json({
    success: false,
    message: 'An unexpected server error occurred.',
  });
}

module.exports = { notFound, errorHandler };

