const User = require('../models/User.model');
const Job = require('../models/Job.model');
const Application = require('../models/Application.model');

// @desc    Get system stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
exports.getSystemStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ status: 'active' });
        const totalApplications = await Application.countDocuments();

        res.json({
            totalUsers,
            totalJobs,
            activeJobs,
            totalApplications
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get system logs
// @route   GET /api/admin/logs
// @access  Private (Admin)
exports.getSystemLogs = async (req, res) => {
    // Mocked logs as per requirement to match mock service
    const logs = [
        { id: 1, user: "Sarah Smith", action: "Posted a new job", role: "recruiter", date: "2 mins ago", status: "Success" },
        { id: 2, user: "John Doe", action: "Updated profile", role: "agent", date: "15 mins ago", status: "Success" },
        { id: 3, user: "Mike Johnson", action: "Failed login attempt", role: "agent", date: "1 hour ago", status: "Failed" },
        { id: 4, user: "Emma Wilson", action: "Registered", role: "recruiter", date: "2 hours ago", status: "Success" },
        { id: 5, user: "Alex Brown", action: "Deleted job post", role: "admin", date: "3 hours ago", status: "Success" },
    ];
    // In a real app, we'd query a Log model
    res.json(logs);
};
