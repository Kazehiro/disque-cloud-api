'use strict';

import { Op } from 'sequelize';
import { helper } from '../../helpers/helper';
import { response } from '../../helpers/response';
import { helperauth } from '../../helpers/auth.helper';
import { Request, Response, NextFunction } from 'express';
import { repository } from '../app/user/user.repository';

type RequestBody<T> = Request<{}, {}, T>;
interface UserBody {
  username: string;
  password: string;
}

export default class Middleware {
  public async checkBearerToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization: string = req?.headers['authorization'] || '';
    const token: string = await helperauth.decodeBearerToken(authorization);
    if (token === '')
      return response.failed('auth Bearer is required', 422, res);

    try {
      const auth: any = helperauth.decodeToken(token);
      req.user = auth;
      req.user.distributor_retail = helper.condition(auth);
      next();
      return;
    } catch (err) {
      await helper.sendNotif(`check token: ${err?.message}`);
      if (err?.name === 'TokenExpiredError') {
        return response.failed(err?.message, 401, res);
      } else {
        return response.failed('invalid auth Bearer', 401, res);
      }
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      req.user = helperauth.decodeRefreshToken(req?.body?.refresh_token);
      next();
      return;
    } catch (err) {
      await helper.sendNotif(`check refresh token: ${err?.message}`);
      if (err?.name === 'TokenExpiredError') {
        return response.failed(err?.message, 401, res);
      } else {
        return response.failed('invalid auth Bearer', 401, res);
      }
    }
  }

  public async checkExpiredToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const authorization: string = req?.headers['authorization'] || '';
    const token: string = await helperauth.decodeBearerToken(authorization);
    if (token === '')
      return response.failed('auth Bearer is required', 422, res);

    try {
      req.user = helperauth.decodeToken(token);
      next();
      return;
    } catch (err) {
      await helper.sendNotif(`check expired token: ${err?.message}`);
      if (err?.name === 'TokenExpiredError') {
        req.user = helperauth.decodeExpiredToken(token);
        next();
        return;
      } else {
        return response.failed('invalid auth Bearer', 401, res);
      }
    }
  }

  public async checkVerify(
    req: RequestBody<UserBody>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const username: string = req?.body?.username;
      const password: string = req?.body?.password;
      if (!username || !password)
        return response.failed('Username or password is required', 422, res);

      const result = await repository.detail({
        [Op.or]: [ { username: username }],
      });
      if (!result) return response.failed('Data not found', 404, res);

      if (result?.getDataValue('status') === true) {
        req.user = {
          ...result?.dataValues
        };
        next();
        return;
      } else {
        let message: string = 'Your account is inactive';
        if (result?.getDataValue('status') === 'NV')
          message = 'Your account need verification';
        return response.failed(message, 400, res);
      }
    } catch (err) {
      await helper.sendNotif(`check verify: ${err?.message}`);
      return response.failed(err?.name, 400, res);
    }
  }
}

export const auth = new Middleware();
