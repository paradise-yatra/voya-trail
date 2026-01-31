import { Request, Response } from 'express';
import TourPackage from '../models/TourPackage';
import TourCategory from '../models/TourCategory';

/**
 * GET /api/tours/:slug
 * Public – get a single published tour package by slug
 */
export const getTourBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;

    const tour = await TourPackage.findOne({
      slug,
      status: 'published',
    })
      .populate('category', 'name slug')
      .populate('amenityIds', 'label iconKey');

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
    console.error('Error fetching tour by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tour',
    });
  }
};

/**
 * GET /api/tours
 * Public – list published tours (basic listing, future-ready for filters)
 */
export const listTours = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categorySlug } = req.query;

    let categoryFilter = {};
    if (categorySlug && typeof categorySlug === 'string') {
      const category = await TourCategory.findOne({
        slug: categorySlug,
        isActive: true,
      }).select('_id');

      if (category) {
        categoryFilter = { category: category._id };
      }
    }

    const tours = await TourPackage.find({
      status: 'published',
      ...categoryFilter,
    })
      .select(
        'title slug subtitle startingPrice priceCurrency priceUnit duration locations images.hero seo.metaTitle'
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: tours,
    });
  } catch (error) {
    console.error('Error listing tours:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list tours',
    });
  }
};


