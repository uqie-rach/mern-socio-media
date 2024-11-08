import jwt from "jsonwebtoken";
import { Request } from "express";
import bcrypt from "bcrypt";

import ResponseError from "@lib/responseError.ts";
import { User } from "@models/";

export default {
  register: async (body: any) => {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = body;

    const isUserExist = await User.findOne({ email });

    // Check if user already exists
    if (isUserExist) throw new ResponseError(409, "Email has already taken");

    // Check if required fields are missing
    if (!firstName || !lastName || !email || !password)
      throw new ResponseError(400, "Missing required fields");

    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: picturePath || "",
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 1000),
      impression: Math.floor(Math.random() * 1000),
    });

    const savedUser = await newUser.save();

    return savedUser;
  },

  login: async (req: Request) => {
    console.log(req.body);
    // Check if required fields are missing
    const missingRequiredFields = !req.body.email || !req.body.password;
    if (missingRequiredFields)
      throw new ResponseError(400, "Missing required fields");

    // Check if user exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new ResponseError(404, "User not found");

    // Check if password is correct
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!correctPassword) throw new ResponseError(400, "Invalid credentials");

    // If user exists and password is correct, sign new token
    const expiredAge = 1000 * 60 * 60 * 24 * 1;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: expiredAge,
    });

    // Send token and user data
    const { password, ...userData} = user.toObject();

    return {
      userData,
      token,
      expiredAge,
    };
  },
};
