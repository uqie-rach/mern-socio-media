import ResponseError from "@lib/responseError.ts";
import { JWTService } from "@services/*";
import { NextFunction, Request, Response } from "express";

const decodeToken = async (header: string) => {
  if (!header) throw new ResponseError(401, "Unauthorized!");

  const token: string = header.replace("Bearer ", "");
  const payload = await JWTService.verify({ token });

  return payload;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  const { method, path } = req;

  if (method === "OPTIONS" || ["/api/auth/login"].includes(path)) return next();

  req.context = await decodeToken(
    req.header("Authorization")! || req.header("authorization")!
  );

  return next();
};
