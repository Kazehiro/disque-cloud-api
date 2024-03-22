'use strict';

import { Request, Response, NextFunction } from 'express';
import { response } from '../../helpers/response';

export default class Validation {
  public async register(req: Request, res: Response, next: NextFunction) {
    const regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!req?.body?.username)
      return response.failed('Username is required', 422, res);
    if (!req?.body?.password)
      return response.failed('password is required', 422, res);

    next();
  }
}

export const validation = new Validation();
