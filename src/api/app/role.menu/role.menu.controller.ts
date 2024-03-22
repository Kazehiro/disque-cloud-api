'use strict';

import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { response } from '../../../helpers/response';
import { helper } from '../../../helpers/helper';
import { repository } from './role.menu.respository';
import { transformer } from './role.menu.transformer';

export default class Controller {
  public async list(req: Request, res: Response) {
    try {
      const result = await repository.list();
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      const roleMenu = transformer.list(result);
      return response.successList('list data role', roleMenu, res);
    } catch (err) {
      return helper.catchError(`role menu list: ${err.message}`, res);
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
      const roleMenu = transformer.index(rows);
      const total: any = count;
      return response.successDetail(
        'data role menu',
        { total: total?.length, values: roleMenu },
        res
      );
    } catch (err) {
      return helper.catchError(`role menu index: ${err.message}`, res);
    }
  }

  public async detail(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result: Object | any = await repository.detailRole({ role_id: id });
      if (!result) return response.failed('data not found', 404, res);
      const roleMenu: Object = await transformer.detail(result);
      return response.successDetail('data role menu', roleMenu, res);
    } catch (err) {
      return helper.catchError(`role menu detail: ${err.message}`, res);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      interface Menu {
        menu_id: number;
        create: number;
        edit: number;
        delete: number;
        approve: number;
        status: string;
      }
      const date: string = helper.date();
      const body: Array<{ role_id: any; menu: Array<Menu> }> = req?.body;
      if (body?.length === 0)
        return response.failed('request body is required', 422, res);

      let insert: Array<object> = [];
      let role_id: Array<number> = [];
      body.forEach(async (item) => {
        role_id.push(item?.role_id?.value);

        item?.menu.forEach((i) => {
          insert.push({
            role_id: item?.role_id?.value,
            menu_id: i?.menu_id,
            create: i?.create,
            edit: i?.edit,
            delete: i?.delete,
            approve: i?.approve,
            status: i?.status,
            created_by: req?.user?.username,
            created_date: date,
          });
        });
      });
      if (insert?.length > 0) {
        await repository.delete({ role_id: { [Op.in]: role_id } });
        await repository.bulkCreate(insert);
      }

      return response.success(true, 'data success saved', res);
    } catch (err) {
      return helper.catchError(`role menu create: ${err.message}`, res);
    }
  }
}

export const roleMenu = new Controller();
