'use strict';

import { Router } from 'express';
import { auth } from '../../auth/auth.middleware';
import { company } from './company.controller';

const router: Router = Router();

router.get('/company/all-data', auth.checkBearerToken, company.list);
router.get('/company', auth.checkBearerToken, company.index);
router.post('/company', auth.checkBearerToken, company.create);
router.put('/company/:id', auth.checkBearerToken, company.update);
router.delete('/company/:id', auth.checkBearerToken, company.delete);

export default router;
