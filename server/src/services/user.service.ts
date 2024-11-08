import ResponseError from "@lib/responseError.ts";
import { User } from "@models/*";
import { Request } from "express";

export default {
  updateUser: async (payloadId: string, paramId: string, body: any) => {
    if (payloadId !== paramId) throw new ResponseError(403, "Forbidden!");
    const {
      lastName,
      firstName,
      email,
      password,
      occupation,
      location,
      picturePath,
    } = body;

    console.log('body', body)
    if (Object.keys(body).length === 0)
      throw new ResponseError(400, "Missing required fields!");

    const user = await User.findById(paramId);

    if (!user) throw new ResponseError(404, "User not found!");

    await user.updateOne({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      password: password || user.password,
      occupation: occupation || user.occupation,
      location: location || user.location,
      picturePath: picturePath || user.picturePath,
    });

    return { message: "User updated successfully!" };
  },
  getUsers: async () => {
    const user = await User.find();

    return user;
  },
  getUserById: async (req: Request, id: string) => {
    const payloadId = req?.context?.id;

    if (id !== payloadId)
      throw new ResponseError(403, "Only owner can access!");

    const user = await User.findById(id);
    if (!user) throw new ResponseError(404, "User not found!");

    return user;
  },
  getUserFriends: async (userId: string) => {
    const user = await User.findById(userId);

    console.log(user);

    if (!user) throw new ResponseError(404, "User not found!");

    return user.friends;
  },
  addOrRemoveFriends: async (
    payloadId: string,
    userId: string,
    friendId: string
  ) => {
    if (payloadId !== userId) throw new ResponseError(403, "Forbidden!");

    const isFriendExist = await User.findById(friendId);
    if (!isFriendExist) throw new ResponseError(404, "Friend not found!");

    let message = "";
    const user = await User.findById(payloadId);
    if (!user) throw new ResponseError(404, "User not found");

    if (user?.friends?.includes(friendId)) {
      message = "Removed";
      await user?.updateOne({ $pull: { friends: friendId } });
    } else {
      message = "Added";
      await user?.updateOne({ $push: { friends: friendId } });
    }

    return {
      message: `${message} friend successfully!`,
    };
  },
  delete: async (
    payloadId: string,
    userId: string,
  ) => {
    if (payloadId !== userId) throw new ResponseError(403, "Forbidden!");

    await User.deleteOne({ _id: userId });
    return {
      message: `Account deleted successfully!`,
    };
  },
};
