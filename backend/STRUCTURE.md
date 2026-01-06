# Backend Project Structure

## 📁 Folder Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── database.js      # MongoDB connection
│   │   └── constants.js     # Application constants
│   ├── controllers/         # Business logic (controllers)
│   │   ├── auth.controller.js
│   │   ├── game.controller.js
│   │   ├── dashboard.controller.js
│   │   ├── career.controller.js
│   │   ├── skillQuiz.controller.js
│   │   └── leaderboard.controller.js
│   ├── middleware/          # Custom middleware
│   │   └── auth.middleware.js
│   ├── models/              # Database models
│   │   ├── User.model.js
│   │   ├── Game.model.js
│   │   └── SkillQuiz.model.js
│   ├── routes/              # Route definitions
│   │   ├── auth.routes.js
│   │   ├── game.routes.js
│   │   ├── dashboard.routes.js
│   │   ├── career.routes.js
│   │   ├── skillQuiz.routes.js
│   │   └── leaderboard.routes.js
│   ├── utils/               # Utility functions
│   │   ├── jwt.utils.js
│   │   ├── badges.utils.js
│   │   ├── careerPrediction.utils.js
│   │   ├── errorHandler.utils.js
│   │   ├── response.utils.js
│   │   └── validation.utils.js
│   └── server.js            # Main server file
├── .env                     # Environment variables (not in git)
├── .gitignore
├── package.json
├── README.md
├── SETUP.md
└── STRUCTURE.md             # This file
```

## 🏗️ Architecture Overview

### Separation of Concerns

1. **Routes** (`src/routes/`)
   - Define API endpoints
   - Handle request validation
   - Call appropriate controllers
   - No business logic

2. **Controllers** (`src/controllers/`)
   - Contain business logic
   - Interact with models
   - Handle request/response
   - Use utilities as needed

3. **Models** (`src/models/`)
   - Define database schemas
   - Handle data validation
   - Define model methods

4. **Middleware** (`src/middleware/`)
   - Authentication
   - Request processing
   - Error handling

5. **Utils** (`src/utils/`)
   - Reusable functions
   - Helper utilities
   - Business logic utilities

6. **Config** (`src/config/`)
   - Database configuration
   - Application constants
   - Environment setup

## 🔄 Request Flow

```
Client Request
    ↓
Routes (validation)
    ↓
Middleware (auth, etc.)
    ↓
Controller (business logic)
    ↓
Model (database operations)
    ↓
Controller (format response)
    ↓
Response to Client
```

## 📝 Code Organization Principles

1. **Single Responsibility**: Each file has one clear purpose
2. **DRY (Don't Repeat Yourself)**: Reusable utilities
3. **Separation of Concerns**: Routes, controllers, models are separate
4. **Error Handling**: Centralized error handling
5. **Validation**: Input validation at route level
6. **Response Formatting**: Standardized responses

## 🛠️ Adding New Features

### 1. Add a New Endpoint

**Step 1:** Create controller (`src/controllers/`)
```javascript
// example.controller.js
import { handleAsync } from '../utils/errorHandler.utils.js';
import { successResponse } from '../utils/response.utils.js';

export const exampleFunction = handleAsync(async (req, res) => {
  // Business logic here
  return successResponse(res, data);
});
```

**Step 2:** Create route (`src/routes/`)
```javascript
// example.routes.js
import express from 'express';
import { exampleFunction } from '../controllers/example.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();
router.use(authenticate); // If protected
router.get('/', exampleFunction);
export default router;
```

**Step 3:** Register route (`src/server.js`)
```javascript
import exampleRoutes from './routes/example.routes.js';
app.use('/api/example', exampleRoutes);
```

### 2. Add a New Model

Create file in `src/models/`:
```javascript
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  // fields
});

export default mongoose.model('ModelName', schema);
```

### 3. Add a New Utility

Create file in `src/utils/`:
```javascript
export const utilityFunction = () => {
  // utility logic
};
```

## 🔒 Security Features

- ✅ JWT Authentication
- ✅ Password Hashing (bcrypt)
- ✅ Input Validation
- ✅ Rate Limiting
- ✅ CORS Configuration
- ✅ Error Handling (no sensitive data leaks)

## 📊 Error Handling

All errors are handled through:
- `errorHandler.utils.js` - Centralized error handling
- `response.utils.js` - Standardized error responses
- Express error middleware

## ✅ Best Practices

1. **Always use `handleAsync`** for async controller functions
2. **Use `successResponse` and `errorResponse`** for consistent responses
3. **Validate input** at route level
4. **Handle errors** properly (don't expose sensitive info)
5. **Use constants** from `config/constants.js`
6. **Keep controllers thin** - move complex logic to utils
7. **Document complex functions** with JSDoc comments

## 🧪 Testing Structure

For future testing:
```
backend/
└── tests/
    ├── controllers/
    ├── routes/
    ├── utils/
    └── integration/
```

## 📚 File Naming Conventions

- **Controllers**: `*.controller.js`
- **Routes**: `*.routes.js`
- **Models**: `*.model.js`
- **Middleware**: `*.middleware.js`
- **Utils**: `*.utils.js`
- **Config**: `*.js` (descriptive names)

---

**Last Updated**: January 2026  
**Structure Version**: 2.0.0

