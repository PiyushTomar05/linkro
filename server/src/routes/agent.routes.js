const express = require('express');
const router = express.Router();
const { searchJobs, getJobDetails, applyJob, getMyApplications, getApplicationDetails, uploadResume } = require('../controllers/agent.controller');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.use(authMiddleware);

router.get('/jobs', searchJobs);
router.get('/jobs/:id', getJobDetails);
router.post('/apply', applyJob);
router.get('/my-applications', getMyApplications);
router.get('/applications/:id', getApplicationDetails);
router.post('/resume', upload.single('resume'), uploadResume);

module.exports = router;
