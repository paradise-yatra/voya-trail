import User from '../models/User';
import TourCategory from '../models/TourCategory';
import Destination from '../models/Destination';
import Amenity from '../models/Amenity';
import TourPackage from '../models/TourPackage';
import BlogPost from '../models/BlogPost';
import { seedBlogs } from './blogSeedData';
import mongoose, { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';

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

export const autoSeedDB = async (): Promise<void> => {
    try {
        const usersCount = await User.countDocuments();
        
        // If there are no users, we assume the database is fresh and needs seeding
        if (usersCount === 0) {
            console.log('🔄 [Auto-Seed] Empty database detected. Seeding live packages data...');

            // 1. Clear any orphaned records in other collections
            await TourPackage.deleteMany({});
            await TourCategory.deleteMany({});
            await Destination.deleteMany({});
            await Amenity.deleteMany({});
            
            // 2. Create Default Admin User
            await User.create({
                email: 'admin@voyatrail.com',
                password: 'password123',
                name: 'Admin User',
                role: 'admin'
            });
            console.log(`🔐 [Auto-Seed] Default admin account created: admin@voyatrail.com / password123`);

            // 3. Read live-packages.json
            const livePackagesPath = path.join(__dirname, '../../live-packages.json');
            if (!fs.existsSync(livePackagesPath)) {
                console.error(`❌ [Auto-Seed] File not found at: ${livePackagesPath}`);
                return;
            }

            let rawData = fs.readFileSync(livePackagesPath, 'utf8');
            // Strip BOM if present
            if (rawData.charCodeAt(0) === 0xFEFF) {
                rawData = rawData.substring(1);
            }

            const parsed = JSON.parse(rawData);
            const rawPackages = parsed.data || [];
            console.log(`📋 [Auto-Seed] Found ${rawPackages.length} packages in JSON file.`);

            // 4. Seed Categories
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
            await TourCategory.insertMany(categoriesToInsert);
            console.log(`📂 [Auto-Seed] Seeded ${categoriesToInsert.length} categories.`);

            // 5. Seed Amenities
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
            console.log(`✨ [Auto-Seed] Seeded ${insertedAmenities.length} amenities.`);

            const amenityMap = new Map<string, Types.ObjectId>();
            for (const a of insertedAmenities) {
                amenityMap.set(a.label.trim(), a._id as Types.ObjectId);
            }

            // 6. Seed Destinations
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
            await Destination.insertMany(destinationsToInsert);
            console.log(`📍 [Auto-Seed] Seeded ${destinationsToInsert.length} destinations.`);

            // 7. Prepare Packages
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

            const db = mongoose.connection.db;
            if (db) {
                await db.collection('tourpackages').insertMany(preparedPackages);
                console.log(`📦 [Auto-Seed] Seeded ${preparedPackages.length} tour packages into MongoDB.`);
            } else {
                throw new Error('Database connection object is undefined');
            }

            console.log('✅ [Auto-Seed] Database successfully populated!');
        }

        // 8. Seeding Blogs (if empty)
        const blogsCount = await BlogPost.countDocuments();
        if (blogsCount === 0) {
            console.log('🔄 [Auto-Seed] BlogPost collection is empty. Seeding blog posts...');
            await BlogPost.insertMany(seedBlogs);
            console.log(`📝 [Auto-Seed] Seeded ${seedBlogs.length} blog posts into MongoDB.`);
        }
    } catch (error: any) {
        console.error('❌ [Auto-Seed] Error during seeding:', error.message);
    }
};
