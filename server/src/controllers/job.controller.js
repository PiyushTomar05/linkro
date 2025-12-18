const Job = require('../models/Job.model');

// @desc    Get all jobs with filters
// @route   GET /api/jobs
// @access  Public
exports.getJobs = async (req, res) => {
    try {
        const { recruiterId, query } = req.query;
        let filter = {};

        if (recruiterId) {
            filter.recruiterId = recruiterId;
        }

        if (query) {
            const q = query.toLowerCase();
            // Simple regex search (in production might use text index)
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

// @desc    Get job by ID
// @route   GET /api/jobs/:id
// @access  Public
exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (job) {
            res.json(job);
        } else {
            res.status(404).json({ message: 'Job not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Recruiter)
exports.createJob = async (req, res) => {
    try {
        const job = await Job.create({
            ...req.body,
            // Ensure posted/status defaults are used if not provided, but they are in schema
        });
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
