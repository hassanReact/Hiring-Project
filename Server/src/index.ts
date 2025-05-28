import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.client_uri || 'http://localhost:5173/', // Allow all origins by default
    credentials: true, // Allow credentials
}));
app.use(express.json());
 // Middleware to parse JSON requests
app.use(cookieParser())
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
