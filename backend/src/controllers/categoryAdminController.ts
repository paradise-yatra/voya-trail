import { Response } from 'express';
import TourCategory from '../models/TourCategory';
import TourPackage from '../models/TourPackage';
import { AuthRequest } from '../middleware/auth';

const normalizeSlug = (value: string): string =>
  value.trim().toLowerCase().replace(/^\/+|\/+$/g, '');

/**
 * POST /api/admin/categories
 */
export const createCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, slug, description } = req.body;
    const normalizedSlug = typeof slug === 'string' ? normalizeSlug(slug) : '';

    if (!name || !normalizedSlug) {
      res.status(400).json({
        success: false,
        message: 'Name and slug are required',
      });
      return;
    }

    const existing = await TourCategory.findOne({
      slug: { $in: [normalizedSlug, `/${normalizedSlug}`] },
    });
    if (existing) {
      res.status(409).json({
        success: false,
        message: 'Category with this slug already exists',
      });
      return;
    }

    const category = await TourCategory.create({
      name,
      slug: normalizedSlug,
      description,
    });

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create category',
    });
  }
};

/**
 * GET /api/admin/categories
 */
export const listCategoriesAdmin = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const categories = await TourCategory.find({}).sort({ name: 1 }).lean();

    const data = await Promise.all(categories.map(async (cat) => {
      const count = await TourPackage.countDocuments({
        category: cat._id,
        status: 'published',
      });
      return { ...cat, packageCount: count };
    }));

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error('Error listing categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list categories',
    });
  }
};

/**
 * GET /api/admin/categories/:id
 */
export const getCategoryAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await TourCategory.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
    });
  }
};

/**
 * PUT /api/admin/categories/:id
 */
export const updateCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, slug, description, isActive } = req.body;
    const normalizedSlug = typeof slug === 'string' ? normalizeSlug(slug) : undefined;

    if (slug && !normalizedSlug) {
      res.status(400).json({
        success: false,
        message: 'Slug cannot be empty',
      });
      return;
    }

    if (normalizedSlug) {
      const existing = await TourCategory.findOne({
        _id: { $ne: id },
        slug: { $in: [normalizedSlug, `/${normalizedSlug}`] },
      });
      if (existing) {
        res.status(409).json({
          success: false,
          message: 'Another category with this slug already exists',
        });
        return;
      }
    }

    const updatePayload: {
      name?: string;
      slug?: string;
      description?: string;
      isActive?: boolean;
    } = {};

    if (typeof name === 'string') {
      updatePayload.name = name;
    }
    if (typeof description === 'string') {
      updatePayload.description = description;
    }
    if (typeof isActive === 'boolean') {
      updatePayload.isActive = isActive;
    }

    if (normalizedSlug) {
      updatePayload.slug = normalizedSlug;
    }

    const category = await TourCategory.findByIdAndUpdate(id, updatePayload, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    res.json({
      success: true,
      data: category,
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update category',
    });
  }
};

/**
 * DELETE /api/admin/categories/:id
 */
export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await TourCategory.findById(id);

    if (!category) {
      res.status(404).json({
        success: false,
        message: 'Category not found',
      });
      return;
    }

    // Check usage
    const usageCount = await TourPackage.countDocuments({ category: id });
    if (usageCount > 0) {
      res.status(400).json({
        success: false,
        message: `Cannot delete category. It is used in ${usageCount} packages.`,
      });
      return;
    }

    await category.deleteOne();

    res.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete category',
    });
  }
};





