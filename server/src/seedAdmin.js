require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.model');
const connectDB = require('./config/db');

(async () => {
    try {
        await connectDB();

        const email = "admin@linkro.com";
        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log("Admin user already exists.");

            // Optional: Reset password if it exists but credentials are wrong
            // const salt = await bcrypt.genSalt(10);
            // userExists.password = await bcrypt.hash("password", salt);
            // await userExists.save();
            // console.log("Admin password reset to 'password'");

        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("password", salt);

            await User.create({
                name: "Admin User",
                email: email,
                password: hashedPassword,
                role: "admin",
                status: "active"
            });
            console.log("Admin user created successfully.");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error seeding admin:", error);
        process.exit(1);
    }
})();
