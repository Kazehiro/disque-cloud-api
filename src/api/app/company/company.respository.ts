'use strict';

import { Op } from 'sequelize';
import model from './company.model';
import Province from '../area/provinces.model';
import Regency from '../area/regencies.model';
import District from '../area/districts.model';
import Village from '../area/villages.model';

export default class Respository {
  public list(data: any) {
    return model.findAll({
      attributes: { exclude: ['deleted_date', 'deleted_by'] },
      where: { deleted_date: null, ...data?.condition },
      order: [['id', 'DESC']],
      include: [
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: District,
          attributes: ['id', 'name'],
          as: 'district',
          required: false,
        },
        {
          model: Village,
          attributes: ['id', 'name'],
          as: 'village',
          required: false,
        },
      ],
    });
  }

  public index(data: any) {
    let query: Object = {
      attributes: { exclude: ['deleted_date', 'deleted_by'] },
      where: { deleted_date: null, ...data?.condition },
      order: [['id', 'DESC']],
      offset: data?.offset,
      limit: data?.limit,
      include: [
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: District,
          attributes: ['id', 'name'],
          as: 'district',
          required: false,
        },
        {
          model: Village,
          attributes: ['id', 'name'],
          as: 'village',
          required: false,
        },
      ],
    };

    if (data?.keyword !== undefined && data?.keyword != null) {
      query = {
        ...query,
        where: {
          ...data?.condition,
          deleted_date: null,
          [Op.or]: [
            { name: { [Op.like]: `%${data?.keyword}%` } },
            { address: { [Op.like]: `%${data?.keyword}%` } },
            { email: { [Op.like]: `%${data?.keyword}%` } },
          ],
        },
      };
    }
    return model.findAndCountAll(query);
  }

  public detail(condition: any) {
    return model.findOne({
      attributes: { exclude: ['deleted_date', 'deleted_by'] },
      where: {
        deleted_date: null,
        ...condition,
      },
      include: [
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: District,
          attributes: ['id', 'name'],
          as: 'district',
          required: false,
        },
        {
          model: Village,
          attributes: ['id', 'name'],
          as: 'village',
          required: false,
        },
      ],
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
