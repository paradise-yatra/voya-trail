import { Response } from 'express';
import TourPackage from '../models/TourPackage';
import { AuthRequest } from '../middleware/auth';

/**
 * Basic shape validation helper
 */
const validateTourPayload = (body: any): string | null => {
  if (!body.title) return 'Title is required';
  if (!body.slug) return 'Slug is required';
  if (!body.category) return 'Category is required';
  if (!body.duration?.days) return 'Duration (days) is required';
  if (typeof body.startingPrice !== 'number') return 'Starting price is required';
  if (!body.overview?.description) return 'Overview description is required';
  if (!Array.isArray(body.itinerary) || body.itinerary.length === 0) {
    return 'At least one itinerary day is required';
  }
  if (!body.seo?.metaTitle || !body.seo?.metaDescription || !body.seo?.canonicalUrl) {
    return 'SEO metaTitle, metaDescription and canonicalUrl are required';
  }
  return null;
};

/**
 * POST /api/admin/tours
 * Create new tour package
 */
export const createTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const errorMessage = validateTourPayload(req.body);
    if (errorMessage) {
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }

    const existing = await TourPackage.findOne({ slug: req.body.slug });
    if (existing) {
      res.status(409).json({
        success: false,
        message: 'A tour with this slug already exists',
      });
      return;
    }

    const tour = await TourPackage.create(req.body);

    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Error creating tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create tour',
    });
  }
};

/**
 * PUT /api/admin/tours/:id
 * Update existing tour package
 */
export const updateTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (req.body.slug) {
      const existing = await TourPackage.findOne({
        _id: { $ne: id },
        slug: req.body.slug,
      });
      if (existing) {
        res.status(409).json({
          success: false,
          message: 'Another tour with this slug already exists',
        });
        return;
      }
    }

    const tour = await TourPackage.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
      return;
    }

    res.json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Error updating tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update tour',
    });
  }
};

/**
 * DELETE /api/admin/tours/:id
 * Soft delete / archive tour package
 */
export const archiveTour = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const tour = await TourPackage.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );

    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
      return;
    }

    res.json({
      success: true,
      message: 'Tour archived successfully',
      data: tour,
    });
  } catch (error) {
    console.error('Error archiving tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to archive tour',
    });
  }
};

/**
 * GET /api/admin/tours
 * List tours for admin (all statuses)
 */
export const listToursAdmin = async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const tours = await TourPackage.find({})
      .populate('category', 'name slug')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tours,
    });
  } catch (error) {
    console.error('Error listing admin tours:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list tours',
    });
  }
};

/**
 * GET /api/admin/tours/:id
 * Get single tour for admin (any status)
 */
export const getTourAdmin = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const tour = await TourPackage.findById(id).populate('category', 'name slug');

    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Tour not found',
      });
      return;
    }

    res.json({
      success: true,
      data: tour,
    });
  } catch (error) {
    console.error('Error fetching admin tour:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour',
    });
  }
};


