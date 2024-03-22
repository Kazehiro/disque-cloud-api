'use strict';

import { Request, Response } from 'express';
import { response } from '../../../helpers/response';
import { helper } from '../../../helpers/helper';
import { repository } from './area.repository';

export default class Controller {
  public async provincies(req: Request, res: Response) {
    try {
      const result = await repository.provincies();
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successDetail('data provincies', result, res);
    } catch (err) {
      return helper.catchError(`provincies detail: ${err.message}`, res);
    }
  }

  public async regencies(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result = await repository.regencies({
        area_province_id: id,
      });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successDetail('data regencies', result, res);
    } catch (err) {
      return helper.catchError(`regencies detail: ${err.message}`, res);
    }
  }

  public async districts(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result = await repository.districts({
        area_regency_id: id,
      });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successDetail('data districts', result, res);
    } catch (err) {
      return helper.catchError(`districts detail: ${err.message}`, res);
    }
  }

  public async villages(req: Request, res: Response) {
    try {
      const id: any = req.params.id || 0;
      const result = await repository.villages({
        area_district_id: id,
      });
      if (result?.length < 1)
        return response.failed('data not found', 404, res);
      return response.successDetail('data villages', result, res);
    } catch (err) {
      return helper.catchError(`villages detail: ${err.message}`, res);
    }
  }
}

export const area = new Controller();
