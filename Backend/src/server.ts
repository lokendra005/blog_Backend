import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app = express();

const allowedOrigins = [
  '*',
  'http://localhost:5173',
]
const corsOptions = {
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
  allowedHeaders: ['Content-Type'], 
};
app.use(cors(corsOptions));

app.use(express.json());

connectDB();

app.get('/api/health', (req, res) => {
  res.send('API is working');
});

app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;