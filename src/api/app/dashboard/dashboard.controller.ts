'use strict';

import { Request, Response } from 'express';
import { helper } from '../../../helpers/helper';
import { repository } from './dashboard.respository';
import { response } from '../../../helpers/response';
import { Op } from 'sequelize';
const TODAY_START = new Date().setHours(0, 0, 0, 0);
const NOW = new Date();

export default class Controller {
  public async liveData(req: Request, res: Response) {
    try {
      const { company_code, site_id } = req?.user;
      let company_site: any = {};
      if (company_code && company_code != '0')
      company_site['company_code'] = company_code;
      company_site['created_date'] = 
      { 
        [Op.gt]: TODAY_START,
        [Op.lt]: NOW
      };

      

      console.log(company_site);
      const result = await repository.list({ condition: company_site });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successList('list data site', result, res);
    } catch (err) {
      return helper.catchError(`site list: ${err.message}`, res);
    }
  }
}

export const dashboard = new Controller();
