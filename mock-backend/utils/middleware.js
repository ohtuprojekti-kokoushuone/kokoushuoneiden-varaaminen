const errorHandler = (error, request, response, next) => {
  console.error(error.message, error.code);

  let status = error.response?.status || 400;
  let message = error.response?.data || `Error: ${request.method} request failed with status code ${status}`;

  response.status(status).end(JSON.stringify(message));

  next(error);
};

module.exports = { errorHandler };
