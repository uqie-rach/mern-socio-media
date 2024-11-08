import { NextFunction, Request, Response } from "express";
import { AuthService } from "@services/*";
import storageHelper from "@lib/storageHelper.ts";
import ResponseError from "@lib/responseError.ts";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;
    const attachement = req?.file;
    const { firstName, lastName, email, password, occupation, location } = body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !occupation ||
      !location
    )
      throw new ResponseError(400, "All fields are required");

    console.log("body", body);
    console.log("file", attachement);

    if (attachement) {
      if (!attachement?.mimetype?.startsWith("image"))
        throw new ResponseError(400, "Invalid file type");
      if (attachement.size > 5000000)
        throw new ResponseError(400, "File size should be less than 1MB");
    } else {
      throw new ResponseError(400, "Attachement is required");
    }

    const uploadResult = await storageHelper.uploadFile(attachement, "profile");
    body.picturePath = uploadResult?.id;

    const newUser = await AuthService.register(body);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user: ", error);
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, userData, expiredAge } = await AuthService.login(req);
    console.log('token in controller', token);
    res
      .cookie("token", token, { httpOnly: true, maxAge: expiredAge})
      .status(200)
      .json(userData);
  } catch (error) {
    console.error("Error logging in: ", error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logged out" });
  } catch (error) {
    console.error("Error logging out: ", error);
    next(error);
  }
};
