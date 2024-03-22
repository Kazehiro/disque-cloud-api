'use strict';

import { DataTypes } from 'sequelize';
import Site from '../site/site.model';
import Role from '../role/role.model';
import db from '../../../config/database';

const Model = db.define(
  'disque_cms_user',
  {
    disque_cms_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    image_foto: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    created_by: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.STRING,
    },
    modified_date: {
      type: DataTypes.DATE,
    },
    deleted_by: {
      type: DataTypes.STRING,
    },
    deleted_date: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
Model.belongsTo(Role, { as: 'role', foreignKey: 'role_id' });

Model.belongsTo(Site, {
  as: 'site',
  targetKey: 'company_code',
  foreignKey: 'company_code',
});

export default Model;
