'use strict';

export default class Variable {
  public fillable() {
    const field: Array<string> = [
      'main_menu_id',
      'company_code',
      'main_menu_name',
      'main_menu_type',
      'parent_id',
      'company_id',
    ];
    return field;
  }
}

export const variable = new Variable();
