import { UserRole } from "@prisma/client";

import * as bcrypt from "bcrypt";
import config from "../../config";
import prisma from "../utils/prisma";
export const initiateSuperAdmin = async () => {
  // create a super admin payload
  const payload: any = {
    firstName: "Super",
    lastName: "Admin",
    email: "admin@gmail.com",
    role: UserRole.SUPER_ADMIN,
  };
  // hash the password with bcrypt
  const hashedPassword: string = await bcrypt.hash(
    "12345678",
    Number(config.bcrypt_salt_rounds)
  );
  payload.password = hashedPassword;

  // check if user already exists
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  // if user already exists, return
  if (isExistUser) return;

  // create a new user as super admin
  await prisma.user.create({
    data: payload,
  });
};
