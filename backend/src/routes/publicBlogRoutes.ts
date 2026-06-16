import { Router } from 'express';
import { getPublicBlog, listPublicBlogs } from '../controllers/blogPublicController';

const router = Router();

// Public blogs listing
router.get('/', listPublicBlogs);

// Public single blog post details (by ID or Slug)
router.get('/:idOrSlug', getPublicBlog);

export default router;
