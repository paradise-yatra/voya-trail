import { Router } from 'express';
import {
  createBlog,
  deleteBlog,
  getBlogAdmin,
  listBlogsAdmin,
  updateBlog,
} from '../controllers/blogAdminController';
import { auth } from '../middleware/auth';
import { roleCheck } from '../middleware/roleCheck';

const router = Router();

// Secure all admin blog routes (requires logged in Admin user)
router.use(auth, roleCheck(['admin']));

router.get('/', listBlogsAdmin);
router.get('/:id', getBlogAdmin);
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
