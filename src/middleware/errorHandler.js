import {HttpError} from "http-errors";

export const errorHandler = (err, req, res, next) => {
  const { status = 500, message } = err;
  if (err instanceof HttpError) {
    return res.status(status).json({
      message,
    });
  }

  res.status(500).json({
    message: message || 'Something went wrong',
  });
};
