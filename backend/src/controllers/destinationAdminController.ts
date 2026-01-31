import { Request, Response } from 'express';
import Destination from '../models/Destination';
import TourPackage from '../models/TourPackage';

// List all destinations with package count
export const listDestinationsAdmin = async (req: Request, res: Response) => {
    try {
        const destinations = await Destination.find().sort({ createdAt: -1 }).lean();

        // Calculate package count for each destination
        const data = await Promise.all(destinations.map(async (dest) => {
            const count = await TourPackage.countDocuments({ locations: dest.name });
            return { ...dest, packageCount: count };
        }));

        res.status(200).json({
            success: true,
            data,
        });
    } catch (error: any) {
        res.status(500).json({
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
        res.status(200).json({
            success: true,
            data: destination,
        });
    } catch (error: any) {
        res.status(500).json({
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
                message: 'Destination with this name or slug already exists',
            });
        }

        const destination = await Destination.create({
            name,
            slug,
            description,
            isActive,
        });

        res.status(201).json({
            success: true,
            data: destination,
            message: 'Destination created successfully',
        });
    } catch (error: any) {
        res.status(500).json({
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

        // Check if name/slug is being changed to something that exists
        if (name !== destination.name || slug !== destination.slug) {
            const existing = await Destination.findOne({
                $and: [
                    { _id: { $ne: destination._id } },
                    { $or: [{ name }, { slug }] }
                ]
            });
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: 'Destination with this name or slug already exists',
                });
            }
        }

        // If name changes, we might want to update packages too, but for now let's just update the destination
        // Ideally we should update all packages using the old name to the new name
        if (name !== destination.name) {
            await TourPackage.updateMany(
                { locations: destination.name },
                { $set: { "locations.$": name } }
            );
        }

        destination.name = name || destination.name;
        destination.slug = slug || destination.slug;
        destination.description = description !== undefined ? description : destination.description;
        destination.isActive = isActive !== undefined ? isActive : destination.isActive;

        await destination.save();

        res.status(200).json({
            success: true,
            data: destination,
            message: 'Destination updated successfully',
        });
    } catch (error: any) {
        res.status(500).json({
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

        // Check usage
        const usageCount = await TourPackage.countDocuments({ locations: destination.name });
        if (usageCount > 0) {
            return res.status(400).json({
                success: false,
                message: `Cannot delete destination. It is used in ${usageCount} packages.`,
            });
        }

        await destination.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Destination deleted successfully',
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete destination',
        });
    }
};
