const express = require('express');
const router = express.Router();
const { getApplications, applyJob } = require('../controllers/application.controller');

router.get('/', getApplications);
router.post('/', applyJob);

module.exports = router;
