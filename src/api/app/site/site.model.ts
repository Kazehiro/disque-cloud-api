'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Company from '../company/company.model';
import Province from '../area/provinces.model';
import Regency from '../area/regencies.model';

const Model = db.define(
  'disque_company_setting',
  {
    company_setting_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    video_url: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
    },
    footer: {
      type: DataTypes.STRING,
    },
    logo_url: {
      type: DataTypes.STRING,
    },
    alamat: {
      type: DataTypes.STRING,
    },
    longitude: {
      type: DataTypes.FLOAT,
    },
    latitude: {
      type: DataTypes.FLOAT,
    },
    cs: {
      type: DataTypes.INTEGER,
    },
    teller: {
      type: DataTypes.INTEGER,
    },
    image: {
      type: DataTypes.INTEGER,
    },
    regency_id: {
      type: DataTypes.INTEGER,
    },
    province_id: {
      type: DataTypes.INTEGER,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
    company_parent_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
Model.belongsTo(Company, {
  as: 'company',
  targetKey: 'id',
  foreignKey: 'company_id',
});
Model.belongsTo(Regency, {
  as: 'regency',
  targetKey: 'id',
  foreignKey: 'regency_id',
});
Model.belongsTo(Province, {
  as: 'province',
  targetKey: 'id',
  foreignKey: 'province_id',
});

export default Model;
