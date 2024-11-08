import { NextFunction, Request, Response } from "express";
import ResponseError from "src/lib/responseError.ts";

export default (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) {
    next();
    return;
  }

  if (error instanceof ResponseError) {
    res.status(error.statusCode).json({ errors: error.message }).end();
  } else {
    res.status(500).json({ errors: error.message }).end();
  }
};
