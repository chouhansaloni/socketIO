import express from 'express';
import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser());
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs'); // Set view engine

// MongoDB Connection
connect('mongodb://localhost:27017/project', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Routes
app.use('/user', authRoutes);

// Start Server
app.listen(3000, () => console.log(`Server running on http://localhost:3000`));
