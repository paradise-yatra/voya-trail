import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import fs from 'fs';
import path from 'path';

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
 * Upload a single image locally to public/packages and return { publicId, url }
 */
export const uploadTourImage = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { file } = req.body as { file?: string; folder?: string };

    if (!file || typeof file !== 'string') {
      res.status(400).json({
        success: false,
        message: 'Image file (base64 string) is required',
      });
      return;
    }

    const base64 = extractBase64(file);
    const buffer = Buffer.from(base64, 'base64');

    // Define target directory in the frontend public/packages folder
    const targetDir = path.join(__dirname, '../../../public/packages');

    // Ensure the packages folder exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique name
    const fileName = `img_${Date.now()}_${Math.round(Math.random() * 1e9)}.jpg`;
    const filePath = path.join(targetDir, fileName);

    // Save the file
    fs.writeFileSync(filePath, buffer);

    // Return the relative URL from frontend perspective
    const url = `/packages/${fileName}`;

    res.status(201).json({
      success: true,
      data: {
        publicId: fileName.replace('.jpg', ''),
        url: url,
      },
    });
  } catch (error) {
    console.error('Error uploading image locally:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image locally',
    });
  }
};





