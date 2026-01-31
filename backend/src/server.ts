import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import tourRoutes from './routes/tourRoutes';
import adminTourRoutes from './routes/adminTourRoutes';

// Load environment variables
dotenv.config();

// Initialize express app
const app: Application = express();

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// Connect to MongoDB
connectDB();

// Middleware
app.use(
    cors({
        origin: FRONTEND_URL,
        credentials: true, // Allow cookies to be sent
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/admin', adminTourRoutes);

// Health check endpoint
app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Paradise Yatra Backend API is running',
        timestamp: new Date().toISOString(),
    });
});

// Root endpoint
app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to Paradise Yatra API',
        version: '1.0.0',
    });
});

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 Server is running on port ${PORT}`);
    console.log(`📡 API endpoint: http://localhost:${PORT}`);
    console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
    console.log(`\n✨ Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

export default app;
