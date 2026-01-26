const express = require('express');
const router = express.Router();
const { getSystemStats, getSystemLogs } = require('../controllers/admin.controller');

router.get('/stats', getSystemStats);
router.get('/logs', getSystemLogs);
router.get('/analytics/growth', require('../controllers/admin.controller').getUserGrowthStats);
router.get('/analytics/stats', require('../controllers/admin.controller').getAnalyticsStats);

// Extended admin routes
const { getAllJobs, deleteUser, deleteJob, updateUserStatus, updateJobStatus } = require('../controllers/admin.controller');
router.get('/jobs', getAllJobs);
router.delete('/users/:id', deleteUser);
router.patch('/users/:id/status', updateUserStatus);
router.delete('/jobs/:id', deleteJob);
router.patch('/jobs/:id/status', updateJobStatus);

module.exports = router;
