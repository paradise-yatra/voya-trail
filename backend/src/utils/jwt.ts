import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-change-in-production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface TokenPayload {
    userId: string;
    role: 'admin' | 'user';
}

/**
 * Generate a JWT token for a user
 */
export const generateToken = (userId: string, role: 'admin' | 'user'): string => {
    const payload: TokenPayload = {
        userId,
        role,
    };

    return jwt.sign(payload, JWT_SECRET as string, {
        expiresIn: JWT_EXPIRES_IN as any,
    });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): TokenPayload => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        return decoded;
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};
