'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';

const Model = db.define(
  'area_provinces',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

export default Model;
