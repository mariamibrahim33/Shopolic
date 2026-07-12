// Wraps an async route handler so rejected promises are forwarded to Express's
// error middleware instead of crashing the process (Express 4 doesn't do this
// automatically).
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
