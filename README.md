# Paradise Yatra Auth System - Quick Start

## 🚀 Quick Setup (5 minutes)

### 1. Install All Dependencies
```bash
# From project root
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Start MongoDB
Make sure MongoDB is running locally or configure MongoDB Atlas URI in `backend/.env`

### 3. Create Admin User
```bash
cd backend
npm run create-admin
```
Enter your admin email, password (min 8 chars), and name.

### 4. Start Both Servers
```bash
# From project root
npm run dev:all
```

This starts:
- Frontend on http://localhost:3000
- Backend on http://localhost:5000

### 5. Login to Admin Panel
1. Open http://localhost:3000/admin
2. You'll be redirected to login page
3. Enter your admin credentials
4. You're in! 🎉

---

## 📝 Environment Variables

Already configured in:
- `backend/.env` - Backend configuration
- `.env.local` - Frontend configuration

Change `JWT_SECRET` in `backend/.env` for production!

---

## 🔧 Useful Commands

```bash
# Run both servers
npm run dev:all

# Run frontend only
npm run dev

# Run backend only
npm run dev:backend

# Create new admin user
cd backend && npm run create-admin

# Build for production
npm run build
```

---

## 🆘 Troubleshooting

**Can't login?**
- Make sure backend is running (http://localhost:5000/health should work)
- Check MongoDB is running
- Verify admin user was created

**CORS errors?**
- Backend `FRONTEND_URL` should be http://localhost:3000
- Frontend `NEXT_PUBLIC_API_URL` should be http://localhost:5000

**Port already in use?**
- Frontend uses 3000
- Backend uses 5000
- Change in respective .env files if needed

---

For full deployment guide, see [DEPLOYMENT.md](./DEPLOYMENT.md)
