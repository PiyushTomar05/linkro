const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const agentRoutes = require('./routes/agent.routes');
const recruiterRoutes = require('./routes/recruiter.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/agent', agentRoutes);
app.use('/api/recruiter', recruiterRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Root
app.get('/', (req, res) => {
  res.send('Linkro API is running');
});

module.exports = app;
