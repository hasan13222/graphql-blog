import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.access_token_secret as string);
    return userData;
  } catch {
    return null;
  }
};
