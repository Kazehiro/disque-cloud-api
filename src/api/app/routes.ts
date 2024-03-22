'use strict';

import { Router } from 'express';
import { role } from './role/role.controller';
import { site } from './site/site.controller';
import { dashboard } from './dashboard/dashboard.controller';
import { user } from './site.user/site.user.controller';
import { services } from './services/service.controller';
import { menu } from './menu/menu.controller';
import { auth } from '../auth/auth.middleware';
import { company } from './company/company.controller';
import { resource } from './user/user.controller';
import { roleMenu } from './role.menu/role.menu.controller';

const router: Router = Router();

router.get('/roles/all-data', auth.checkBearerToken, role.list);
router.get('/roles', auth.checkBearerToken, role.index);
router.get('/roles/:id', auth.checkBearerToken, role.detail);
router.post('/roles', auth.checkBearerToken, role.create);
router.put('/roles/:id', auth.checkBearerToken, role.update);
router.delete('/roles/:id', auth.checkBearerToken, role.delete);

router.get('/role-menu/all-data', auth.checkBearerToken, roleMenu.list);
router.get('/role-menu', auth.checkBearerToken, roleMenu.index);
router.get('/role-menu/:id', auth.checkBearerToken, roleMenu.detail);
router.post('/role-menu', auth.checkBearerToken, roleMenu.create);

router.get('/resources', auth.checkBearerToken, resource.index);
router.get('/resources/check/:username', auth.checkBearerToken, resource.check);
router.get('/resources/:id', auth.checkBearerToken, resource.detail);
router.post('/resources', auth.checkBearerToken, resource.create);
router.put('/resources/:id', auth.checkBearerToken, resource.update);
router.delete('/resources/:id', auth.checkBearerToken, resource.delete);

router.get('/sites/all-data', auth.checkBearerToken, site.list);
router.get('/sites', auth.checkBearerToken, site.index);
router.get('/sites/:id', auth.checkBearerToken, site.detail);
router.get('/sites/company/:id', auth.checkBearerToken, site.siteByCompanyId);
router.post('/sites', auth.checkBearerToken, site.create);
router.put('/sites/:id', auth.checkBearerToken, site.update);
router.delete('/sites/:id', auth.checkBearerToken, site.delete);

router.get('/dashboard/live', auth.checkBearerToken, dashboard.liveData);

router.get('/user/all-data', auth.checkBearerToken, user.list);
router.get('/user', auth.checkBearerToken, user.index);
router.get('/user/:id', auth.checkBearerToken, user.detail);
router.get('/user/company/:id', auth.checkBearerToken, user.siteByCompanyId);
router.post('/user', auth.checkBearerToken, user.create);
router.put('/user/:id', auth.checkBearerToken, user.update);
router.delete('/user/:id', auth.checkBearerToken, user.delete);

router.get('/services/all-data', auth.checkBearerToken, services.list);
router.get('/services', auth.checkBearerToken, services.index);
router.get('/services/:id', auth.checkBearerToken, services.detail);
router.get('/services/site/:id', auth.checkBearerToken, services.siteByCompanyId);
router.post('/services', auth.checkBearerToken, services.create);
router.put('/services/:id', auth.checkBearerToken, services.update);
router.delete('/services/:id', auth.checkBearerToken, services.delete);

router.get('/menu/all-data', auth.checkBearerToken, menu.list);
router.get('/menu', auth.checkBearerToken, menu.index);
router.get('/menu/:id', auth.checkBearerToken, menu.detail);
router.get('/menu/site/:id', auth.checkBearerToken, menu.siteByCompanyId);
router.post('/menu', auth.checkBearerToken, menu.create);
router.put('/menu/:id', auth.checkBearerToken, menu.update);
router.delete('/menu/:id', auth.checkBearerToken, menu.delete);

router.get('/company/all-data', auth.checkBearerToken, company.list);
router.get('/company', auth.checkBearerToken, company.index);
router.get('/company/:id', auth.checkBearerToken, company.detail);
router.post('/company', auth.checkBearerToken, company.create);
router.put('/company/:id', auth.checkBearerToken, company.update);
router.delete('/company/:id', auth.checkBearerToken, company.delete);

export default router;
