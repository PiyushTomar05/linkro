const express = require('express');
const router = express.Router();
const { getSystemStats, getSystemLogs } = require('../controllers/admin.controller');

router.get('/stats', getSystemStats);
router.get('/logs', getSystemLogs);

// Extended admin routes
const { getAllJobs, deleteUser, deleteJob } = require('../controllers/admin.controller');
router.get('/jobs', getAllJobs);
router.delete('/users/:id', deleteUser);
router.delete('/jobs/:id', deleteJob);

module.exports = router;
