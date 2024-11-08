import { verifyToken } from "@lib/verifyToken.ts";
import express from "express";

import {
  addOrRemoveLike,
  createPost,
  deletePost,
  getPostById,
  getPosts,
  updatePost,
} from "@controllers/post.controller.ts";
import multer from "multer";

const PostRouter = express.Router();
  
const upload = multer({ storage: multer.memoryStorage() });

/** Protected */
PostRouter.post("/", upload.single('attachement') ,verifyToken, createPost);
PostRouter.put("/:postId", upload.single('attachement'), verifyToken, updatePost);
PostRouter.delete("/:postId", verifyToken, deletePost);
PostRouter.post("/:postId", verifyToken, addOrRemoveLike);

/** Public */
PostRouter.get("/", getPosts);
PostRouter.get("/:postId", getPostById);

export default PostRouter;
