'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'company_setting_id',
      'company_code',
      'video_url',
      'title',
      'footer',
      'logo_url',
      'alamat',
      'longitude',
      'latitude',
      'cs',
      'teller',
      'image',
      'regency_id',
      'province_id',
      'company_id',
      'company_parent_id',
    ];
    return field;
  }
}

export const variable = new Variable();
