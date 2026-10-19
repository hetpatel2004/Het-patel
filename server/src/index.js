import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, getDbStatus } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Security hardening
app.disable('x-powered-by');

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Database connection (graceful fallback if MongoDB isn't running)
connectDB();

// API Routes (canonical /api/*)
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root Route Fallbacks (resilience if client VITE_API_URL omits /api)
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/projects', projectRoutes);
app.use('/skills', skillRoutes);
app.use('/contact', contactRoutes);
app.use('/services', serviceRoutes);
app.use('/analytics', analyticsRoutes);

// Health check
const sendHealth = (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Het Patel - Full Stack MERN Portfolio Backend API',
    db: getDbStatus(),
    endpoints: [
      '/api/auth/login',
      '/api/auth/verify',
      '/api/profile',
      '/api/projects',
      '/api/skills',
      '/api/contact',
      '/api/analytics/visit',
      '/api/analytics/stats',
    ],
    timestamp: new Date().toISOString(),
  });
};
app.get('/api/health', sendHealth);
app.get('/health', sendHealth);

// Serve static client assets in production if client build exists
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    // Never intercept API and backend route paths
    const isBackendRoute =
      req.path.startsWith('/api') ||
      req.path.startsWith('/skills') ||
      req.path.startsWith('/profile') ||
      req.path.startsWith('/projects') ||
      req.path.startsWith('/contact') ||
      req.path.startsWith('/services') ||
      req.path.startsWith('/auth') ||
      req.path.startsWith('/analytics') ||
      req.path.startsWith('/health');

    if (isBackendRoute) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

const server = app.listen(PORT, () => {
  console.log(`[Server] Het Patel Portfolio API server running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`[Server Warning] Port ${PORT} is already in use by another running process.`);
    console.warn(`[Server Guidance] If you already have the server running in another terminal window or background process, it is already serving your API.`);
  } else {
    console.error('[Server Error]', err);
  }
});

