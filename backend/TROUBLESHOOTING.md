# Troubleshooting Guide

## Registration Returns 404

### Issue
Registration endpoint returns 404 error.

### Possible Causes & Solutions

#### 1. Backend Server Not Running
**Check:**
```bash
cd backend
npm run dev
```

**Expected output:**
```
✅ MongoDB Connected: localhost
🚀 Server running on port 3000
📡 API available at http://localhost:3000/api
```

#### 2. Frontend Not Proxying to Backend
**Solution:** The Vite proxy is now configured in `vite.config.ts`. Make sure:
- Backend is running on port 3000
- Frontend is running on port 8080
- Restart the frontend dev server after adding proxy config

**Restart frontend:**
```bash
# Stop the current dev server (Ctrl+C)
npm run dev
```

#### 3. Wrong API URL
**Check frontend API configuration:**
- File: `src/lib/api.ts`
- Should use: `/api` (relative path) for proxy to work
- Or: `http://localhost:3000/api` (absolute path)

#### 4. CORS Issues
**Check backend CORS configuration:**
- File: `backend/src/server.js`
- `FRONTEND_URL` in `.env` should match frontend URL
- Default: `http://localhost:8080`

#### 5. Route Not Registered
**Check server logs:**
When server starts, you should see:
```
📋 Registered routes:
  POST /api/auth/register
  POST /api/auth/login
  ...
```

#### 6. MongoDB Not Running
**Check MongoDB:**
```bash
# Windows
net start MongoDB

# macOS/Linux
mongod
```

Or use MongoDB Atlas (cloud) and update `MONGODB_URI` in `.env`

### Testing the Endpoint

**Using curl:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User"
  }'
```

**Expected response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "email": "test@example.com",
      "name": "Test User"
    },
    "token": "...",
    "refreshToken": "..."
  }
}
```

### Common Errors

#### 404 - Route not found
- Backend server not running
- Wrong URL path
- Proxy not configured

#### 400 - Validation failed
- Missing required fields
- Invalid email format
- Password too short

#### 500 - Server error
- MongoDB not connected
- Database connection issue
- Server error (check logs)

### Debug Steps

1. **Check backend is running:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **Check route registration:**
   Look for route logs in server console

3. **Check frontend network tab:**
   - Open browser DevTools
   - Network tab
   - Try registration
   - Check request URL and response

4. **Check server logs:**
   - Look for error messages
   - Check MongoDB connection
   - Check route registration

### Quick Fix Checklist

- [ ] Backend server running on port 3000
- [ ] Frontend server running on port 8080
- [ ] MongoDB running or Atlas connection configured
- [ ] `.env` file exists in backend directory
- [ ] Vite proxy configured in `vite.config.ts`
- [ ] Restarted frontend dev server after proxy config
- [ ] Check browser console for errors
- [ ] Check backend console for errors

