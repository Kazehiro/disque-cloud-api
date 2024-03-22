'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Province from '../area/provinces.model';
import Regency from '../area/regencies.model';
import District from '../area/districts.model';
import Village from '../area/villages.model';

const Model = db.define(
  'disque_company',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    notlp: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    npwp: {
      type: DataTypes.STRING,
    },
    add_npwp: {
      type: DataTypes.STRING,
    },
    name_npwp: {
      type: DataTypes.STRING,
    },
    date_pkp_npwp: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    province_id: {
      type: DataTypes.INTEGER,
    },
    regency_id: {
      type: DataTypes.INTEGER,
    },
    district_id: {
      type: DataTypes.INTEGER,
    },
    village_id: {
      type: DataTypes.INTEGER,
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
    deleted_by: {
      type: DataTypes.STRING(100),
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
Model.belongsTo(Province, {
  as: 'province',
  targetKey: 'id',
  foreignKey: 'province_id',
});
Model.belongsTo(Regency, {
  as: 'regency',
  targetKey: 'id',
  foreignKey: 'regency_id',
});
Model.belongsTo(District, {
  as: 'district',
  targetKey: 'id',
  foreignKey: 'district_id',
});
Model.belongsTo(Village, {
  as: 'village',
  targetKey: 'id',
  foreignKey: 'village_id',
});

export default Model;
