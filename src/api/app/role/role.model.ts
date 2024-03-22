'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
// import { helper } from '../../../helpers/helper';
// import RoleMenu from '../role.menu/role.menu.model';

const Model = db.define(
  'disque_cms_role',
  {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_name: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.BOOLEAN,
    },
    created_by: {
      type: DataTypes.STRING(100),
    },
    created_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
      type: DataTypes.STRING(100),
    },
    modified_date: {
      type: DataTypes.DATE,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);
// Model.hasMany(RoleMenu, { as: 'menu', foreignKey: 'role_id' });

export default Model;
