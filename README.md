# EcoLens AI — Backend API

This is the backend API for EcoLens AI, responsible for AI processing, history tracking, and eco-guidance data.

## 🚀 Features
- **AI Analysis**: Integrates with TensorFlow.js/Gemini for plastic detection.
- **History Management**: Stores and retrieves user scan history.
- **Security**: JWT-based authentication via Supabase.
- **Production Ready**: Built-in rate limiting, security headers (Helmet), and logging.

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Logging**: Winston

## ⚙️ Local Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zennintoji29-create/ecolensb.git
   cd ecolensb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root:
   ```env
   PORT=5000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   JWT_SECRET=your_supabase_jwt_secret
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Build and Run**:
   ```bash
   npm run build
   npm start
   ```

## 🌐 Deployment (Render)

1. Connect this repository to **Render.com** as a **Web Service**.
2. **Root Directory**: Leave empty (if repo root) or `server`.
3. **Build Command**: `npm install && npm run build`
4. **Start Command**: `node dist/index.js`
5. Add the **Environment Variables** in the Render dashboard.
6. Set `CORS_ORIGIN` to your production frontend URL (e.g., `https://ecolens-ai.vercel.app`).
7. Deploy!

## 📄 License
MIT
