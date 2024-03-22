'use strict';

import { Router } from 'express';
import apps from './api/app/routes';
import area from './api/app/area/routes';
import auth from './api/auth/auth.routes';
import exception from './helpers/exception';

const router: Router = Router();

router.use('/auth', auth);
router.use('/app', apps);
router.use('/area', area);
router.use(exception);

export default router;
