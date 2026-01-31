import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import connectDB from '../config/db';
import * as readline from 'readline';

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = (query: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(query, resolve);
    });
};

const createAdmin = async () => {
    try {
        console.log('\n🔐 Paradise Yatra - Admin User Creation\n');

        // Connect to database
        await connectDB();

        // Get admin details
        const email = await question('Admin Email: ');
        const password = await question('Admin Password (min 8 chars): ');
        const name = await question('Admin Name: ');

        // Validate input
        if (!email || !password || !name) {
            console.error('\n❌ All fields are required!\n');
            process.exit(1);
        }

        if (password.length < 8) {
            console.error('\n❌ Password must be at least 8 characters long!\n');
            process.exit(1);
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            console.error(`\n❌ User with email ${email} already exists!\n`);
            process.exit(1);
        }

        // Create admin user
        const adminUser = await User.create({
            email: email.toLowerCase(),
            password,
            name,
            role: 'admin',
        });

        console.log('\n✅ Admin user created successfully!');
        console.log('\nAdmin Details:');
        console.log(`  📧 Email: ${adminUser.email}`);
        console.log(`  👤 Name: ${adminUser.name}`);
        console.log(`  🔑 Role: ${adminUser.role}`);
        console.log(`  🆔 ID: ${adminUser._id}\n`);

        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Error creating admin user:', error.message);
        process.exit(1);
    } finally {
        rl.close();
        await mongoose.connection.close();
    }
};

createAdmin();
