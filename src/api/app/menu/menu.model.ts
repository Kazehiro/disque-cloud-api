'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Site from '../site/site.model';

const Model = db.define(
  'disque_menu_list',
  {
    main_menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    main_menu_name: {
      type: DataTypes.STRING,
    },
    main_menu_type: {
      type: DataTypes.STRING,
    },
    parent_id: {
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
