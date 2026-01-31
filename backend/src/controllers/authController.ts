import { Request, Response } from 'express';
import User from '../models/User';
import { generateToken } from '../utils/jwt';
import { AuthRequest } from '../middleware/auth';

/**
 * Login user and return JWT token
 */
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: 'Please provide email and password.',
            });
            return;
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
            return;
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password.',
            });
            return;
        }

        // Generate token
        const token = generateToken(user._id.toString(), user.role);

        // Set HTTP-only cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        // Return user data
        res.status(200).json({
            success: true,
            message: 'Login successful.',
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
            token, // Also send token in response for flexibility
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during login.',
        });
    }
};

/**
 * Logout user by clearing the token cookie
 */
export const logout = async (_req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie('token');

        res.status(200).json({
            success: true,
            message: 'Logout successful.',
        });
    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred during logout.',
        });
    }
};

/**
 * Get current authenticated user
 */
export const me = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({
                authenticated: false,
                user: null,
            });
            return;
        }

        res.status(200).json({
            authenticated: true,
            user: {
                id: req.user._id,
                email: req.user.email,
                name: req.user.name,
                role: req.user.role,
            },
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching user data.',
        });
    }
};
