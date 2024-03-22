'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Site from '../site/site.model';

const Model = db.define(
  'disque_service_list',
  {
    service_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    role_name: {
      type: DataTypes.STRING,
    },
    service_type: {
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

export default Model;
