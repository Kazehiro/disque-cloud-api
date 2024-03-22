'use strict';

import { Op } from 'sequelize';
import model from './role.menu.model';
import Role from '../role/role.model';
import Menu from '../menu/menu.model';

export default class Respository {
  public list() {
    return Role.findAll({
      order: [['role_id', 'DESC']],
      include: [
        {
          model: model,
          as: 'menu',
          required: false,
          include: [
            {
              model: Menu,
              as: 'menu',
              required: false,
              where: {
                deleted_date: null,
              },
            },
          ],
        },
      ],
    });
  }

  public index(data: any) {
    let query: Object = {
      attributes: ['role_id', 'role_name', 'status'],
      order: [['role_id', 'DESC']],
      offset: data?.offset,
      limit: data?.limit,
      group: ['app_role.role_id', 'app_role.role_name', 'app_role.status'],
      include: [
        {
          model: model,
          as: 'menu',
          required: false,
          include: [
            {
              model: Menu,
              as: 'menu',
              required: false,
              where: {
                deleted_date: null,
              },
            },
          ],
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
          role_name: { [Op.like]: `%${data?.keyword}%` },
        },
      };
    }
    return Role.findAndCountAll(query);
  }

  public detail(condition: any) {
    return model.findOne({
      where: condition,
    });
  }

  public detailRole(condition: any) {
    return Role.findOne({
      where: condition,
      include: [
        {
          model: model,
          as: 'menu',
          required: false,
          include: [
            {
              model: Menu,
              as: 'menu',
              required: false,
              where: {
                deleted_date: null,
              },
            },
          ],
        },
      ],
    });
  }

  public bulkCreate(data: any) {
    return model.bulkCreate(data);
  }

  public delete(condition: any) {
    return model.destroy({
      where: condition,
    });
  }
}

export const repository = new Respository();
