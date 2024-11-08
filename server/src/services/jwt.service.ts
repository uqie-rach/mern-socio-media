import jwt from "jsonwebtoken";

import ResponseError from "@lib/responseError.ts";

interface JWTGenerationProps {
  payload: string | Buffer | Object;
  secretKey?: jwt.Secret;
  signInOpt?: jwt.SignOptions;
}

interface JWTVerificationProps {
  token: string;
  secretKey?: jwt.Secret;
  signInOpt?: jwt.SignOptions;
}

export default {
  generate: async ({
    payload,
    secretKey = process.env.JWT_SECRET!,
    signInOpt,
  }: JWTGenerationProps) => {
    try {
      const token = `Bearer ${jwt.sign(payload, secretKey, signInOpt)}`;

      return token;
    } catch (error: any) {
      console.error("Error while generating JWT: ", error);
      throw new ResponseError(400, error.message);
    }
  },

  verify: async ({
    token,
    secretKey = process.env.JWT_SECRET!,
    signInOpt,
  }: JWTVerificationProps) => {
    try {
      const data = jwt.verify(token, secretKey, signInOpt);

      return data;
    } catch (error: any) {
      console.error("Error while verifying JWT: ", error);
      throw new ResponseError(400, error.message);
    }
  },
};
