'use strict';

export default class Transformer {
  public list(data: any) {
    let result: Array<any> = [];
    data.forEach((item: any) => {
      result.push({
        role_id: item?.role_id,
        role_name: item?.role_name,
        role_menu_status: item?.status,
        menu: item?.menu.map((m: any) => ({
          menu_id: m?.menu?.menu_id,
          menu_name: m?.menu?.menu_name,
          menu_icon: m?.menu?.menu_icon,
          module_name: m?.menu?.module_name,
          type_menu: m?.menu?.type_menu,
          seq_number: m?.menu?.seq_number,
          parent_id: m?.menu?.parent_id,
          menu_status: m?.menu?.status,
        })),
      });
    });
    return result;
  }

  public index(data: any) {
    let result: Array<any> = [];
    data.forEach((item: any) => {
      result.push({
        role_id: item?.role_id,
        role_name: item?.role_name,
        role_menu_status: item?.status,
        menu: item?.menu.map((m: any) => ({
          menu_id: m?.menu?.menu_id,
          menu_name: m?.menu?.menu_name,
          menu_icon: m?.menu?.menu_icon,
          module_name: m?.menu?.module_name,
          type_menu: m?.menu?.type_menu,
          seq_number: m?.menu?.seq_number,
          parent_id: m?.menu?.parent_id,
          menu_status: m?.menu?.status,
          role_menu_status: m?.status,
          role_menu_create: m?.create,
          role_menu_edit: m?.edit,
          role_menu_delete: m?.delete,
          role_menu_approve: m?.approve,
        })),
      });
    });
    return result;
  }

  public detail(data: any) {
    let result: any = data?.dataValues;
    return {
      role_id: result?.role_id,
      role_name: result?.role_name,
      role_menu_status: result?.status,
      menu: result?.menu.map((m: any) => ({
        menu_id: m?.menu?.menu_id,
        menu_name: m?.menu?.menu_name,
        menu_icon: m?.menu?.menu_icon,
        module_name: m?.menu?.module_name,
        type_menu: m?.menu?.type_menu,
        seq_number: m?.menu?.seq_number,
        parent_id: m?.menu?.parent_id,
        menu_status: m?.menu?.status,
        role_menu_status: m?.status,
        role_menu_create: m?.create,
        role_menu_edit: m?.edit,
        role_menu_delete: m?.delete,
        role_menu_approve: m?.approve,
      })),
    };
  }
}

export const transformer = new Transformer();
