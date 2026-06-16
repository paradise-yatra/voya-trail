import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import connectDB from '../config/db';
import TourCategory from '../models/TourCategory';
import TourPackage from '../models/TourPackage';
import User from '../models/User';
import Amenity from '../models/Amenity';
import Destination from '../models/Destination';

dotenv.config();

const getIconKey = (label: string): string => {
    const l = label.toLowerCase();
    if (l.includes('wifi') || l.includes('wi-fi')) return 'Wifi';
    if (l.includes('hotel') || l.includes('stay') || l.includes('accommodation') || l.includes('resort')) return 'Hotel';
    if (l.includes('guide') || l.includes('escort')) return 'UserCheck';
    if (l.includes('transfer') || l.includes('transport') || l.includes('car') || l.includes('drive') || l.includes('cab')) return 'Car';
    if (l.includes('breakfast') || l.includes('coffee') || l.includes('tea')) return 'Coffee';
    if (l.includes('sightseeing') || l.includes('compass') || l.includes('tour') || l.includes('visit')) return 'Compass';
    if (l.includes('lunch') || l.includes('dinner') || l.includes('meal') || l.includes('food')) return 'Utensils';
    if (l.includes('ticket') || l.includes('entrance') || l.includes('fee') || l.includes('permit')) return 'Ticket';
    if (l.includes('flight') || l.includes('air') || l.includes('plane')) return 'Plane';
    return 'Compass';
};

