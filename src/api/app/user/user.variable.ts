'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'role_id',
      'username',
      'password',
      'image_foto',
      'status',
      'company_id',
      'company_code',
    ];
    return field;
  }
}

export const variable = new Variable();
