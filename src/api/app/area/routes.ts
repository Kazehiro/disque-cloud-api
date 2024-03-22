'use strict';

import { Router } from 'express';
import { area } from './area.controller';
import { auth } from '../../auth/auth.middleware';

const router: Router = Router();

router.get('/provincies', area.provincies);
router.get('/regencies/:id', area.regencies);
router.get('/districts/:id', auth.checkBearerToken, area.districts);
router.get('/villages/:id', auth.checkBearerToken, area.villages);

export default router;
