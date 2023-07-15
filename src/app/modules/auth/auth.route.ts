import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from '../user/user.controller';
import { AuthController } from './auth.controller';
import { authValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(authValidation.loginZodSchema),
  UserController.createUser
);

router.post(
  '/login',
  validateRequest(authValidation.loginZodSchema),
  AuthController.loginUser
);

router.post('/refresh-token', AuthController.refreshToken);

export const AuthRoutes = router;
