/**
 * @description holds index routes
 */

import {
  context,
  DebugLogUtil,
  EncryptionUtil,
  ErrorHandlerUtil,
} from '@open-template-hub/common';
import { NextFunction, Request, Response } from 'express';
import { Environment } from '../../environment';
import {
  publicRoutes as monitorPublicRoutes,
  router as monitorRouter,
} from './monitor.route';
import {
  adminRoutes as userAdminRoutes,
  publicRoutes as userPublicRoutes,
  router as userRouter,
} from './github-user.route';

const subRoutes = {
  root: '/',
  monitor: '/monitor',
  user: '/user',
  product: '/product',
};

export namespace Routes {
  let environment: Environment;
  let errorHandlerUtil: ErrorHandlerUtil;
  const debugLogUtil = new DebugLogUtil();
  let publicRoutes: string[] = [];
  let adminRoutes: string[] = [];

  function populateRoutes(mainRoute: string, routes: Array<string>) {
    let populated = Array<string>();
    for (const s of routes) {
      populated.push(mainRoute + (s === '/' ? '' : s));
    }

    return populated;
  }

  export const mount = (app: any) => {
    environment = new Environment();
    errorHandlerUtil = new ErrorHandlerUtil( debugLogUtil );

    publicRoutes = [
      ...populateRoutes(subRoutes.monitor, monitorPublicRoutes),
      ...populateRoutes(subRoutes.user, userPublicRoutes),
    ];
    console.log('Public Routes: ', publicRoutes);

    adminRoutes = [
      ...populateRoutes(subRoutes.user, userAdminRoutes),
    ];
    console.log('Admin Routes: ', adminRoutes);

    // create response interceptor
    const responseInterceptor = (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      let originalSend = res.send;
      const encryptionUtil = new EncryptionUtil(environment.args());
      res.send = function () {
        debugLogUtil.log('Starting Encryption: ', new Date());
        let encrypted_arguments = encryptionUtil.encrypt(arguments);
        debugLogUtil.log('Encryption Completed: ', new Date());

        originalSend.apply(res, encrypted_arguments as any);
      } as any;

      next();
    };

    // Use this interceptor before routes
    app.use(responseInterceptor);

    // INFO: Keep this method at top at all times
    app.all('/*', async (req: Request, res: Response, next: NextFunction) => {
      try {
        // create context
        res.locals.ctx = await context(
          req,
          environment.args(),
          publicRoutes,
          adminRoutes
        );

        next();
      } catch (err) {
        let error = errorHandlerUtil.handle(err);
        res.status(error.code).json({ message: error.message });
      }
    });

    // INFO: Add your routes here
    app.use(subRoutes.monitor, monitorRouter);
    app.use(subRoutes.user, userRouter);

    // Use for error handling
    app.use(function (
      err: Error,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      let error = errorHandlerUtil.handle(err);
      res.status(error.code).json({ message: error.message });
    });
  };
}
