'use strict';

import Province from './provinces.model';
import Regency from './regencies.model';
import District from './districts.model';
import Village from './villages.model';

export default class Respository {
  public provincies() {
    return Province.findAll();
  }

  public regencies(condition: any) {
    return Regency.findAll({
      where: condition,
    });
  }

  public districts(condition: any) {
    return District.findAll({
      where: condition,
    });
  }

  public villages(condition: any) {
    return Village.findAll({
      where: condition,
    });
  }
}

export const repository = new Respository();
