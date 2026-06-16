import { Request, Response } from 'express';
import BlogPost from '../models/BlogPost';

/**
 * GET /api/blogs
 * List all active blogs with filters
 */
export const listPublicBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, q, sort } = req.query;
    const filter: any = { isActive: true };

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (q) {
      const searchRegex = new RegExp(String(q), 'i');
      filter.$or = [
        { title: searchRegex },
        { excerpt: searchRegex },
        { content: searchRegex },
      ];
    }

    let sortOption: any = { createdAt: -1 }; // Default: Newest
    if (sort === 'oldest') {
      sortOption = { createdAt: 1 };
    }

    const blogs = await BlogPost.find(filter).sort(sortOption);

    res.json({
      success: true,
      data: blogs,
    });
  } catch (error) {
    console.error('Error listing public blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blogs',
    });
  }
};

/**
 * GET /api/blogs/:idOrSlug
 * Get single blog details by ID or slug
 */
export const getPublicBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { idOrSlug } = req.params;
    let blog;

    // Check if valid ObjectId or query by slug
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await BlogPost.findOne({ _id: idOrSlug, isActive: true });
    } else {
      blog = await BlogPost.findOne({ slug: idOrSlug.toLowerCase(), isActive: true });
    }

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
    console.error('Error fetching public blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch blog post',
    });
  }
};
