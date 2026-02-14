import { Router } from 'express';
import { getTourBySlug, listTours } from '../controllers/tourPublicController';

const router = Router();

// Public tour listing
router.get('/', listTours);

// Public single tour by slug
router.get('/:slug', getTourBySlug);

export default router;





