/**
 * @description holds user routes
 */

import { ResponseCode } from '@open-template-hub/common';
import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { GithubUserController } from '../controller/github-user.controller';

const subRoutes = {
  root: '/',
  all: '/all',
  me: '/me',
  search: '/search',
  public: '/public',
};

export const publicRoutes = [subRoutes.search, subRoutes.public];

export const adminRoutes = [subRoutes.all];

export const router = Router();

const userController = new GithubUserController();

// User detail
router.get(subRoutes.public, async (req: Request, res: Response) => {
  // Get a single User detail
  let user = await userController.getTotalContributions(
    req.query.username as string
  );
  res.status(ResponseCode.OK).json(user);
});
