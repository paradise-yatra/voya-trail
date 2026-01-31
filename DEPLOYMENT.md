# Paradise Yatra - Full Stack Setup Guide

Complete guide for development and VPS deployment of Paradise Yatra with Express.js backend and Next.js frontend.

## Prerequisites

- Node.js 18+ and npm
- MongoDB installed locally or MongoDB Atlas account
- Git
- For VPS: Ubuntu server with root access

---

## Local Development Setup

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure Environment Variables

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/paradiseyatra
JWT_SECRET=paradise-yatra-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

> ⚠️ **Important**: Change `JWT_SECRET` to a unique, secure random string in production!

### 3. Start MongoDB

```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas and update MONGODB_URI accordingly
```

### 4. Create First Admin User

```bash
cd backend
npm run create-admin
```

Follow the prompts to create your admin account.

### 5. Run Development Servers

**Option 1: Run both servers concurrently (Recommended)**
```bash
npm run dev:all
```

**Option 2: Run servers separately**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run dev:backend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin

---

## VPS Deployment (Production)

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install MongoDB (if hosting DB on same server)
# Or use MongoDB Atlas for production
```

### 2. Clone and Setup Project

```bash
# Clone your repository
cd /var/www
git clone <your-repo-url> paradise-yatra
cd paradise-yatra

# Install dependencies
npm install
cd backend
npm install
cd ..
```

### 3. Configure Production Environment

**Backend** (`backend/.env`):
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=<your-mongodb-atlas-uri-or-local>
JWT_SECRET=<generate-secure-random-string-min-32-chars>
JWT_EXPIRES_IN=7d
FRONTEND_URL=https://yourdomain.com
```

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
```

### 4. Build Applications

```bash
# Build frontend
npm run build

# Build backend
cd backend
npm run build
cd ..
```

### 5. Setup PM2

```bash
# Start backend
cd backend
pm2 start dist/server.js --name paradise-backend

# Start frontend
cd ..
pm2 start npm --name paradise-frontend -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

### 6. Configure Nginx

Create Nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/paradise-yatra
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site and restart Nginx:

```bash
sudo ln -s /etc/nginx/sites-available/paradise-yatra /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. Setup SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is configured automatically
```

### 8. Create Admin User in Production

```bash
cd /var/www/paradise-yatra/backend
npm run create-admin
```

---

## Useful PM2 Commands

```bash
# View logs
pm2 logs paradise-backend
pm2 logs paradise-frontend

# Restart applications
pm2 restart paradise-backend
pm2 restart paradise-frontend

# Stop applications
pm2 stop paradise-backend
pm2 stop paradise-frontend

# Monitor applications
pm2 monit

# List all applications
pm2 list
```

---

## Database Backup (Production)

### MongoDB Atlas (Recommended)
- Automatic backups included in Atlas
- Point-in-time recovery available
- No manual setup needed

### Self-Hosted MongoDB

```bash
# Create backup
mongodump --uri="mongodb://localhost:27017/paradiseyatra" --out=/backups/$(date +%Y%m%d)

# Restore backup
mongorestore --uri="mongodb://localhost:27017/paradiseyatra" /backups/20240101

# Automated daily backups (cron)
0 2 * * * mongodump --uri="mongodb://localhost:27017/paradiseyatra" --out=/backups/$(date +\%Y\%m\%d)
```

---

## Updating Application

```bash
# Pull latest code
cd /var/www/paradise-yatra
git pull origin main

# Update dependencies
npm install
cd backend && npm install && cd ..

# Rebuild
npm run build
cd backend && npm run build && cd ..

# Restart PM2 applications
pm2 restart paradise-backend
pm2 restart paradise-frontend
```

---

## Troubleshooting

### Backend won't start
- Check MongoDB connection: `mongosh`
- Check backend logs: `pm2 logs paradise-backend`
- Verify `.env` file exists with correct values
- Check port 5000 is not in use: `sudo lsof -i :5000`

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check CORS settings in backend
- Verify backend is running: `curl http://localhost:5000/health`

### Login not working
- Check JWT_SECRET is set
- Clear browser cookies
- Check backend logs for errors
- Verify user exists in database: `mongosh` → `use paradiseyatra` → `db.users.find()`

### MongoDB connection failed
- Verify `MONGODB_URI` is correct
- Check MongoDB is running: `sudo systemctl status mongod`
- Check network permissions if using Atlas

---

## Security Checklist

- ✅ Change default JWT_SECRET to secure random string
- ✅ Use environment variables for sensitive data
- ✅ Enable HTTPS with SSL certificate
- ✅ Set NODE_ENV=production
- ✅ Configure firewall (ufw) to only allow necessary ports
- ✅ Regular security updates: `sudo apt update && sudo apt upgrade`
- ✅ Use strong passwords for admin accounts
- ✅ Regular database backups
- ✅ Monitor application logs

---

## Support

For issues or questions:
1. Check logs: `pm2 logs`
2. Check MongoDB logs: `sudo journalctl -u mongod`
3. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`

