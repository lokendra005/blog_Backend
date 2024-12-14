// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import blogRoutes from './routes/blogRoutes';

dotenv.config();

const app = express();

// app.use(cors({
//   origin: [
//     'http://localhost:3000',
//     'https://your-frontend-url.vercel.app' // Add your frontend URL after deployment
//   ],
//   credentials: true
// }));

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