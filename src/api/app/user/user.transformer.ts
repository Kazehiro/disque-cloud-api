'use strict';

import { repository as resourceSite } from './user.repository';

export default class Transformer {
  public async list(data: any) {
    let result: Array<object> = [];
    // for (let i in data) {
    //   const detailResourceSite: any = await resourceSite.detailUserSite({
    //     disque_cms_user_id: data[i]?.disque_cms_user_id,
    //   });
    //   const resource: any = {
    //     ...data[i],
    //     site_id: detailResourceSite?.getDataValue('site_id'),
    //     company_id: detailResourceSite?.getDataValue('company_id'),
    //   };

    //   delete resource?.password;
    //   delete resource?.confirm_hash;
    //   delete resource?.role_menu;
    //   result.push(resource);
    // }
    return result;
  }

  public async detail(data: any) {
    const resource = data?.dataValues;

    // const detailResourceSite: any = await resourceSite.detailUserSite({
    //   disque_cms_user_id: resource?.disque_cms_user_id,
    // });
    // const result: any = {
    //   ...resource,
    //   site_id: detailResourceSite?.getDataValue('site_id'),
    //   company_id: detailResourceSite?.getDataValue('company_id'),
    // };

    // delete result?.password;
    // delete result?.confirm_hash;
    // delete result?.role_menu;
    return resource;
  }
}

export const transformer = new Transformer();
