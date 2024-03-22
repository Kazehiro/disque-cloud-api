'use strict';

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import axios from 'axios';
import moment from 'moment';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { response } from './response';
import Telegram, { Telegram_ParseModes } from 'tele-sender';

dotenv.config();
const month: string = moment().format('YYYY-MM');
const telegram = new Telegram(process.env.TOKEN_TELEGRAM || '');
const CHAT_ID_TELEGRAM: string = process.env.CHAT_ID_TELEGRAM || '';

export default class Helper {
  public date() {
    return moment().locale('id').format('YYYY-MM-DD HH:mm:ss');
  }

  public only(keys: Array<string>, data: any, isUpdate: boolean = false) {
    const date = moment().locale('id').format('YYYY-MM-DD HH:mm:ss');
    let result: any = {};

    keys.forEach((i) => {
      if ((data[i] && data[i] !== undefined) || data[i] == 0) {
        result[i] = data[i];
      }
    });
    if (isUpdate) {
      result = {
        ...result,
        modified_date: date,
      };
    } else {
      result = {
        ...result,
        created_date: date,
      };
    }
    return result;
  }

  public async hashIt(password: string, length: number = 10) {
    const salt: string = await bcrypt.genSalt(length);
    const hashed: string = await bcrypt.hash(password, salt);
    return hashed;
  }

  public async compareIt(password: any, hashed: any) {
    return await bcrypt.compare(password, hashed);
  }

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public async sendNotif(message: string) {
    await telegram.send(
      CHAT_ID_TELEGRAM,
      message,
      Telegram_ParseModes.MarkdownV2
    );
  }

  public async catchError(message: string, res: Response) {
    if (process.env.CHAT_ID_TELEGRAM != undefined) {
      await telegram.send(
        CHAT_ID_TELEGRAM,
        message,
        Telegram_ParseModes.MarkdownV2
      );
    }
    return response.failed(message, 500, res);
  }

  public async sendEmail(data: Object | any) {
    try {
      const url: string = process.env.EMAIL_URL + '/send';
      axios.defaults.headers.common['apikey'] = process.env.EMAIL_APIKEY;
      await axios.post(url, {
        recipients: [data?.to],
        subject: data?.subject,
        encode: url,
        content: data?.content,
      });
    } catch (err) {
      telegram.send(
        CHAT_ID_TELEGRAM,
        `send email: ${err?.message}`,
        Telegram_ParseModes.MarkdownV2
      );
    }
  }

  public async upload(file: any, folder: string = '') {
    const upload_path: string = `./public/uploads/${folder}`;
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, { recursive: true });
    }
    const name: string = file?.name.replace(/ /g, '');
    let uploadPath: string = `${upload_path}/${name}`;
    await file.mv(uploadPath, function (err: any) {
      if (err) {
        telegram.send(
          CHAT_ID_TELEGRAM,
          err?.message,
          Telegram_ParseModes.MarkdownV2
        );
        return err.message;
      }
    });
    return uploadPath.replace('./public', '');
  }

  public async resize(file: any, fd: string, w: number, h: number = 0) {
    const size: string = `${w}${h == 0 ? '' : '_' + h}`;
    const rename = `${file?.name
      .replace(/ /g, '')
      .split('.')[0]}_${size}.${file?.name.split('.').pop()}`;
    const upload_path: string = `./public/uploads/${fd}`;
    let uploadPath: string = `${upload_path}/${rename}`;
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, { recursive: true });
    }

    const resize = await sharp(path.resolve(file?.tempFilePath))
      .resize(w, h == 0 ? w : h)
      .toFile(path.resolve(uploadPath));

    return {
      ...resize,
      filename: rename,
      path_doc: uploadPath.replace('./public', ''),
    };
  }

  public randomAlphabet(length: number) {
    const alphabet: string =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result: string = '';
    for (let i: number = 0; i < length; i++) {
      result += alphabet.charAt(Math.floor(Math.random() * alphabet?.length));
    }
    return result;
  }

  public condition(user: any) {
    let result: Object = {
      distributor_id: user?.distributor_id,
      retail_id: user?.retail_id,
    };

    if (user?.id == 1) {
      result = {};
    } else if (user?.id != 1 && user?.retail_id == 0) {
      result = {
        distributor_id: user?.distributor_id,
      };
    }
    return result;
  }

  public async clearDirTmp() {
    const day = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const directory = `./tmp/${day}/`;

    let msg: string = '';
    // file
    await fs.readdir(directory, async (err, files) => {
      if (err) {
        await this.sendNotif(`delete file tmp: ${err?.message}`);
      }

      let count: number = 0;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (!err) count++;
        });
      }
      msg = `delete file tmp: ${count} file deleted`;
    });

    // dir
    await fs.rm(directory, { recursive: true, force: true }, async (err) => {
      if (err) {
        await this.sendNotif(`delete dir tmp: ${err?.message}`);
      }
    });

    if (msg != '') {
      await this.sendNotif(msg);
    }
    await this.sendNotif(`cron tmp: directory ${day} deleted`);
  }

  public async clearDirExcel() {
    const lastMonth = moment().subtract(1, 'months').format('YYYY-MM');
    const directory = `./public/uploads/excel/${lastMonth}/`;

    let msg: string = '';
    // file
    await fs.readdir(directory, async (err, files) => {
      if (err) {
        await this.sendNotif(`delete file excel: ${err?.message}`);
      }

      let count: number = 0;
      for (const file of files) {
        fs.unlink(path.join(directory, file), (err) => {
          if (!err) count++;
        });
      }
      msg = `delete file excel: ${count} file deleted`;
    });

    // dir
    fs.rm(directory, { recursive: true, force: true }, async (err) => {
      if (err) {
        await this.sendNotif(`delete dir excel: ${err?.message}`);
      }
    });
    if (msg != '') {
      await this.sendNotif(msg);
    }
    await this.sendNotif(`cron excel: directory ${lastMonth} deleted`);
  }

  public pathExcel() {
    const upload_path: string = `./public/uploads/excel/${month}`;
    if (!fs.existsSync(upload_path)) {
      fs.mkdirSync(upload_path, { recursive: true });
    }
    return upload_path;
  }

  public htmlToString(str: string) {
    return str.replace(/<[^>]*>/g, '');
  }

  public schema() {
    return process.env.DB_SCHEMA || 'public';
  }
}

export const helper = new Helper();
