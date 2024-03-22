'use strict';

import { Op } from 'sequelize';
import model from './service.model';
import Site from '../site/site.model';

export default class Respository {
  public list(data: any) {
    return model.findAll({
      order: [['service_id', 'DESC']],
      where: { ...data?.condition },
      include: [
        {
          model: Site,
          attributes: ['company_setting_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        },
      ],
    });
  }

  public index(data: any) {
    let query: Object = {
      where: { ...data?.condition },
      order: [['service_id', 'DESC']],
      offset: data?.offset,
      limit: data?.limit,
      include: [
        {
          model: Site,
          attributes: ['company_setting_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        },
      ],
    };
    if (
      data?.keyword !== undefined &&
      data?.keyword != null &&
      data?.keyword != ''
    ) {
      query = {
        ...query,
        where: {
          ...data?.condition,
          [Op.or]: [
            { company_code: { [Op.like]: `%${data?.keyword}%` } },
          ],
        },
      };
    }
    return model.findAndCountAll(query);
  }

  public detail(condition: any) {
    return model.findOne({
      where: {
        ...condition,
      },
      include: [
        {
          model: Site,
          attributes: ['company_setting_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        },
      ],
    });
  }

  public check(condition: any) {
    return model.findOne({
      where: {
        ...condition,
      },
    });
  }

  public create(data: any) {
    return model.create(data);
  }

  public update(data: any, condition: any) {
    return model.update(data, {
      where: condition,
    });
  }

  public delete(condition: any) {
    return model.destroy({
      where: condition,
    });
  }
}

export const repository = new Respository();
