import { Response } from 'express';
import BlogPost from '../models/BlogPost';
import { AuthRequest } from '../middleware/auth';

/**
 * Basic validation for blog payload
 */
const validateBlogPayload = (body: any): string | null => {
  if (!body.title) return 'Title is required';
  if (!body.slug) return 'Slug is required';
  if (!body.category) return 'Category is required';
  if (!body.readTime) return 'Read time is required';
  if (!body.author) return 'Author is required';
  if (!body.image) return 'Featured image is required';
  if (!body.excerpt) return 'Excerpt is required';
  if (!body.content) return 'Content is required';
  return null;
};

/**
 * GET /api/admin/blogs
 * List all blogs for admin
 */
export const listBlogsAdmin = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const blogs = await BlogPost.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error listing admin blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list blogs',
    });
  }
};

/**
 * GET /api/admin/blogs/:id
 * Get single blog details for admin
 */
export const getBlogAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findById(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching admin blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
    });
  }
};

/**
 * POST /api/admin/blogs
 * Create new blog post
 */
export const createBlog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errorMessage = validateBlogPayload(req.body);
    if (errorMessage) {
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }

    const slug = req.body.slug.toLowerCase().trim();
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      res.status(409).json({
        success: false,
        message: 'A blog post with this slug already exists',
      });
      return;
    }

    const blog = await BlogPost.create({
      ...req.body,
      slug,
    });

    res.status(201).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog post',
    });
  }
};

/**
 * PUT /api/admin/blogs/:id
 * Update existing blog post
 */
export const updateBlog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const errorMessage = validateBlogPayload(req.body);
    if (errorMessage) {
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }

    const slug = req.body.slug.toLowerCase().trim();
    const existing = await BlogPost.findOne({
      _id: { $ne: id },
      slug,
    });

    if (existing) {
      res.status(409).json({
        success: false,
        message: 'Another blog post with this slug already exists',
      });
      return;
    }

    const blog = await BlogPost.findByIdAndUpdate(
      id,
      { ...req.body, slug },
      { new: true, runValidators: true }
    );

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update blog post',
    });
  }
};

/**
 * DELETE /api/admin/blogs/:id
 * Delete blog post
 */
export const deleteBlog = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog post not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete blog post',
    });
  }
};
