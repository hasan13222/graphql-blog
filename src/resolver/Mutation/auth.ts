import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";

type TSigninPayload = { email: string; password: string };
interface TSignupPayload extends TSigninPayload {
  name: string;
}

export const authResolvers = {
  signup: async (parent: any, args: TSignupPayload, { prisma }: any) => {
    const hashedPassword = await bcrypt.hash(
      args.password,
      Number(config.salt)
    );
    return await prisma.user.create({
      data: { ...args, password: hashedPassword },
    });
  },
  signin: async (parent: any, args: TSigninPayload, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: { email: args.email },
    });

    if (!user) {
      return {
        userError: "User not found",
        token: null,
      };
    }

    const isPasswordMatched = await bcrypt.compare(
      args.password,
      user.password
    );
    if (!isPasswordMatched) {
      return {
        userError: "Password not matched",
        token: null,
      };
    }

    const token = jwt.sign(
      { userId: user.id },
      config.access_token_secret as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      userError: null,
      token: token,
    };
  },
  updateProfile: async (
    parent: any,
    args: TSigninPayload,
    { prisma, userData }: any
  ) => {
    return await prisma.profile.upsert({
      where: { userId: userData.userId },
      update: args,
      create: { ...args, userId: userData.userId },
    });
  },
};
