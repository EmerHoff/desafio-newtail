import { Router } from 'express';

import { housesRouter } from './houses.routes';

const router = Router();

router.use('/houses', housesRouter);

export { router };
