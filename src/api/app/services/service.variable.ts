'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'service_id',
      'company_code',
      'role_name',
      'service_type',
      'company_id',
    ];
    return field;
  }
}

export const variable = new Variable();
