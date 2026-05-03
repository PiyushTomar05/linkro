require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');
const connectDB = require('./config/db');

(async () => {
    try {
        await connectDB();

        const samples = [
            {
                name: "Demo Recruiter",
                email: "recruiter@linkro.com",
                role: "recruiter",
                company: "Tech Corp Inc."
            },
            {
                name: "Demo Agent",
                email: "agent@linkro.com",
                role: "agent",
                skills: ["JavaScript", "React", "Node.js"]
            }
        ];

        for (const sample of samples) {
            const userExists = await User.findOne({ email: sample.email });

            if (userExists) {
                console.log(`${sample.role} already exists.`);
            } else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash("password", salt);

                await User.create({
                    ...sample,
                    password: hashedPassword,
                    status: "active"
                });
                console.log(`${sample.role} created successfully.`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error("Error seeding samples:", error);
        process.exit(1);
    }
})();
