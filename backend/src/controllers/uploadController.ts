import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import cloudinary from '../config/cloudinary';

/**
 * Helper to extract the raw base64 string from a possible data URL
 */
const extractBase64 = (input: string): string => {
  if (!input) return '';
  const commaIndex = input.indexOf(',');
  if (commaIndex === -1) return input;
  return input.slice(commaIndex + 1);
};

/**
 * POST /api/admin/uploads/tour-image
 * Upload a single tour image to Cloudinary and return { publicId, url }
 *
 * Expected body:
 * {
 *   file: string; // base64 string or data URL
 *   folder?: string; // optional Cloudinary folder e.g. "tours/hero"
 * }
 */
export const uploadTourImage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { file, folder } = req.body as { file?: string; folder?: string };

    if (!file || typeof file !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Image file (base64 string) is required',
      });
      return;
    }

    const base64 = extractBase64(file);

    const uploadResult = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${base64}`,
      {
        folder: folder || 'tours',
        resource_type: 'image',
      }
    );

    res.status(201).json({
      success: true,
      data: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
      },
    });
  } catch (error) {
    console.error('Error uploading tour image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
    });
  }
};


