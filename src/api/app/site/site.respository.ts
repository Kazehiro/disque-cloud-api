'use strict';

import { Op } from 'sequelize';
import model from './site.model';
import Company from '../company/company.model';
import Province from '../area/provinces.model';
import Regency from '../area/regencies.model';

export default class Respository {
  public list(data: any) {
    return model.findAll({
      order: [['company_setting_id', 'DESC']],
      where: { ...data?.condition },
      include: [
        {
          model: Company,
          attributes: ['id', 'name', 'notlp', 'email'],
          as: 'company',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
          required: false,
        },
      ],
    });
  }

  public index(data: any) {
    let query: Object = {
      where: { ...data?.condition },
      order: [['company_setting_id', 'DESC']],
      offset: data?.offset,
      limit: data?.limit,
      include: [
        {
          model: Company,
          attributes: ['id', 'name', 'notlp', 'email'],
          as: 'company',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
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
            { sitename: { [Op.like]: `%${data?.keyword}%` } },
            { email: { [Op.like]: `%${data?.keyword}%` } },
            { address: { [Op.like]: `%${data?.keyword}%` } },
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
          model: Company,
          attributes: ['id', 'name', 'notlp', 'email'],
          as: 'company',
          required: false,
        },
        {
          model: Regency,
          attributes: ['id', 'name'],
          as: 'regency',
          required: false,
        },
        {
          model: Province,
          attributes: ['id', 'name'],
          as: 'province',
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

  // public listSiteDevice(data: any) {
  //   return modelSiteDevice.findAll({
  //     where: data?.condition,
  //     order: [['id', 'DESC']],
  //     include: [
  //       {
  //         model: model,
  //         attributes: ['id', 'sitename', 'notlp', 'email'],
  //         as: 'site',
  //         required: false,
  //       },
  //     ],
  //   });
  // }

  // public detailSiteDevice(data: any) {
  //   return modelSiteDevice.findOne({
  //     where: data?.condition,
  //     order: [['id', 'DESC']],
  //     include: [
  //       {
  //         model: model,
  //         attributes: ['id', 'sitename', 'notlp', 'email'],
  //         as: 'site',
  //         required: false,
  //       },
  //     ],
  //   });
  // }

  // public createSiteDevice(data: any) {
  //   return modelSiteDevice.create(data);
  // }

  // public updateSiteDevice(data: any, condition: any) {
  //   return modelSiteDevice.update(data, {
  //     where: condition,
  //   });
  // }

  // public deleteSiteDevice(condition: any) {
  //   return modelSiteDevice.destroy({
  //     where: condition,
  //   });
  // }
}

export const repository = new Respository();
