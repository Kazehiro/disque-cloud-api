'use strict';

import dotenv from 'dotenv';
import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { variable } from './user.variable';
import { helper } from '../../../helpers/helper';
import { repository } from './user.repository';
import { response } from '../../../helpers/response';
import { transformer } from './user.transformer';

dotenv.config();

export default class Controller {
  public async index(req: Request, res: Response) {
    try {
      const limit: any = req?.query?.per_page || 10;
      const offset: any = req?.query?.page || 1;
      const keyword: any = req?.query?.q;
      const { company_id, site_id } = req?.user;
      let company_site: any = {};
      if (company_id && company_id != '0')
        company_site['company_id'] = req?.user?.company_id;
      if (site_id && site_id != '0')
        company_site['site_id'] = req?.user?.site_id;

      const { count, rows } = await repository.index({
        limit: parseInt(limit),
        offset: parseInt(limit) * (parseInt(offset) - 1),
        keyword: keyword,
      });
      return response.successDetail(
        'data resource',
        { total: count, values: rows },
        res
      );
    } catch (err) {
      return helper.catchError(`resource index: ${err.message}`, res);
    }
  }

  public async check(req: Request, res: Response) {
    try {
      const username: string = req.params.username;
      const result: Object | any = await repository.detail({
        username: username,
      });
      if (result) return response.success(false, 'data already used', res);
      return response.success(true, 'data can used', res);
    } catch (err) {
      return helper.catchError(`resource check: ${err.message}`, res);
    }
  }

  public async detail(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result: Object | any = await repository.detail({ resource_id: id });
      if (!result) return response.failed('data not found', 404, res);
      const getUser: Object = await transformer.detail(result);
      return response.successDetail('data resource', getUser, res);
    } catch (err) {
      return helper.catchError(`resource detail: ${err.message}`, res);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const {
        company_id,
        site_id,
        first_name,
        last_name,
        username,
        email,
        password,
      } = req?.body;
      if (!company_id || !site_id)
        return response.failed('company_id or site_id is required', 422, res);

      const full_name: string = `${first_name || ''}${
        last_name ? ' ' + last_name : ''
      }`;
      const newUsername: string =
        username || full_name?.toLocaleLowerCase().replace(/ /g, '');
      const check = await repository.detail({
        [Op.or]: [
          { email: { [Op.like]: `%${email}%` } },
          { username: { [Op.like]: `%${newUsername}%` } },
        ],
      });
      if (check) return response.failed('data already exists', 400, res);
      if (!password) return response.failed('password is required', 422, res);

      const date: string = helper.date();
      let image_foto: any = null;
      if (company_id)
        if (
          req?.files &&
          req?.files.image_foto &&
          req?.files?.image_foto != undefined
        ) {
          image_foto = await helper.upload(req?.files.image_foto, 'resource');
        }

      const hashPassword: string = await helper.hashIt(password);
      const data: Object = helper.only(variable.fillable(), req?.body);
      const resource = await repository.create({
        ...data,
        username: newUsername,
        password: hashPassword,
        full_name: full_name,
        image_foto: image_foto,
        created_by: req?.user?.username || 'sistem',
      });

      return response.success(true, 'data success saved', res);
    } catch (err) {
      return helper.catchError(`resource create: ${err.message}`, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const check = await repository.check({ resource_id: id });
      if (!check) return response.failed('data not found', 404, res);

      let image_foto: any = null;
      if (
        req?.files &&
        req?.files.image_foto &&
        req?.files?.image_foto != undefined
      ) {
        image_foto = await helper.upload(req?.files.image_foto, 'resource');
      }

      const date: string = helper.date();
      let password: any = null;
      if (req?.body?.password) {
        const isMatch: boolean = await helper.compareIt(
          req?.body?.password,
          check?.getDataValue('password')
        );
        if (!isMatch) {
          password = await helper.hashIt(req?.body?.password);
        } else {
          return response.failed('password does not same old', 500, res);
        }
      }

      const full_name: string = `${req?.body?.first_name || ''}${
        req?.body?.last_name ? ' ' + req?.body?.last_name : ''
      }`;
      const data: any = helper.only(variable.fillable(), req?.body, true);
      delete data?.username;
      await repository.update(
        {
          ...data,
          password: password || check?.getDataValue('password'),
          full_name: full_name || check?.getDataValue('full_name'),
          image_foto: image_foto || check?.getDataValue('image_foto'),
          modified_by: req?.user?.username,
          modified_date: date,
        },
        { resource_id: id }
      );
      return response.success(true, 'data success updated', res);
    } catch (err) {
      return helper.catchError(`resource update: ${err.message}`, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const date: string = helper.date();
      const id: any = req.params.id || 0;
      const check: Object | any = await repository.detail({ resource_id: id });
      if (!check) return response.failed('data not found', 404, res);
      await repository.update(
        { deleted_date: date, deleted_by: req?.user?.username },
        { resource_id: id }
      );
      return response.success(true, 'data success deleted', res);
    } catch (err) {
      return helper.catchError(`resource delete: ${err.message}`, res);
    }
  }
}

export const resource = new Controller();
