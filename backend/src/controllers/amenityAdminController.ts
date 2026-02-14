import { Response } from 'express';
import Amenity from '../models/Amenity';
import { AuthRequest } from '../middleware/auth';

/**
 * POST /api/admin/amenities
 */
export const createAmenity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { label, iconKey } = req.body;

    if (!label) {
      res.status(400).json({
        success: false,
        message: 'Label is required',
      });
      return;
    }

    const amenity = await Amenity.create({
      label,
      iconKey,
    });

    res.status(201).json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    console.error('Error creating amenity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create amenity',
    });
  }
};

/**
 * GET /api/admin/amenities
 */
export const listAmenitiesAdmin = async (
  _req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const amenities = await Amenity.find({}).sort({ label: 1 });

    res.json({
      success: true,
      data: amenities,
    });
  } catch (error) {
    console.error('Error listing amenities:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to list amenities',
    });
  }
};

/**
 * PUT /api/admin/amenities/:id
 */
export const updateAmenity = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { label, iconKey, isActive } = req.body;

    const amenity = await Amenity.findByIdAndUpdate(
      id,
      { label, iconKey, isActive },
      { new: true, runValidators: true }
    );

    if (!amenity) {
      res.status(404).json({
        success: false,
        message: 'Amenity not found',
      });
      return;
    }

    res.json({
      success: true,
      data: amenity,
    });
  } catch (error) {
    console.error('Error updating amenity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update amenity',
    });
  }
};





