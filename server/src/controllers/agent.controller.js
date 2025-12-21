const Job = require('../models/Job.model');
const Application = require('../models/Application.model');
const User = require('../models/User.model');

// @desc    Search and list all active jobs
// @route   GET /api/agent/jobs
exports.searchJobs = async (req, res) => {
    try {
        const { query } = req.query;
        let filter = { status: 'active' };

        if (query) {
            const q = query.toLowerCase();
            // Basic search on title or company
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { company: { $regex: q, $options: 'i' } }
            ];
        }

        const jobs = await Job.find(filter);
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get job details
// @route   GET /api/agent/jobs/:id
exports.getJobDetails = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Apply for a job
// @route   POST /api/agent/apply
exports.applyJob = async (req, res) => {
    try {
        const { jobId } = req.body;

        // Check if job exists and is active
        const job = await Job.findById(jobId);
        if (!job || job.status !== 'active') {
            return res.status(400).json({ message: 'Job not found or not active' });
        }

        // Check if already applied
        const existing = await Application.findOne({ jobId, applicantId: req.user._id });
        if (existing) {
            return res.status(400).json({ message: 'Already applied for this job' });
        }

        const application = await Application.create({
            jobId,
            applicantId: req.user._id,
            jobId,
            applicantId: req.user._id,
            status: 'pending',
            appliedAt: new Date(),
            timeline: [{
                status: 'pending',
                note: 'Application submitted',
                updatedBy: req.user._id,
                updatedAt: new Date()
            }]
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get single application details for agent
// @route   GET /api/agent/applications/:id
exports.getApplicationDetails = async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            applicantId: req.user._id
        })
            .populate('jobId', 'title company location description salary type posted status')
            .populate('timeline.updatedBy', 'name role'); // Populate who updated the status

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        const transformed = {
            ...application.toJSON(),
            jobTitle: application.jobId?.title || 'Unknown Job',
            company: application.jobId?.company || 'Unknown Company',
        };

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my applications
// @route   GET /api/agent/my-applications
exports.getMyApplications = async (req, res) => {
    try {
        const applications = await Application.find({ applicantId: req.user._id })
            .populate('jobId', 'title company location salary type');

        const transformed = applications.map(app => ({
            ...app.toJSON(),
            jobTitle: app.jobId?.title || 'Unknown Job',
            company: app.jobId?.company || 'Unknown Company',
            // flatten other job details if needed
        }));

        res.json(transformed);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Upload resume
// @route   POST /api/agent/resume
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.resume = req.file.filename;
        await user.save();

        res.json({
            message: 'Resume uploaded successfully',
            filename: req.file.filename
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
