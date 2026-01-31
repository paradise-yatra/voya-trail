import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth';

/**
 * Middleware to check if user has required role(s)
 */
export const roleCheck = (allowedRoles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: 'Authentication required.',
            });
            return;
        }

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: 'Access denied. Insufficient permissions.',
            });
            return;
        }

        next();
    };
};
