'use strict';

import { DataTypes } from 'sequelize';
import Menu from '../menu/menu.model';
import db from '../../../config/database';
import { helper } from '../../../helpers/helper';

const Model = db.define(
  'app_role_menu',
  {
    role_menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    menu_id: {
      type: DataTypes.INTEGER,
    },
    create: {
      type: DataTypes.TINYINT,
    },
    edit: {
      type: DataTypes.TINYINT,
    },
    delete: {
      type: DataTypes.TINYINT,
    },
    approve: {
      type: DataTypes.TINYINT,
    },
    status: {
      type: DataTypes.STRING(5),
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
Model.belongsTo(Menu, { as: 'menu', foreignKey: 'menu_id' });

export default Model;
