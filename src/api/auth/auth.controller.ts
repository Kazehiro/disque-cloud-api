'use strict';

import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { helper } from '../../helpers/helper';
import { response } from '../../helpers/response';
import { helperauth } from '../../helpers/auth.helper';
import { variable } from '../app/user/user.variable';
import { repository } from '../app/user/user.repository';
import { transformer } from '../app/user/user.transformer';

dotenv.config();

const processLogin = async (req: Request, user: any) => {
  const payload = {
    id: user?.disque_cms_user_id,
    username: user?.username,
    role_id: user?.role_id,
    company_id: user?.company_id,
    site_id: user?.site_id,
  };

  const token: string = helperauth.token(payload);
  const refresh: string = helperauth.refresh(payload);

  const data: Object = {
    user: {
      ...user,
    },
    access_token: token,
    refresh_token: refresh,
  };
  return data;
};

export default class Controller {
  public async login(req: Request, res: Response) {
    const user = req?.user;

    const isMatch = await helper.compareIt(req?.body?.password, user?.password);
    if (isMatch) {
      try {
        const data = await processLogin(req, user);
        return response.successDetail('login success', data, res);
      } catch (err) {
        return helper.catchError(`login: ${err.message}`, res);
      }
    } else {
      return response.failed('password incorrect', 400, res);
    }
  }

  public async refresh(req: Request, res: Response) {
    const result = await repository.detail({
      disque_cms_user_id: req?.user?.id,
    });
    if (!result) return response.failed('User not found', 404, res);
    const payload = {
      id: result?.getDataValue('disque_cms_user_id'),
      username: result?.getDataValue('username'),
      role_id: result?.getDataValue('role_id'),
    };

    try {
      const refresh: string = helperauth.token(payload);

      const data: Object = {
        userdata: {
          ...result?.dataValues,
        },
        access_token: refresh,
        refresh_token: req?.body?.refresh_token,
      };
      response.successDetail('new access token', data, res);
    } catch (err) {
      return helper.catchError(`refresh: ${err.message}`, res);
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const date: string = helper.date();

      const username: string = req?.body?.username;
      const company_code: string = req?.body?.company_code;
      const role_id: string = req?.body?.role_id;
      const cek = await repository.detail({
        [Op.or]: [
          { username: { [Op.like]: `%${username}%` } },
        ],
      });
      if (cek) return response.failed('data already exists', 400, res);

      if (!req?.body?.password)
        return response.failed('password is required', 422, res);

      if (!company_code)
        return response.failed('company code is required', 422, res);

      if (!role_id)
        return response.failed('company code is required', 422, res);

      const password: string = await helper.hashIt(req?.body?.password);
      const confirm_hash: string = await helper.hashIt(username, 6);
      const data: Object = helper.only(variable.fillable(), req?.body);

      const result = await repository.create({
        ...data,
        username: username,
        password: password,
        company_code: company_code,
        role_id: role_id,
        status: true,
        created_by: 'admin',
        confirm_hash: confirm_hash,
      });

      const getUser: Object = await transformer.detail(result);
      return response.successDetail('data success created', getUser, res);
    } catch (err) {
      return helper.catchError(`register: ${err?.message}`, res);
    }
  }
}

export const auth = new Controller();
