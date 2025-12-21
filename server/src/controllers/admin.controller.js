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
    try {
        const [recentUsers, recentJobs, recentApplications] = await Promise.all([
            User.find().sort({ joined: -1 }).limit(5).lean(),
            Job.find().sort({ posted: -1 }).limit(5).populate('recruiterId', 'name').lean(),
            Application.find().sort({ appliedAt: -1 }).limit(5).populate('applicantId', 'name').lean()
        ]);

        const userLogs = recentUsers.map(u => ({
            id: u._id,
            user: u.name,
            action: `Joined Platform`,
            role: u.role,
            timestamp: new Date(u.joined), // For sorting
            date: u.joined, // For display formatting
            status: "Success"
        }));

        const jobLogs = recentJobs.map(j => ({
            id: j._id,
            user: j.recruiterId?.name || "Unknown Recruiter",
            action: "Posted a new job",
            role: "recruiter",
            timestamp: new Date(j.posted),
            date: j.posted,
            status: "Success"
        }));

        const appLogs = recentApplications.map(a => ({
            id: a._id,
            user: a.applicantId?.name || "Unknown Applicant",
            action: "Applied to job",
            role: "agent",
            timestamp: new Date(a.appliedAt),
            date: a.appliedAt,
            status: "Success"
        }));

        const combinedLogs = [...userLogs, ...jobLogs, ...appLogs]
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 10)
            .map(log => ({
                ...log,
                date: formatRelativeTime(log.date)
            }));

        res.json(combinedLogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function formatRelativeTime(date) {
    const now = new Date();
    const joined = new Date(date);
    const diffInSeconds = Math.floor((now - joined) / 1000);

    if (diffInSeconds < 60) return "Just now";

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
}

// @desc    Get all jobs (admin view)
// @route   GET /api/admin/jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find({}).sort({ posted: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete job
// @route   DELETE /api/admin/jobs/:id
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user growth stats (last 7 days)
// @route   GET /api/admin/analytics/growth
exports.getUserGrowthStats = async (req, res) => {
    try {
        const days = 7;
        const stats = [];
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            date.setHours(0, 0, 0, 0);

            const nextDay = new Date(date);
            nextDay.setDate(date.getDate() + 1);

            const count = await User.countDocuments({
                joined: { $gte: date, $lt: nextDay }
            });

            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });

            stats.push({
                day: dayName,
                count: count,
                fullDate: date.toISOString()
            });
        }

        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
