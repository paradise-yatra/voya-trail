import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import User from '../models/User';
import TourPackage from '../models/TourPackage';
import TourCategory from '../models/TourCategory';
import Destination from '../models/Destination';
import Amenity from '../models/Amenity';

dotenv.config();

const checkDb = async () => {
    try {
        console.log('\n🔍 MONGODB DATA DIAGNOSTICS 🔍\n');
        
        // Connect to database
        await connectDB();
        
        const usersCount = await User.countDocuments();
        const toursCount = await TourPackage.countDocuments();
        const categoriesCount = await TourCategory.countDocuments();
        const destinationsCount = await Destination.countDocuments();
        const amenitiesCount = await Amenity.countDocuments();

        console.log('\n📊 Collection Counts:');
        console.log(`  👥 Users: ${usersCount}`);
        console.log(`  📦 Tour Packages: ${toursCount}`);
        console.log(`  📂 Tour Categories: ${categoriesCount}`);
        console.log(`  📍 Destinations: ${destinationsCount}`);
        console.log(`  ✨ Amenities: ${amenitiesCount}\n`);

        if (usersCount === 0) {
            console.log('⚠️  Warning: No user accounts found. You need to create an admin account to login.');
        } else {
            console.log('👤 Users list:');
            const users = await User.find({}, 'email name role');
            users.forEach(u => console.log(`  - ${u.name} (${u.email}) [${u.role}]`));
        }

        if (toursCount === 0 && categoriesCount === 0) {
            console.log('\n💡 Tip: Your database is empty. You can add categories and tour packages via the admin panel at http://localhost:3000/admin after logging in.');
        }

        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Diagnostics Error:', error.message);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

checkDb();
