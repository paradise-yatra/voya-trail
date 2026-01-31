# Paradise Yatra Backend API

Backend server for Paradise Yatra admin panel built with Express.js, MongoDB, and JWT authentication.

## Features

- ✅ User authentication with JWT tokens
- ✅ HTTP-only cookie support
- ✅ Role-based access control (admin/user)
- ✅ Password hashing with bcrypt
- ✅ MongoDB with Mongoose ODM
- ✅ TypeScript support
- ✅ CORS enabled for frontend

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Create a `.env` file in the `backend` directory:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/paradiseyatra
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

Make sure MongoDB is running on your system or use MongoDB Atlas.

```bash
# For local MongoDB
mongod
```

### 4. Create Admin User

```bash
npm run create-admin
```

Follow the prompts to create your first admin user.

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)

### Health Check

- `GET /health` - Server health status
- `GET /` - API welcome message

## Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Create admin user
npm run create-admin
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── controllers/
│   │   └── authController.ts  # Auth logic
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification
│   │   └── roleCheck.ts       # Role-based access
│   ├── models/
│   │   └── User.ts            # User model
│   ├── routes/
│   │   └── authRoutes.ts      # Auth endpoints
│   ├── scripts/
│   │   └── createAdmin.ts     # Admin creation script
│   ├── utils/
│   │   └── jwt.ts             # JWT utilities
│   └── server.ts              # Express app
├── .env                       # Environment variables
├── package.json
└── tsconfig.json
```

## Technologies

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety
- **CORS** - Cross-origin support

## License

ISC
