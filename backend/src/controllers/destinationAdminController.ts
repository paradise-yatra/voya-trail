import { Request, Response } from 'express';
import Destination from '../models/Destination';
import TourPackage from '../models/TourPackage';

// List all destinations
export const listDestinationsAdmin = async (_req: Request, res: Response) => {
  try {
    const destinations = await Destination.find().sort({ createdAt: -1 }).lean();

    const data = await Promise.all(
      destinations.map(async (dest) => {
        const count = await TourPackage.countDocuments({ locations: dest.name });
        return { ...dest, packageCount: count };
      })
    );

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch destinations',
    });
  }
};

// Get single destination
export const getDestinationAdmin = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch destination',
    });
  }
};

// Create destination
export const createDestination = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, isActive } = req.body;

    const existing = await Destination.findOne({ $or: [{ name }, { slug }] });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Destination already exists',
      });
    }

    const destination = await Destination.create({
      name,
      slug,
      description,
      isActive,
    });

    return res.status(201).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create destination',
    });
  }
};

// Update destination
export const updateDestination = async (req: Request, res: Response) => {
  try {
    const { name, slug, description, isActive } = req.body;
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    if (name !== destination.name || slug !== destination.slug) {
      const existing = await Destination.findOne({
        _id: { $ne: destination._id },
        $or: [{ name }, { slug }],
      });

      if (existing) {
        return res.status(400).json({
          success: false,
          message: 'Duplicate destination',
        });
      }
    }

    if (name && name !== destination.name) {
      await TourPackage.updateMany(
        { locations: destination.name },
        { $set: { "locations.$": name } }
      );
    }

    destination.name = name ?? destination.name;
    destination.slug = slug ?? destination.slug;
    destination.description = description ?? destination.description;
    destination.isActive = isActive ?? destination.isActive;

    await destination.save();

    return res.status(200).json({
      success: true,
      data: destination,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update destination',
    });
  }
};

// Delete destination
export const deleteDestination = async (req: Request, res: Response) => {
  try {
    const destination = await Destination.findById(req.params.id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: 'Destination not found',
      });
    }

    const usageCount = await TourPackage.countDocuments({ locations: destination.name });

    if (usageCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Used in ${usageCount} packages`,
      });
    }

    await destination.deleteOne();

    return res.status(200).json({
      success: true,
      message: 'Deleted successfully',
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete',
    });
  }
};