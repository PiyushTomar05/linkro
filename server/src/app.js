const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const agentRoutes = require('./routes/agent.routes');
const recruiterRoutes = require('./routes/recruiter.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const statsRoutes = require('./routes/stats.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(compression());
app.use(helmet());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Linkro API is running' });
});

module.exports = app;
