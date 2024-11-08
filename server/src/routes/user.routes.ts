import express from "express";

import {
  addOrRemoveFriends,
  deleteUser,
  getUserById,
  getUserFriends,
  getUsers,
  updateUser
} from "@controllers/user.controller.ts";
import { verifyToken } from "@lib/verifyToken.ts";
import multer from "multer";

const UserRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/** Public */
UserRouter.get("/", getUsers);
UserRouter.get("/:id/friends", getUserFriends);

/** Protected */
UserRouter.get("/:id", verifyToken, getUserById);
UserRouter.post("/:id/:friendId", verifyToken, addOrRemoveFriends);
UserRouter.put("/:id", upload.single('profilePict'), verifyToken, updateUser);
UserRouter.delete("/:id", verifyToken, deleteUser);

export default UserRouter;
