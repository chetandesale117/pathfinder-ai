# CareerAI - AI-Powered Career Recommendation Platform

A gamified career assessment platform that uses cognitive games and skill quizzes to provide AI-powered career recommendations.

## Project Structure

```
pathfinder-ai/
├── src/              # Frontend (React + TypeScript)
├── backend/          # Backend API (Node.js + Express + MongoDB)
├── FRONTEND_SUMMARY.md    # Frontend API documentation
└── IMPLEMENTATION_SUMMARY.md  # Implementation details
```

## Quick Start

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:8080`

### Backend Setup

1. **Navigate to backend:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   See `backend/SETUP.md` for details

4. **Start MongoDB** (if using local)

5. **Start backend server:**
   ```bash
   npm run dev
   ```
   Backend runs on `http://localhost:3000`

See `backend/README.md` and `backend/SETUP.md` for detailed backend setup instructions.

## Features

- 🎮 **6 Cognitive Games** - Logical reasoning, math, patterns, problem-solving, technical knowledge, career quest
- 📊 **Real-time Dashboard** - Track progress, XP, levels, badges, and skills
- 🎯 **Career Prediction** - AI-powered career recommendations based on game performance
- 🏆 **Leaderboard** - Compete with other players globally
- 🎖️ **Badge System** - Unlock achievements as you play
- 📈 **Skill Assessment** - Comprehensive skill quiz for personality profiling

## Technology Stack

### Frontend
- React 18 + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Query
- Framer Motion
- Recharts

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs

## Documentation

- **FRONTEND_SUMMARY.md** - Complete API documentation for backend team
- **IMPLEMENTATION_SUMMARY.md** - Frontend implementation details
- **backend/README.md** - Backend API documentation
- **backend/SETUP.md** - Backend setup guide

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
