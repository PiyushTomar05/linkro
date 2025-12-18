const express = require('express');
const router = express.Router();
const { getSystemStats, getSystemLogs } = require('../controllers/admin.controller');

router.get('/stats', getSystemStats);
router.get('/logs', getSystemLogs);

module.exports = router;
