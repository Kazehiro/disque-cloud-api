'use strict';

import { Request, Response } from 'express';
import { variable } from './company.variable';
import { helper } from '../../../helpers/helper';
import { repository } from './company.respository';
import { response } from '../../../helpers/response';

export default class Controller {
  public async list(req: Request, res: Response) {
    try {
      let condition: any = {};
      const { company_id } = req?.user;
      if (company_id && company_id != '0') condition['id'] = company_id;

      const result = await repository.list({ condition: condition });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successList('list data company', result, res);
    } catch (err) {
      return helper.catchError(`company create: ${err.message}`, res);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const limit: any = req?.query?.per_page || 10;
      const offset: any = req?.query?.page || 1;
      const keyword: any = req?.query?.q;
      let condition: any = {};
      const { company_id } = req?.user;
      if (company_id && company_id != '0') condition['id'] = company_id;

      const { count, rows } = await repository.index({
        limit: parseInt(limit),
        offset: parseInt(limit) * (parseInt(offset) - 1),
        keyword: keyword,
        condition: condition,
      });
      if (rows?.length < 1) return response.failed('data not found', 404, res);
      return response.successDetail(
        'data company',
        { total: count, values: rows },
        res
      );
    } catch (err) {
      return helper.catchError(`company index: ${err.message}`, res);
    }
  }

  public async detail(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result = await repository.detail({
        id: id,
      });
      if (!result) return response.failed('data not found', 404, res);
      return response.successDetail('data company', result, res);
    } catch (err) {
      return helper.catchError(`company detail: ${err.message}`, res);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const check = await repository.detail({
        name: req?.body?.name,
      });
      if (check) return response.failed('data already exists', 400, res);
      const data: Object = helper.only(variable.fillable(), req?.body);
      await repository.create({ ...data, created_by: req?.user?.username });
      return response.success(true, 'data success saved', res);
    } catch (err) {
      return helper.catchError(`company create: ${err.message}`, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const check = await repository.detail({ id: id });
      if (!check) return response.failed('data not found', 404, res);
      const data: Object = helper.only(variable.fillable(), req?.body, true);
      await repository.update(
        { ...data, modified_by: req?.user?.username },
        { id: id }
      );
      return response.success(true, 'data success updated', res);
    } catch (err) {
      return helper.catchError(`company update: ${err.message}`, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const date: string = helper.date();
      const check = await repository.detail({ id: id });
      if (!check) return response.failed('data not found', 404, res);
      await repository.update(
        {
          deleted_date: date,
          deleted_by: req?.user?.username || 'sistem',
        },
        { id: id }
      );
      return response.success(true, 'data success deleted', res);
    } catch (err) {
      return helper.catchError(`company delete: ${err.message}`, res);
    }
  }
}

export const company = new Controller();
