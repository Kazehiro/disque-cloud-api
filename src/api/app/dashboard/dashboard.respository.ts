'use strict';

import { Op } from 'sequelize';
import model from './dashboard.model';
import Site from '../site/site.model';

export default class Respository {
  public list(data: any) {
    return model.findAll({
      order: [['id', 'DESC']],
      where: { 
        ...data?.condition,
      },
      include: [
        {
          model: Site,
          attributes: ['company_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        }
      ],
    });
  }
}

export const repository = new Respository();
