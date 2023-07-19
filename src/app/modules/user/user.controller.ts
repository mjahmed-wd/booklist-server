import { Request, Response } from 'express';
import { RequestHandler } from 'express-serve-static-core';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const userData = req.body;
    const result = await UserService.createUser(userData);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User sign up success!',
      data: result,
    });
  }
);

const getUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await UserService.getUser(id);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to user wishlist',
      data: result,
    });
  }
);

const addBookToUserWishlist: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    console.log(req.body);
    const bookId = req.body.bookId;
    const result = await UserService.addBookToUserWishlist(id, bookId);
    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to user wishlist',
      data: result,
    });
  }
);

const addBookToUserPlannedList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const bookId = req.body.bookId;
    const result = await UserService.addBookToUserPlannedList(id, bookId);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to user planned reading list',
      data: result,
    });
  }
);

const finishBookFromUserPlannedList: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const bookId = req.body.bookId;
    const result = await UserService.finishBookFromUserPlannedList(id, bookId);
    sendResponse<any>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Added to user wishlist',
      data: result,
    });
  }
);

export const UserController = {
  getUser,
  createUser,
  addBookToUserWishlist,
  addBookToUserPlannedList,
  finishBookFromUserPlannedList,
};
