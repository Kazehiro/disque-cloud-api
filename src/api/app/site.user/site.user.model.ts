'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Site from '../site/site.model';
import Company from '../company/company.model';

const Model = db.define(
  'disque_user',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    _password: {
      type: DataTypes.STRING,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
Model.belongsTo(Site, {
  as: 'site',
  targetKey: 'company_code',
  foreignKey: 'company_code',
});
Model.belongsTo(Company, {
  as: 'company',
  targetKey: 'id',
  foreignKey: 'company_id',
});

export default Model;
