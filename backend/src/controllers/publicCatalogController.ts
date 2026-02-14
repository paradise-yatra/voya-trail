import { Request, Response } from 'express';
import TourPackage from '../models/TourPackage';
import TourCategory from '../models/TourCategory';

const normalizeSlug = (value: string): string =>
  value.trim().toLowerCase().replace(/^\/+|\/+$/g, '');

const mapTourForListing = (tour: any) => ({
  ...tour,
  mainImage: tour.mainImage || tour.images?.hero?.url || '',
  durationDays: tour.durationDays ?? tour.duration?.days,
  durationNights: tour.durationNights ?? tour.duration?.nights,
  basePrice: tour.basePrice ?? tour.startingPrice,
});

/**
 * GET /api/packages/public
 */
export const listPublicPackages = async (req: Request, res: Response): Promise<void> => {
  try {
    const categorySlug = typeof req.query.category === 'string'
      ? req.query.category
      : (typeof req.query.categorySlug === 'string' ? req.query.categorySlug : undefined);

    const excludeCategorySlug = typeof req.query.excludeCategory === 'string' ? req.query.excludeCategory : undefined;
    const location = typeof req.query.location === 'string' ? req.query.location : undefined;

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.max(1, Number(req.query.limit) || 10);

    let categoryFilter: any = {};
    if (categorySlug) {
      const normalizedCategorySlug = normalizeSlug(categorySlug);
      const category = await TourCategory.findOne({
        slug: { $in: [normalizedCategorySlug, `/${normalizedCategorySlug}`] },
        isActive: true,
      }).select('_id');

      if (!category) {
        res.json({
          success: true,
          data: [],
          pagination: { total: 0, page, limit, pages: 0 },
        });
        return;
      }

      categoryFilter.category = category._id;
    }

    if (excludeCategorySlug) {
      const normalizedExcludeSlug = normalizeSlug(excludeCategorySlug);
      const excludeCat = await TourCategory.findOne({
        slug: { $in: [normalizedExcludeSlug, `/${normalizedExcludeSlug}`] },
        isActive: true,
      }).select('_id');
      if (excludeCat) {
        categoryFilter.category = { $ne: excludeCat._id };
      }
    }

    const query: any = {
      status: 'published',
      ...categoryFilter,
    };

    if (location) {
      // Case-insensitive regex match for any location in the array
      query.locations = { $in: [new RegExp(`^${location}$`, 'i')] };
    }

    const total = await TourPackage.countDocuments(query);
    const tours = await TourPackage.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    res.json({
      success: true,
      data: tours.map(mapTourForListing),
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error listing public packages:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list packages',
    });
  }
};

/**
 * GET /api/packages/public/:slug
 */
export const getPublicPackageBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const { slug } = req.params;
    const tour = await TourPackage.findOne({
      slug,
      status: 'published',
    })
      .populate('category', 'name slug')
      .populate('amenityIds', 'label iconKey')
      .lean();

    if (!tour) {
      res.status(404).json({
        success: false,
        message: 'Package not found',
      });
      return;
    }

    res.json({
      success: true,
      data: mapTourForListing(tour),
    });
  } catch (error) {
    console.error('Error fetching public package by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch package',
    });
  }
};

/**
 * GET /api/tour-categories
 */
export const listPublicCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await TourCategory.find({ isActive: true })
      .sort({ name: 1 })
      .lean();

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Error listing public categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list categories',
    });
  }
};

/**
 * GET /api/tour-categories/public/slug/:slug
 */
export const getPublicCategoryBySlug = async (req: Request, res: Response): Promise<void> => {
  try {
    const normalizedSlug = normalizeSlug(req.params.slug);
    const category = await TourCategory.findOne({
      slug: { $in: [normalizedSlug, `/${normalizedSlug}`] },
      isActive: true,
    }).lean();

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
    console.error('Error fetching public category by slug:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch category',
    });
  }
};

/**
 * GET /api/search
 * Query params: q (string)
 */
export const searchAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const q = (req.query.q as string || "").trim();
    if (!q) {
      res.json({
        success: true,
        data: {
          packages: [],
          categories: [],
          destinations: []
        }
      });
      return;
    }

    // Escape special regex chars to avoid errors
    const safeQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(safeQ, 'i');

    const [packages, categories] = await Promise.all([
      TourPackage.find({
        status: 'published',
        $or: [
          { title: regex },
          { locations: regex }
        ]
      })
        .select('title slug locations mainImage category duration startingPrice basePrice durationNights durationDays')
        .populate('category', 'name slug')
        .limit(5)
        .lean(),

      TourCategory.find({
        isActive: true,
        name: regex
      })
        .select('name slug')
        .limit(3)
        .lean()
    ]);

    // Find distinctive locations with their categories
    // We need to know which category a location belongs to in order to form the URL.
    const locationPackages = await TourPackage.find({
      status: 'published',
      locations: { $in: [regex] }
    })
      .select('locations category')
      .populate('category', 'slug')
      .limit(50)
      .lean();

    const destMap = new Map<string, string>();
    locationPackages.forEach(pkg => {
      if (pkg.locations) {
        pkg.locations.forEach(loc => {
          if (regex.test(loc)) {
            if (!destMap.has(loc)) {
              destMap.set(loc, (pkg.category as any)?.slug || 'india-tours');
            }
          }
        });
      }
    });

    const destinations = Array.from(destMap.entries())
      .slice(0, 5)
      .map(([name, catSlug]) => ({
        name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        categorySlug: catSlug
      }));

    res.json({
      success: true,
      data: {
        packages: packages.map(p => ({
          ...mapTourForListing(p),
          location: p.locations?.[0],
          categorySlug: (p.category as any)?.slug || 'tours'
        })),
        categories: categories.map(c => ({
          name: c.name,
          slug: c.slug
        })),
        destinations
      }
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Search failed'
    });
  }
};
