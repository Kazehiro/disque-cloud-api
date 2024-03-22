'use strict';

import { Op } from 'sequelize';
import model from './role.model';

export default class Respository {
  public list() {
    return model.findAll({
      order: [['role_id', 'DESC']],
    });
  }

  public index(data: any) {
    let query: Object = {
      order: [['role_id', 'DESC']],
      offset: data?.offset,
      limit: data?.limit,
    };
    if (
      data?.keyword !== undefined &&
      data?.keyword != null &&
      data?.keyword != ''
    ) {
      query = {
        ...query,
        where: {
          [Op.or]: [{ role_name: { [Op.like]: `%${data?.keyword}%` } }],
        },
      };
    }
    return model.findAndCountAll(query);
  }

  public detail(condition: any) {
    return model.findOne({
      where: condition,
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
