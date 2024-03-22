'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'name',
      'address',
      'notlp',
      'email',
      'npwp',
      'add_npwp',
      'name_npwp',
      'date_pkp_npwp',
      'status',
      'province_id',
      'regency_id',
      'district_id',
      'village_id',
    ];
    return field;
  }
}

export const variable = new Variable();
