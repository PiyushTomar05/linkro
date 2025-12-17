// Simulated data and services
const USERS_KEY = 'linkro_users';
const JOBS_KEY = 'linkro_jobs';
const APPLICATIONS_KEY = 'linkro_applications';
const CUR_USER_KEY = 'linkro_current_user';

// Initial Mock Data
const INITIAL_USERS = [
    { id: '1', name: 'Admin User', email: 'admin@linkro.com', password: 'password', role: 'admin', status: 'active', joined: '2023-01-15' },
    { id: '2', name: 'Recruiter One', email: 'recruiter@company.com', password: 'password', role: 'recruiter', company: 'Tech Corp', status: 'active', joined: '2023-02-20' },
    { id: '3', name: 'John Doe', email: 'john@example.com', password: 'password', role: 'agent', skills: ['React', 'Node.js'], status: 'active', joined: '2023-03-10' },
    { id: '4', name: 'Jane Smith', email: 'jane@example.com', password: 'password', role: 'agent', skills: ['Python', 'Data Science'], status: 'active', joined: '2023-03-12' },
];

const INITIAL_JOBS = [
    { id: '101', title: 'Senior React Developer', company: 'Tech Corp', recruiterId: '2', location: 'Remote', salary: '$120k - $150k', type: 'Full-time', description: 'We are looking for an experienced React developer...', status: 'active', posted: '2023-11-01' },
    { id: '102', title: 'Backend Engineer', company: 'Tech Corp', recruiterId: '2', location: 'San Francisco, CA', salary: '$130k - $160k', type: 'Full-time', description: 'Join our backend team building scalable APIs...', status: 'active', posted: '2023-11-05' },
    { id: '103', title: 'Data Scientist', company: 'Data Inc', recruiterId: '99', location: 'New York, NY', salary: '$140k - $180k', type: 'Contract', description: 'Analyze large datasets...', status: 'closed', posted: '2023-10-15' },
];

const INITIAL_APPLICATIONS = [
    { id: '201', jobId: '101', applicantId: '3', status: 'pending', appliedAt: '2023-11-02' },
    { id: '202', jobId: '102', applicantId: '4', status: 'interview', appliedAt: '2023-11-06' },
];

// Helper to get data from local storage or init
const getData = (key, initial) => {
    const stored = localStorage.getItem(key);
    if (!stored) {
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
    }
    return JSON.parse(stored);
};

const setData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// --- AUTH SERVICES ---

export const loginUser = async (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getData(USERS_KEY, INITIAL_USERS);
            const user = users.find(u => u.email === email && u.password === password);
            if (user) {
                const { password, ...userWithoutPass } = user;
                localStorage.setItem(CUR_USER_KEY, JSON.stringify(userWithoutPass));
                resolve(userWithoutPass);
            } else {
                reject(new Error('Invalid email or password'));
            }
        }, 800);
    });
};

export const registerUser = async (userData) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getData(USERS_KEY, INITIAL_USERS);
            if (users.find(u => u.email === userData.email)) {
                reject(new Error('Email already exists'));
                return;
            }
            const newUser = {
                id: String(Date.now()),
                status: 'active',
                joined: new Date().toISOString().split('T')[0],
                ...userData
            };
            users.push(newUser);
            setData(USERS_KEY, users);
            const { password, ...userWithoutPass } = newUser;
            localStorage.setItem(CUR_USER_KEY, JSON.stringify(userWithoutPass));
            resolve(userWithoutPass);
        }, 800);
    });
};

export const logoutUser = async () => {
    localStorage.removeItem(CUR_USER_KEY);
    return Promise.resolve();
}

export const getCurrentUser = () => {
    const stored = localStorage.getItem(CUR_USER_KEY);
    return stored ? JSON.parse(stored) : null;
}

// --- USER SERVICES (ADMIN) ---

export const getUsers = async () => {
    // initialize if needed
    getData(USERS_KEY, INITIAL_USERS);
    return new Promise((resolve) => {
        setTimeout(() => {
            const users = getData(USERS_KEY, INITIAL_USERS);
            resolve(users.map(({ password, ...u }) => u));
        }, 500);
    });
};

export const getUserById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = getData(USERS_KEY, INITIAL_USERS);
            const user = users.find(u => u.id === id);
            if (user) resolve(user);
            else reject(new Error("User not found"));
        }, 300);
    });
}

