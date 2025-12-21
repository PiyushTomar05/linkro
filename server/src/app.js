const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const agentRoutes = require('./routes/agent.routes');
const recruiterRoutes = require('./routes/recruiter.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// Middlewares
app.use(cors()); // Allow all origins for dev
app.use(express.json());
app.use('/uploads/resumes', express.static('uploads/resumes'));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  if (req.method === 'POST') {
    console.log('Body:', req.body);
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root
app.get('/', (req, res) => {
  res.send('Linkro API is running');
});

module.exports = app;
