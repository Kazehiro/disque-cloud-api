'use strict';

import { Request, Response } from 'express';
import { variable } from './site.user.variable';
import { helper } from '../../../helpers/helper';
import { repository } from './site.user.respository';
import { response } from '../../../helpers/response';
const footerConst = "Selamat Datang di Bank Rakyat Indonesia {0}, PT. Bank Rakyat Indonesia (persero) Tbk. terdaftar dan diawasi oleh Otoritas Jasa Keuangan I Contact 1500017 www.bri.co.id I Facebook : BANK BRI I Twitter : @promo_BRI I BRI Melayani Dengan Setulus Hati"

export default class Controller {
  public async list(req: Request, res: Response) {
    try {
      const { company_id, company_code } = req?.user;
      let company_site: any = {};
      if (company_id && company_id != '0')
      company_site['company_id'] = company_id;
      if (company_code && company_code != '0')
      company_site['company_code'] = company_code;


      const result = await repository.list({ condition: company_site });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successList('list data site', result, res);
    } catch (err) {
      return helper.catchError(`site list: ${err.message}`, res);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const limit: any = req?.query?.per_page || 10;
      const offset: any = req?.query?.page || 1;
      const keyword: any = req?.query?.q;
      const { company_id, company_code } = req?.user;
      let company_site: any = {};
      if (company_id && company_id != '0')
      company_site['company_id'] = company_id;
      if (company_code && company_code != '0')
      company_site['company_code'] = company_code;

      const { count, rows } = await repository.index({
        limit: parseInt(limit),
        offset: parseInt(limit) * (parseInt(offset) - 1),
        keyword: keyword,
        condition: company_site,
      });
      if (rows?.length < 1) return response.failed('data not found', 404, res);
      return response.successDetail(
        'data site',
        { total: count, values: rows },
        res
      );
    } catch (err) {
      return helper.catchError(`site index: ${err.message}`, res);
    }
  }

  public async siteByCompanyId(req: Request, res: Response) {
    try {
      const company_code: any = req.params.id || 0;
      console.log(company_code)
      const result = await repository.list({
        condition: { company_code: company_code },
      });
      if (!result) return response.failed('data not found', 404, res);
      return response.successDetail('data site', result, res);
    } catch (err) {
      return helper.catchError(`site by company_id: ${err.message}`, res);
    }
  }

  public async detail(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;

      const result = await repository.detail({
        user_id: id,
      });
      if (!result) return response.failed('data not found', 404, res);
      return response.successDetail('data site', result, res);
    } catch (err) {
      return helper.catchError(`site detail: ${err.message}`, res);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      let data: any = helper.only(variable.fillable(), req?.body);

      await repository.create({
        ...data
      });
      return response.success(true, 'data success saved', res);
    } catch (err) {
      return helper.catchError(`site create: ${err.message}`, res);
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const user_id: any = req.params.id || 0;
      const check = await repository.check({ user_id: user_id });
      if (!check) return response.failed('data not found', 404, res);

      const data: Object = helper.only(variable.fillable(), req?.body, true);
      await repository.update(
        {
          ...data,
          modified_by: req?.user?.username,
        },
        { user_id: user_id }
      );
      return response.success(true, 'data success updated', res);
    } catch (err) {
      return helper.catchError(`site update: ${err.message}`, res);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const user_id: any = req.params.id || 0;

      const check = await repository.detail({
        user_id: user_id
      });
      if (!check) return response.failed('data not found', 404, res);
      await repository.delete({ user_id: user_id });
      return response.success(true, 'data success deleted', res);
    } catch (err) {
      return helper.catchError(`site delete: ${err.message}`, res);
    }
  }
}

export const user = new Controller();
