'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'user_id',
      'username',
      '_password',
      'user_name',
      'company_code',
      'company_id',
    ];
    return field;
  }
}

export const variable = new Variable();
