import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import User from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
    userId?: string;
}

/**
 * Middleware to verify JWT token and authenticate user
 */
export const auth = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from cookie or Authorization header
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.',
            });
            return;
        }

        // Verify token
        const decoded = verifyToken(token);

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password');

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'User not found.',
            });
            return;
        }

        // Attach user to request
        req.user = user;
        req.userId = decoded.userId;

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Invalid or expired token.',
        });
    }
};
