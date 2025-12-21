const express = require('express');
const router = express.Router();
const { searchJobs, getJobDetails, applyJob, getMyApplications, uploadResume } = require('../controllers/agent.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(authMiddleware);

router.get('/jobs', searchJobs);
router.get('/jobs/:id', getJobDetails);
router.post('/apply', applyJob);
router.get('/my-applications', getMyApplications);
router.post('/resume', upload.single('resume'), uploadResume);

module.exports = router;
