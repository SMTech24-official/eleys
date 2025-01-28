import { IUser, IUserFilterRequest } from './user.interface';
import * as bcrypt from 'bcrypt';


import { Prisma, User, UserRole, UserStatus } from '@prisma/client';
import { userSearchAbleFields } from './user.costant';
import config from '../../../config';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import prisma from '../../utils/prisma';
import { paginationHelper } from '../../utils/paginationHelper';
import { IPaginationOptions } from '../../utils/paginations';

// Create a new user in the database.
const createUserIntoDb = async (payload: User) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (existingUser) {
    if (existingUser.email === payload.email) {
      throw new AppError(
        400,
        `User with this email ${payload.email} already exists`,
      );
    }
  }
  const hashedPassword: string = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const result = await prisma.user.create({
    data: { ...payload, password: hashedPassword },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

// reterive all users from the database also searcing anf filetering
const getUsersFromDb = async (
  params: IUserFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andCondions: Prisma.UserWhereInput[] = [];

  if (params.searchTerm) {
    andCondions.push({
      OR: userSearchAbleFields.map(field => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andCondions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }
  const whereConditons: Prisma.UserWhereInput = { AND: andCondions };

  const result = await prisma.user.findMany({
    where: whereConditons,
    skip,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  const total = await prisma.user.count({
    where: whereConditons,
  });

  if (!result || result.length === 0) {
    throw new AppError(404, 'No active users found');
  }
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

// update profile by user won profile uisng token or email and id
const updateProfile = async (user: IUser, payload: User) => {
  const userInfo = await prisma.user.findUnique({
    where: {
      email: user.email,
      id: user.id,
    },
  });

  if (!userInfo) {
    throw new AppError(404, 'User not found');
  }

  // Update the user profile with the new information
  const result = await prisma.user.update({
    where: {
      email: userInfo.email,
    },
    data: {
      firstName: payload.firstName || userInfo.firstName,
      lastName: payload.lastName || userInfo.lastName,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user profile',
    );

  return result;
};

// update user data into database by id fir admin
const updateUserIntoDb = async (payload: IUser, id: string) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
  });
  if (!userInfo)
    throw new AppError(httpStatus.NOT_FOUND, 'User not found with id: ' + id);

  const result = await prisma.user.update({
    where: {
      id: userInfo.id,
    },
    data: payload,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result)
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update user profile',
    );

  return result;
};

export const userService = {
  createUserIntoDb,
  getUsersFromDb,
  updateProfile,
  updateUserIntoDb,
};
