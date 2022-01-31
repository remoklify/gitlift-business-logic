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
  decrypt: '/decrypt'
};

export const publicRoutes = [subRoutes.search, subRoutes.public, subRoutes.decrypt];

export const adminRoutes = [subRoutes.all];

export const router = Router();

router.get(subRoutes.public, async (req: Request, res: Response) => {
  // Get user details
  const userController = new GithubUserController(
    <string>process.env.GITHUB_API_AUTH_TOKEN,
    <string>process.env.GITHUB_API_URL,
    <string>process.env.SECRET
  );
  let user = await userController.getUserDetails(req.query.username as string);
  res.status(ResponseCode.OK).json(user);
});

router.get(subRoutes.decrypt, async (req: Request, res: Response) => {
  // Get user details
  const userController = new GithubUserController(
    <string>process.env.GITHUB_API_AUTH_TOKEN,
    <string>process.env.GITHUB_API_URL,
    <string>process.env.SECRET
  );
  let user = await userController.decryptHash(req.query.hash as string);
  res.status(ResponseCode.OK).json(user);
});