// --- JOB SERVICES ---

export const getJobs = async (filters = {}) => {
    // initialize if needed
    getData(JOBS_KEY, INITIAL_JOBS);
    return new Promise((resolve) => {
        setTimeout(() => {
            let jobs = getData(JOBS_KEY, INITIAL_JOBS);
            if (filters.recruiterId) {
                jobs = jobs.filter(j => j.recruiterId === filters.recruiterId);
            }
            if (filters.query) {
                const q = filters.query.toLowerCase();
                jobs = jobs.filter(j => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q));
            }
            resolve(jobs);
        }, 500);
    });
};

export const getJobById = async (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const jobs = getData(JOBS_KEY, INITIAL_JOBS);
            const job = jobs.find(j => j.id === id);
            if (job) resolve(job);
            else reject(new Error("Job not found"));
        }, 300);
    });
}

export const createJob = async (jobData) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const jobs = getData(JOBS_KEY, INITIAL_JOBS);
            const newJob = {
                id: String(Date.now()),
                posted: new Date().toISOString().split('T')[0],
                status: 'active',
                ...jobData
            };
            jobs.push(newJob);
            setData(JOBS_KEY, jobs);
            resolve(newJob);
        }, 600);
    });
}

// --- APPLICATION SERVICES ---

export const getApplications = async (filters = {}) => {
    getData(APPLICATIONS_KEY, INITIAL_APPLICATIONS); // init
    return new Promise((resolve) => {
        setTimeout(() => {
            let apps = getData(APPLICATIONS_KEY, INITIAL_APPLICATIONS);
            const jobs = getData(JOBS_KEY, INITIAL_JOBS);
            const users = getData(USERS_KEY, INITIAL_USERS);

            // Join data
            let enrichedApps = apps.map(app => {
                const job = jobs.find(j => j.id === app.jobId) || {};
                const applicant = users.find(u => u.id === app.applicantId) || {};
                return { ...app, jobTitle: job.title, company: job.company, applicantName: applicant.name, applicantEmail: applicant.email };
            });

            if (filters.recruiterId) {
                // filter applications for jobs owned by recruiter
                const recruiterJobIds = jobs.filter(j => j.recruiterId === filters.recruiterId).map(j => j.id);
                enrichedApps = enrichedApps.filter(a => recruiterJobIds.includes(a.jobId));
            }

            if (filters.applicantId) {
                enrichedApps = enrichedApps.filter(a => a.applicantId === filters.applicantId);
            }

            resolve(enrichedApps);
        }, 600);
    });
}

export const applyForJob = async (jobId, applicantId) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const apps = getData(APPLICATIONS_KEY, INITIAL_APPLICATIONS);
            const newApp = {
                id: String(Date.now()),
                jobId,
                applicantId,
                status: 'pending',
                appliedAt: new Date().toISOString().split('T')[0]
            };
            apps.push(newApp);
            setData(APPLICATIONS_KEY, apps);
            resolve(newApp);
        }, 600);
    });
}

// --- STATS ---
export const getSystemStats = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            const users = getData(USERS_KEY, INITIAL_USERS);
            const jobs = getData(JOBS_KEY, INITIAL_JOBS);
            const apps = getData(APPLICATIONS_KEY, INITIAL_APPLICATIONS);

            resolve({
                totalUsers: users.length,
                totalJobs: jobs.length,
                activeJobs: jobs.filter(j => j.status === 'active').length,
                totalApplications: apps.length
            });
        }, 400);
    });
}

// --- LOGS & ANALYTICS ---

export const getSystemLogs = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, user: "Sarah Smith", action: "Posted a new job", role: "recruiter", date: "2 mins ago", status: "Success" },
                { id: 2, user: "John Doe", action: "Updated profile", role: "agent", date: "15 mins ago", status: "Success" },
                { id: 3, user: "Mike Johnson", action: "Failed login attempt", role: "agent", date: "1 hour ago", status: "Failed" },
                { id: 4, user: "Emma Wilson", action: "Registered", role: "recruiter", date: "2 hours ago", status: "Success" },
                { id: 5, user: "Alex Brown", action: "Deleted job post", role: "admin", date: "3 hours ago", status: "Success" },
            ]);
        }, 500);
    });
}

