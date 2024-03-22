'use strict';

import { variable } from './role.variable';
import { Request, Response } from 'express';
import { repository } from './role.respository';
import { helper } from '../../../helpers/helper';
import { response } from '../../../helpers/response';

export default class Controller {
  public async list(req: Request, res: Response) {
    try {
      const result = await repository.list();
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successList('list data role', result, res);
    } catch (err) {
      return helper.catchError(`role list: ${err.message}`, res);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const limit: any = req?.query?.per_page || 10;
      const offset: any = req?.query?.page || 1;
      const keyword: any = req?.query?.q;
      const { count, rows } = await repository.index({
        limit: parseInt(limit),
        offset: parseInt(limit) * (parseInt(offset) - 1),
        keyword: keyword,
      });
      if (rows?.length < 1) return response.failed('data not found', 404, res);
      return response.successDetail(
        'data role',
        { total: count, values: rows },
        res
      );
    } catch (err) {
      return helper.catchError(`role index: ${err.message}`, res);
    }
  }

  public async detail(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result = await repository.detail({ role_id: id });
      if (!result) return response.failed('data not found', 404, res);
      return response.successDetail('data role', result, res);
    } catch (err) {
      return helper.catchError(`role detail: ${err.message}`, res);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const check = await repository.detail({
        role_name: req?.body?.role_name,
      });
      if (check) return response.failed('data already exists', 400, res);
      const data: Object = helper.only(variable.fillable(), req?.body);
      await repository.create({ ...data, created_by: req?.user?.username });
      return response.success(true, 'data success saved', res);
    } catch (err) {
      return helper.catchError(`role create: ${err.message}`, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const check = await repository.detail({ role_id: id });
      if (!check) return response.failed('data not found', 404, res);
      const data: Object = helper.only(variable.fillable(), req?.body, true);
      await repository.update(
        { ...data, modified_by: req?.user?.username },
        { role_id: id }
      );
      return response.success(true, 'data success updated', res);
    } catch (err) {
      return helper.catchError(`role update: ${err.message}`, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const check = await repository.detail({ role_id: id });
      if (!check) return response.failed('data not found', 404, res);
      await repository.delete({ role_id: id });
      return response.success(true, 'data success deleted', res);
    } catch (err) {
      return helper.catchError(`role update: ${err.message}`, res);
    }
  }
}

export const role = new Controller();
