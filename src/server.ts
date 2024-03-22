'use strict';

import cors from 'cors';
import dotenv from 'dotenv';
import moment from 'moment';
import bodyParser from 'body-parser';
import express, { Express } from 'express';
import fileUpload from 'express-fileupload';

import routes from './routes';
import sequelize from './config/database';
import { helper } from './helpers/helper';
require('express-async-errors');

const app: Express = express();
const port: number | string = process.env.PORT || 5000;
const day: string = moment().format('YYYY-MM-DD');

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: `./tmp/${day}/`,
  })
);

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
    'Authorization',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
};
app.use(cors(options));
app.use(routes);

const conn = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    await helper.sendNotif(`db conn: ${err?.message}`);
    console.log('Unable to connect to the database:', err?.message);
  }
};
conn();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
