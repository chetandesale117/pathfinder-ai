# Backend Setup Guide

## Quick Start

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   
   **Option 1: Automatic (Recommended)**
   ```bash
   npm run setup
   ```
   This will automatically create a `.env` file with secure random JWT secrets.
   
   **Option 2: Manual**
   Create a file named `.env` in the `backend` directory with the following content:
   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/careerai
   JWT_SECRET=your-super-secret-jwt-key-change-in-production-min-32-chars
   JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production-min-32-chars
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:8080
   ```

   **Important:** Change the JWT secrets to secure random strings in production!

4. **Start MongoDB:**
   - **Local MongoDB:** Make sure MongoDB is running on your system
   - **MongoDB Atlas (Cloud):** Update `MONGODB_URI` with your Atlas connection string

5. **Start the server:**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

## Testing the API

### Using curl:

**1. Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "age": 25,
    "education": "Bachelor'\''s"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

**3. Get current user (replace TOKEN with token from login):**
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

**4. Submit a game:**
```bash
curl -X POST http://localhost:3000/api/game/submit \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "gameType": "logical-reasoning",
    "score": 850,
    "accuracy": 80,
    "timeTaken": 180,
    "xpEarned": 150,
    "difficultyLevel": "Mixed",
    "totalQuestions": 10,
    "correctAnswers": 8,
    "streak": 5,
    "avgTimePerQuestion": 18
  }'
```

**5. Get dashboard:**
```bash
curl -X GET http://localhost:3000/api/dashboard \
  -H "Authorization: Bearer TOKEN"
```

## MongoDB Setup

### Option 1: Local MongoDB

1. **Install MongoDB:**
   - Windows: Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - macOS: `brew install mongodb-community`
   - Linux: Follow [MongoDB installation guide](https://docs.mongodb.com/manual/installation/)

2. **Start MongoDB:**
   ```bash
   mongod
   ```

3. **Use connection string:**
   ```
   mongodb://localhost:27017/careerai
   ```

### Option 2: MongoDB Atlas (Cloud)

1. **Create free account:** [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create a cluster**

3. **Get connection string:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string

4. **Update `.env`:**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/careerai
   ```

## Troubleshooting

### Port already in use
```bash
# Change PORT in .env file
PORT=3001
```

### MongoDB connection error
- Check if MongoDB is running
- Verify `MONGODB_URI` in `.env`
- Check MongoDB logs

### JWT errors
- Make sure `JWT_SECRET` and `JWT_REFRESH_SECRET` are set
- Use long, random strings (minimum 32 characters)

### CORS errors
- Update `FRONTEND_URL` in `.env` to match your frontend URL
- Check browser console for specific CORS errors

## Production Deployment

1. **Set `NODE_ENV=production`**
2. **Use strong JWT secrets** (generate with `openssl rand -base64 32`)
3. **Use MongoDB Atlas** or secure MongoDB instance
4. **Enable HTTPS**
5. **Set up proper CORS** for your domain
6. **Use environment variables** for all secrets
7. **Enable rate limiting** (already configured)
8. **Set up logging** and monitoring

## Next Steps

1. ✅ Backend is running
2. ✅ Test API endpoints
3. ✅ Connect frontend (update `VITE_API_BASE_URL` or configure Vite proxy)
4. ✅ Start using the application!

