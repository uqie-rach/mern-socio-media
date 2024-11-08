import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Extract token from cookies
    const token = req.headers.cookie?.split("=")[1];

    console.log('token', token)


    // If token is not found, send unauthorized response
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    // If token is found, verify it
    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      (err: Error | null, payload: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });

        console.log(payload)
        // If token is valid, find user and attach to request object
        req.context = payload;

        next();
      }
    );
  } catch (error) {
    console.log("Error while verifying token: ", error);
    next(error);
  }
};
