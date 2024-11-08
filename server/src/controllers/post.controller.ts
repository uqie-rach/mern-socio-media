import { NextFunction, Request, Response } from "express";
import { PostService } from "@services/*";
import ResponseError from "@lib/responseError.ts";
import storageHelper from "@lib/storageHelper.ts";

export const createPost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;
    const payloadId = req?.context?.id;
    const attachement = req?.file;

    if (!body?.content) throw new ResponseError(400, "Content is required");

    if (attachement) {
      if (!attachement?.mimetype?.startsWith("image"))
        throw new ResponseError(400, "Invalid file type");
      if (attachement.size > 5000000)
        throw new ResponseError(400, "File size should be less than 1MB");
    } else {
      throw new ResponseError(400, "Attachement is required");
    }

    const uploadResult = await storageHelper.uploadFile(
      attachement,
      "post",
      payloadId
    );
    body.attachement = uploadResult?.id;

    const post = await PostService.createPost(body, payloadId);

    res.status(201).json(post);
  } catch (error: any) {
    console.log("Error while creating post:", error);
    next(error);
  }
};

export const updatePost = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const body = req?.body;
    const payloadId = req?.context?.id;
    const attachement = req?.file;

    if (attachement) {
      if (!attachement?.mimetype?.startsWith("image"))
        throw new ResponseError(400, "Invalid file type");
      if (attachement.size > 5000000)
        throw new ResponseError(400, "File size should be less than 1MB");

      body.attachement = attachement;
    }
    const post = await PostService.updatePost(
      body,
      payloadId,
      req.params.postId
    );

    res.status(200).json(post);
  } catch (error: any) {
    console.log("Error while updating post:", error);
    next(error);
  }
};

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadId = req?.context?.id;
    const post = await PostService.getPostById(req.params.postId);

    if (!payloadId) throw new ResponseError(401, "Unauthorized");

    res.status(200).json(post);
  } catch (error: any) {
    // console.log("Error while getting post by id:", error);
    next(error);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadId = req?.context?.id;
    const posts = await PostService.getPosts();

    if (!payloadId) throw new ResponseError(401, "Unauthorized");

    res.status(200).json(posts);
  } catch (error: any) {
    console.log("Error while getting posts:", error);
    next(error);
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await PostService.deletePost(req.params.postId);

    res.status(200).json(response);
  } catch (error: any) {
    console.log("Error while getting posts:", error);
    next(error);
  }
};

export const addOrRemoveLike = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const payloadId = req?.context?.id;
    const { postId } = req?.params;

    const response = await PostService.addOrRemoveLike(postId, payloadId);

    res.status(200).json(response);
  } catch (error: any) {
    console.log("Error while getting posts:", error);
    next(error);
  }
};
