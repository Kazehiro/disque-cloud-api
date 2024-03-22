'use strict';

import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from 'sequelize';

interface Config {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  schema: string;
  pool: Pool;
  debug: boolean;
}

interface Pool {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

const config: Config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: +(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'postgres',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  schema: process.env.DB_SCHEMA || 'public',
  debug: process.env.DB_DEBUG == 'true',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const database = new Sequelize(
  config?.database,
  config?.username,
  config?.password,
  {
    host: config?.host,
    port: config?.port,
    schema: config?.schema,
    dialect: 'postgres',
    timezone: '+07:00',
    pool: {
      max: config?.pool?.max,
      min: config?.pool?.min,
      acquire: config?.pool?.acquire,
      idle: config?.pool?.idle,
    },
    logging: config?.debug ? console.log : false,
  }
);

export default database;
