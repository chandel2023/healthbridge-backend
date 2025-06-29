const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api', protectedRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api', appointmentRoutes);

const yogaRoutes = require('./routes/yogaRoutes');
app.use('/api', yogaRoutes);

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api', doctorRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
  })
  .catch((err) => console.error('❌ DB Connection Error:', err.message));
