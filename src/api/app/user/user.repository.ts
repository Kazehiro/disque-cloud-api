'use strict';

import { Op } from 'sequelize';
import model from './user.model';
import Role from '../role/role.model';
import Site from '../site/site.model';
import { site } from '../site/site.controller';

export default class Respository {
  public index(data: any) {
    let query: Object = {
      where: { deleted_date: null, ...data?.condition },
      order: [['disque_cms_user_id', 'DESC']],
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
          ...data?.condition,
          deleted_date: null,
          [Op.or]: [
            { username: { [Op.like]: `%${data?.keyword}%` } },
          ],
        },
        include: [
          {
            model: Role,
            attributes: ['role_id', 'role_name', 'status'],
            as: 'role',
            required: false,
          },
          {
            model: Site,
            attributes: ['company_setting_id', 'company_code', 'title'],
            as: 'site',
            required: false,
          },
        ],
      };
    }
    return model.findAndCountAll({
      ...query,
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Role,
          attributes: ['role_id', 'role_name', 'status'],
          as: 'role',
          required: false,
        },
        {
          model: Site,
          attributes: ['company_setting_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        },
      ],
    });
  }

  public detail(data: any) {
    return model.findOne({
      where: {
        ...data,
        deleted_date: null,
      },
      include: [
        {
          model: Role,
          attributes: ['role_id', 'role_name', 'status'],
          as: 'role',
          required: false,
        },
        {
          model: Site,
          attributes: ['company_setting_id', 'company_code', 'title'],
          as: 'site',
          required: false,
        },
      ],
    });
  }

  public check(data: any) {
    return model.findOne({
      where: {
        ...data,
        deleted_date: null,
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
}

export const repository = new Respository();
