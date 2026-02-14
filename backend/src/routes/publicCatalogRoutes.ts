import { Router } from 'express';
import {
  listPublicPackages,
  getPublicPackageBySlug,
  listPublicCategories,
  getPublicCategoryBySlug,
  searchAll
} from '../controllers/publicCatalogController';

const router = Router();

router.get('/packages/public', listPublicPackages);
router.get('/packages/public/:slug', getPublicPackageBySlug);
router.get('/tour-categories', listPublicCategories);
router.get('/tour-categories/public/slug/:slug', getPublicCategoryBySlug);
router.get('/search', searchAll);

export default router;

