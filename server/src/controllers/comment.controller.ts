import { CommentService } from "@services/*";
import { NextFunction, Response } from "express";

export const createComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;
    const { id: userId } = req?.context;
    const { postId } = req?.params;

    const comment = await CommentService.create(body, userId, postId);
    res.status(201).json(comment);
  } catch (error: any) {
    console.log("Error while creating comment:", error);
    next(error);
  }
};

export const updateComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;
    const { id: userId } = req?.context;
    const { commentId } = req?.params;

    const comment = await CommentService.update(body, userId, commentId);
    res.status(200).json(comment);
  } catch (error: any) {
    console.log("Error while updating comment:", error);
    next(error);
  }
};

export const getComments = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req?.params;

    const comments = await CommentService.getByPost(postId);
    res.status(200).json(comments);
  } catch (error: any) {
    console.log("Error while deleting comment:", error);
    next(error);
  }
};

export const deleteComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req?.context;
    const { commentId, postId } = req?.params;

    const response = await CommentService.remove(userId, commentId, postId);
    res.status(200).json(response);
  } catch (error: any) {
    console.log("Error while deleting comment:", error);
    next(error);
  }
};

export const likeOrUnlikeComment = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req?.context;
    const { commentId } = req?.params;

    const response = await CommentService.likeOrUnlike(userId, commentId);

    res.status(201).json(response);
  } catch (error: any) {
    console.log("Error while Like or Unlike comment:", error);
    next(error);
  }
};