const seedLivePackages = async () => {
    try {
        console.log('\n🚀 STARTING LIVE PACKAGES DB SEEDING 🚀\n');

        await connectDB();

        // 1. Clear existing data
        console.log('🧹 Clearing old database collections...');
        await TourPackage.deleteMany({});
        await TourCategory.deleteMany({});
        await Amenity.deleteMany({});
        await Destination.deleteMany({});
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

        // 3. Read live-packages.json
        const livePackagesPath = path.join(__dirname, '../../live-packages.json');
        console.log(`📖 Reading live packages data from: ${livePackagesPath}`);
        if (!fs.existsSync(livePackagesPath)) {
            throw new Error(`File not found at: ${livePackagesPath}`);
        }

        let rawData = fs.readFileSync(livePackagesPath, 'utf8');
        // Strip BOM if present
        if (rawData.charCodeAt(0) === 0xFEFF) {
            rawData = rawData.substring(1);
        }
        const parsed = JSON.parse(rawData);
        const rawPackages = parsed.data || [];
        console.log(`📋 Found ${rawPackages.length} packages in JSON file.`);

        // 4. Extract and Seed Unique Categories
        console.log('📂 Seeding categories...');
        const categoriesMap = new Map<string, any>();
        for (const pkg of rawPackages) {
            if (pkg.category && pkg.category._id) {
                categoriesMap.set(pkg.category._id.toString(), {
                    _id: new Types.ObjectId(pkg.category._id),
                    name: pkg.category.name,
                    slug: pkg.category.slug,
                    isActive: true
                });
            }
        }
        const categoriesToInsert = Array.from(categoriesMap.values());
        const insertedCategories = await TourCategory.insertMany(categoriesToInsert);
        console.log(`✅ Seeded ${insertedCategories.length} categories.`);

        // 5. Extract and Seed Unique Amenities
        console.log('✨ Seeding amenities...');
        const amenityLabels = new Set<string>();
        for (const pkg of rawPackages) {
            if (Array.isArray(pkg.amenityIds)) {
                for (const label of pkg.amenityIds) {
                    if (typeof label === 'string' && label.trim()) {
                        amenityLabels.add(label.trim());
                    }
                }
            }
        }
        
        const amenitiesToInsert = Array.from(amenityLabels).map(label => ({
            label,
            iconKey: getIconKey(label),
            isActive: true
        }));
        const insertedAmenities = await Amenity.insertMany(amenitiesToInsert);
        console.log(`✅ Seeded ${insertedAmenities.length} amenities.`);

        const amenityMap = new Map<string, Types.ObjectId>();
        for (const a of insertedAmenities) {
            amenityMap.set(a.label.trim(), a._id as Types.ObjectId);
        }

        // 6. Seed Destinations (from locations)
        console.log('📍 Seeding destinations...');
        const destinationsMap = new Map<string, any>();
        for (const pkg of rawPackages) {
            if (Array.isArray(pkg.locations)) {
                for (const loc of pkg.locations) {
                    if (typeof loc === 'string' && loc.trim()) {
                        const name = loc.trim();
                        const slug = name.toLowerCase().replace(/\s+/g, '-');
                        destinationsMap.set(slug, {
                            name,
                            slug,
                            description: `Tours and packages in ${name}`,
                            isActive: true
                        });
                    }
                }
            }
        }
        const destinationsToInsert = Array.from(destinationsMap.values());
        const insertedDestinations = await Destination.insertMany(destinationsToInsert);
        console.log(`✅ Seeded ${insertedDestinations.length} destinations.`);

        // 7. Prepare Tour Packages Data
        console.log('📦 Preparing packages database records...');
        const preparedPackages = rawPackages.map((pkg: any) => {
            const categoryId = pkg.category && pkg.category._id ? new Types.ObjectId(pkg.category._id) : null;
            
            const mappedAmenityIds = (pkg.amenityIds || []).map((label: string) => {
                return amenityMap.get(label.trim());
            }).filter(Boolean);

            return {
                _id: new Types.ObjectId(pkg._id),
                title: pkg.title,
                slug: pkg.slug,
                subtitle: pkg.subtitle || '',
                category: categoryId,
                duration: pkg.duration || { days: 1, nights: 0 },
                startingPrice: typeof pkg.startingPrice === 'number' ? pkg.startingPrice : 0,
                priceCurrency: pkg.priceCurrency || 'USD',
                priceUnit: pkg.priceUnit || 'per person',
                locations: pkg.locations || [],
                highlights: pkg.highlights || [],
                overview: {
                    title: pkg.overview?.title || pkg.title,
                    description: pkg.overview?.description || '',
                    durationLabel: pkg.overview?.durationLabel || `${pkg.duration?.days || 1} Days / ${pkg.duration?.nights || 0} Nights`,
                    groupSize: pkg.overview?.groupSize || '2-12 Guests',
                    guide: pkg.overview?.guide || 'Private Expert',
                    languages: pkg.overview?.languages || 'English'
                },
                amenityIds: mappedAmenityIds,
                itinerary: (pkg.itinerary || []).map((day: any) => ({
                    dayNumber: day.dayNumber,
                    title: day.title,
                    shortTitle: day.shortTitle || '',
                    description: day.description || '',
                    experiences: day.experiences || [],
                    stay: day.stay ? {
                        name: day.stay.name || '',
                        image: day.stay.image || '',
                        stars: day.stay.stars || 5,
                        location: day.stay.location || '',
                        distances: day.stay.distances || { airport: '', railway: '', cityHeart: '' },
                        cuisine: day.stay.cuisine || '',
                        facilities: day.stay.facilities || []
                    } : undefined,
                    images: day.images || []
                })),
                inclusions: pkg.inclusions || [],
                exclusions: pkg.exclusions || [],
                travelStyle: pkg.travelStyle || '',
                bestTimeToVisit: pkg.bestTimeToVisit || '',
                faq: pkg.faq || [],
                notes: pkg.notes || [],
                images: pkg.images || { gallery: [] },
                mainImage: pkg.mainImage || '',
                galleryImages: pkg.galleryImages || [],
                relatedTours: pkg.relatedTours || [],
                seo: pkg.seo || {
                    metaTitle: pkg.title,
                    metaDescription: pkg.overview?.description?.slice(0, 160) || '',
                    metaKeywords: [],
                    canonicalUrl: ''
                },
                status: pkg.status || 'published',
                createdAt: pkg.createdAt ? new Date(pkg.createdAt) : new Date(),
                updatedAt: pkg.updatedAt ? new Date(pkg.updatedAt) : new Date()
            };
        });

        // Use raw MongoDB driver connection to insert so validator doesn't strip custom properties
        const db = mongoose.connection.db;
        if (!db) {
            throw new Error('Database connection object is undefined');
        }
        await db.collection('tourpackages').insertMany(preparedPackages);
        console.log(`✅ Seeded ${preparedPackages.length} tour packages into MongoDB.`);

        console.log('\n🎉 ALL LIVE DATA SEEDED SUCCESSFULLY! 🎉\n');
        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Seeding Error:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

seedLivePackages();
