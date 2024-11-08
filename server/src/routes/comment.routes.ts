import {
  createComment,
  deleteComment,
  getComments,
  likeOrUnlikeComment,
  updateComment,
} from "@controllers/comment.controller.ts";
import { verifyToken } from "@lib/verifyToken.ts";
import express from "express";

const UserRouter = express.Router();

/** PROTECTED */
UserRouter.post("/:postId", verifyToken, createComment);
UserRouter.put("/:commentId", verifyToken, updateComment);
UserRouter.post("/:commentId/likes", verifyToken, likeOrUnlikeComment);
UserRouter.delete("/:postId/:commentId", verifyToken, deleteComment);

/** PUBLIC */
UserRouter.get("/:postId", getComments);

export default UserRouter;