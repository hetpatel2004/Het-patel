import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDbStatus } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    app: 'Het Patel - Full Stack MERN Portfolio Backend',
    db: getDbStatus(),
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`[Server] Het Patel Portfolio API server running on port ${PORT}`);
});
