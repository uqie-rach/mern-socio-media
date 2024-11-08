import express, { NextFunction, Request, Response } from "express";
import { verifyToken } from "@lib/verifyToken.ts";
import { UserService } from "@services/*";
import ResponseError from "@lib/responseError.ts";

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadId = req?.context?.id;
    const { id } = req.params;

    const response = await UserService.updateUser(payloadId, id, req.body);

    res.status(200).json(response);
  } catch (error: any) {
    console.error("Error while updating user data: ", error.message);
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserService.getUsers();

    res.status(200).json(users);
  } catch (error: any) {
    console.error("Error while fetching user data: ", error.message);
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(req, id);

    res.status(200).json(user);
  } catch (error: any) {
    console.error("Error while fetching user data: ", error.message);
    next(error);
  }
};

export const getUserFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const friends = await UserService.getUserFriends(id);

    res.status(200).json(friends);
  } catch (error: any) {
    console.error("Error while fetching user friends data: ", error.message);
    next(error);
  }
};

export const addOrRemoveFriends = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, friendId } = req.params;
    const payloadId = req?.context?.id;

    const response = await UserService.addOrRemoveFriends(payloadId, id, friendId);

    res.status(200).json(response);
  } catch (error: any) {
    console.error(
      "Error while remove or add user friends data: ",
      error.message
    );
    next(error);
  }

};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const payloadId = req?.context?.id;

    const response = await UserService.delete(payloadId, id);

    res.status(200).json(response);
  } catch (error: any) {
    console.error(
      "Error while remove deleting user data: ",
      error.message
    );
    next(error);
  }

};
