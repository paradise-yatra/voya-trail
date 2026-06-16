import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import TourCategory from '../models/TourCategory';
import TourPackage from '../models/TourPackage';
import User from '../models/User';
import Destination from '../models/Destination';
import Amenity from '../models/Amenity';

dotenv.config();

const generateItinerary = (numDays: number) => {
    return Array.from({ length: numDays }, (_, i) => ({
        dayNumber: i + 1,
        title: `Day ${i + 1} of Journey`,
        description: `Experience local highlights, sightseeing, and comfortable stays on Day ${i + 1}.`,
        images: []
    }));
};

const seedData = async () => {
    try {
        console.log('\n🌱 SEEDING SPECIFIED USER DATA 🌱\n');

        await connectDB();

        // 1. Clear existing data
        console.log('🧹 Clearing old collections...');
        await TourPackage.deleteMany({});
        await TourCategory.deleteMany({});
        await Destination.deleteMany({});
        await Amenity.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Cleanup completed.');

        // 2. Create Default Admin User
        console.log('🔐 Seeding Admin User...');
        const adminUser = await User.create({
            email: 'admin@voyatrail.com',
            password: 'password123',
            name: 'Admin User',
            role: 'admin'
        });
        console.log(`✅ Created Admin User: ${adminUser.email} / password123`);

        // 3. Create Default Amenities & Destinations
        console.log('✨ Seeding Default Amenities & Destinations...');
        const amenities = await Amenity.insertMany([
            { label: 'Free Wi-Fi', iconKey: 'Wifi', isActive: true },
            { label: 'Luxury Stay', iconKey: 'Hotel', isActive: true },
            { label: 'Expert Guide', iconKey: 'UserCheck', isActive: true },
            { label: 'Private Transport', iconKey: 'Car', isActive: true },
            { label: 'Daily Breakfast', iconKey: 'Coffee', isActive: true },
            { label: 'Sightseeing', iconKey: 'Compass', isActive: true }
        ]);
        
        await Destination.insertMany([
            { name: 'Kerala', slug: 'kerala', description: 'God\'s Own Country', isActive: true },
            { name: 'Jaipur', slug: 'jaipur', description: 'The Pink City of India', isActive: true },
            { name: 'Varanasi', slug: 'varanasi', description: 'The Spiritual Capital of India', isActive: true },
            { name: 'Delhi', slug: 'delhi', description: 'The Historic Capital', isActive: true },
            { name: 'Bangkok', slug: 'bangkok', description: 'Vibrant city life in Thailand', isActive: true },
            { name: 'Phuket', slug: 'phuket', description: 'Beautiful beaches and island life', isActive: true }
        ]);

        // 4. Create Specified Tour Categories
        console.log('📂 Seeding Specified Categories...');
        const categories = await TourCategory.insertMany([
            {
                _id: new Types.ObjectId("69831cabb90f9f1285088674"),
                name: "India",
                slug: "india-tours",
                isActive: true
            },
            {
                _id: new Types.ObjectId("698c596c3cee98ef7c93161c"),
                name: "Thailand",
                slug: "thailand-tours",
                isActive: true
            },
            {
                _id: new Types.ObjectId("698c595c3cee98ef7c931617"),
                name: "Nepal",
                slug: "nepal-tours",
                isActive: true
            },
            {
                _id: new Types.ObjectId("698c59473cee98ef7c931612"),
                name: "Bhutan",
                slug: "bhutan-tours",
                isActive: true
            },
            {
                _id: new Types.ObjectId("698c59233cee98ef7c93160b"),
                name: "Bali",
                slug: "bali-tours",
                isActive: true
            }
        ]);
        console.log(`✅ Seeded ${categories.length} categories.`);

        // 5. Create Specified Tour Packages
        console.log('📦 Seeding Specified Tour Packages...');
        
        const packagesData = [
            {
                _id: new Types.ObjectId("698c7fb33cee98ef7c93178d"),
                title: "India Odyssey – Royal Heritage, Wildlife & Spiritual Journey",
                slug: "india-odyssey--royal-heritage-wildlife--spiritual-journey",
                category: new Types.ObjectId("69831cabb90f9f1285088674"),
                locations: ["Delhi", "Agra", "Jaipur", "Ranthambore", "Varanasi"],
                minPeople: 2,
                maxPeople: 12,
                startingPrice: 0,
                priceUnit: "per person",
                mainImage: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/india_odyssey.jpg",
                galleryImages: [
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/gallery1.jpg",
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/gallery2.jpg"
                ],
                duration: { nights: 13, days: 14 },
                overview: {
                    title: "India Odyssey",
                    description: "Embark on an epic 14-day journey experiencing royal heritage, wildlife safaris, and spiritual awakening across India.",
                    durationLabel: "14 Days / 13 Nights",
                    groupSize: "2 - 12 travelers",
                    guide: "Local Expert Guide",
                    languages: "English, Hindi"
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[2]._id, amenities[3]._id, amenities[4]._id, amenities[5]._id],
                itinerary: generateItinerary(14),
                highlights: [],
                inclusions: [],
                exclusions: [],
                notes: [],
                faq: [],
                images: {
                    hero: { publicId: "india_odyssey_hero", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/india_odyssey.jpg" },
                    gallery: [
                        { publicId: "io_g1", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/gallery1.jpg" },
                        { publicId: "io_g2", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772007565/voya-trail/gallery2.jpg" }
                    ]
                },
                seo: {
                    metaTitle: "India Odyssey – Royal Heritage, Wildlife & Spiritual Journey",
                    metaDescription: "Embark on an epic 14-day journey experiencing royal heritage, wildlife safaris, and spiritual awakening across India.",
                    metaKeywords: ["india tours", "india odyssey", "spiritual journey"],
                    canonicalUrl: "http://localhost:3000/india-tours/india-odyssey--royal-heritage-wildlife--spiritual-journey"
                },
                status: "published",
                isActive: true
            },
            {
                _id: new Types.ObjectId("698b22153cee98ef7c9312c1"),
                title: "Highlights of India: Delhi, Agra & Rajasthan",
                slug: "highlights-of-india-delhi-agra--rajasthan",
                category: new Types.ObjectId("69831cabb90f9f1285088674"),
                locations: ["Delhi", "Agra"],
                minPeople: 2,
                maxPeople: 12,
                startingPrice: 0,
                priceUnit: "per person",
                mainImage: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/highlights_india.jpg",
                galleryImages: [
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/gallery1.jpg",
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/gallery2.jpg"
                ],
                duration: { nights: 11, days: 12 },
                overview: {
                    title: "Highlights of India",
                    description: "Discover the best of Delhi, Agra, and the royal state of Rajasthan over 12 days.",
                    durationLabel: "12 Days / 11 Nights",
                    groupSize: "2 - 12 travelers",
                    guide: "Local Expert Guide",
                    languages: "English, Hindi"
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[2]._id, amenities[3]._id, amenities[4]._id],
                itinerary: generateItinerary(12),
                highlights: ["Visit the Taj Mahal at Sunrise", "Explore historic Red Fort", "Private guided Rajasthan tours"],
                inclusions: [],
                exclusions: [],
                notes: [],
                faq: [],
                images: {
                    hero: { publicId: "highlights_india_hero", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/highlights_india.jpg" },
                    gallery: [
                        { publicId: "hi_g1", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/gallery1.jpg" },
                        { publicId: "hi_g2", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772003117/voya-trail/gallery2.jpg" }
                    ]
                },
                seo: {
                    metaTitle: "Highlights of India: Delhi, Agra & Rajasthan",
                    metaDescription: "Discover the best of Delhi, Agra, and the royal state of Rajasthan over 12 days.",
                    metaKeywords: ["india highlights", "delhi tour", "rajasthan package"],
                    canonicalUrl: "http://localhost:3000/india-tours/highlights-of-india-delhi-agra--rajasthan"
                },
                status: "published",
                isActive: true
            },
            {
                _id: new Types.ObjectId("69831eb5b90f9f12850886a8"),
                title: "Signature India Golden Triangle Luxury Tour",
                slug: "signature-india-golden-triangle-luxury-tour",
                category: new Types.ObjectId("69831cabb90f9f1285088674"),
                locations: ["Delhi", "Agra", "Jaipur"],
                minPeople: 2,
                maxPeople: 8,
                startingPrice: 1599,
                priceUnit: "per person",
                mainImage: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/signature_india.jpg",
                galleryImages: [
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/gallery1.jpg",
                    "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/gallery2.jpg"
                ],
                duration: { nights: 6, days: 7 },
                overview: {
                    title: "Golden Triangle Luxury",
                    description: "Experience the ultimate luxury tour of Delhi, Agra, and Jaipur in a personalized 7-day tour.",
                    durationLabel: "7 Days / 6 Nights",
                    groupSize: "2 - 8 travelers",
                    guide: "Local Expert Guide",
                    languages: "English, Hindi"
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[2]._id, amenities[3]._id, amenities[4]._id, amenities[5]._id],
                itinerary: generateItinerary(7),
                highlights: ["Stay in luxury heritage properties", "Sunrise tour of the iconic Taj Mahal", "Jeep ride to Amber Fort"],
                inclusions: [],
                exclusions: [],
                notes: [],
                faq: [],
                images: {
                    hero: { publicId: "signature_india_hero", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/signature_india.jpg" },
                    gallery: [
                        { publicId: "si_g1", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/gallery1.jpg" },
                        { publicId: "si_g2", url: "https://res.cloudinary.com/dop1mi4lg/image/upload/v1772008285/voya-trail/gallery2.jpg" }
                    ]
                },
                seo: {
                    metaTitle: "Signature India Golden Triangle Luxury Tour",
                    metaDescription: "Experience the ultimate luxury tour of Delhi, Agra, and Jaipur in a personalized 7-day tour.",
                    metaKeywords: ["golden triangle", "luxury india", "taj mahal luxury"],
                    canonicalUrl: "http://localhost:3000/india-tours/signature-india-golden-triangle-luxury-tour"
                },
                status: "published",
                isActive: true
            }
        ];

        // Using raw MongoDB driver insert to retain the custom mainImage and other fields safely
        const db = mongoose.connection.db;
        if (db) {
            await db.collection('tourpackages').insertMany(packagesData);
            console.log(`✅ Seeded ${packagesData.length} tour packages into MongoDB.`);
        } else {
            throw new Error('Database connection object is undefined');
        }

        console.log('\n🎉 SPECIFIED DATABASE SEEDING COMPLETED SUCCESSFULLY! 🎉\n');
        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Seeding Error:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

seedData();
