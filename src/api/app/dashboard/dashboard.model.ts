'use strict';

import { DataTypes } from 'sequelize';
import db from '../../../config/database';
import Site from '../site/site.model';
import Service from '../services/service.model';

const Model = db.define(
  'disque_sync_queue',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company_code: {
      type: DataTypes.STRING,
    },
    synced_queue_id: {
      type: DataTypes.INTEGER,
    },
    queue_number: {
      type: DataTypes.INTEGER,
    },
    main_menu_id: {
      type: DataTypes.STRING,
    },
    menu_type: {
      type: DataTypes.STRING,
    },
    is_valid: {
      type: DataTypes.BOOLEAN,
    },
    state: {
      type: DataTypes.INTEGER,
    },
    handler_id: {
      type: DataTypes.INTEGER,
    },
    role_id: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
    created_date: {
      type: DataTypes.DATE,
    },
    synced_date: {
      type: DataTypes.DATE,
    },
    finished_date: {
      type: DataTypes.DATE,
    },
    handler_name: {
      type: DataTypes.STRING,
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
Model.belongsTo(Service, {
  as: 'service',
  targetKey: 'service_id',
  foreignKey: 'role_id',
});

export default Model;
