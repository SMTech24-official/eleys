  import httpStatus from "http-status";

import { userService } from "./user.services";
import { Request, Response } from "express";

import { userFilterableFields } from "./user.costant";
import pick from "../../utils/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Registered successfully!",
    data: result,
  });
});



// get all user form db
const getUsers = catchAsync(async (req: Request, res: Response) => {

  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

  const result = await userService.getUsersFromDb(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieve successfully!",
    data: result,
  });
});


// get all user form db
const updateProfile = catchAsync(async (req: Request & {user?:any}, res: Response) => {
  const user = req?.user;

  const result = await userService.updateProfile(user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully!",
    data: result,
  });
});


// *! update user role and account status
const updateUser = catchAsync(async (req: Request, res: Response) => {
const id = req.params.id;
  const result = await userService.updateUserIntoDb( req.body,id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User updated successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
  getUsers,
  updateProfile,
  updateUser
};
