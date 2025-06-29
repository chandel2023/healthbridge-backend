const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Root route (optional but good for Render health check)
app.get('/', (req, res) => {
  res.send('✅ HealthBridge API is working');
});

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

// ✅ Dynamic port setup for Render
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ DB Connection Error:', err.message));
