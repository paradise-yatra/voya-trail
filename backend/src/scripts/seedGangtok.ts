import mongoose, { Types } from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import TourPackage from '../models/TourPackage';
import TourCategory from '../models/TourCategory';

dotenv.config();

const seedGangtok = async () => {
    try {
        console.log('\n🚀 SEEDING GANGTOK PACKAGE 🚀\n');

        await connectDB();

        // 1. Find or verify India tours category
        let category = await TourCategory.findOne({ slug: 'india-tours' });
        if (!category) {
            // Fallback: search for 'india' or create one
            category = await TourCategory.findOne({ slug: 'india' });
        }
        
        if (!category) {
            console.log('📂 Creating India Category as fallback...');
            category = await TourCategory.create({
                name: 'India',
                slug: 'india-tours',
                isActive: true
            });
        }

        const categoryId = category._id as Types.ObjectId;
        console.log(`📂 Using Category: ${category.name} (ID: ${categoryId})`);

        // 2. Remove any existing custom-signature-escape package to avoid duplicate slug error
        console.log('🧹 Cleaning up any existing placeholder package...');
        await TourPackage.deleteOne({ slug: 'custom-signature-escape' });

        // 3. Create the Gangtok 6D 5N package
        console.log('📦 Inserting Gangtok package...');
        const newPackage = await TourPackage.create({
            _id: new Types.ObjectId('698f129c6dbbb2c36d4c808f'), // Hex string for unique ID
            title: 'Gangtok 6D 5N',
            slug: 'custom-signature-escape', // Dynamic slug matching the card href
            subtitle: 'Premium Sikkim Himalayan Escape',
            category: categoryId,
            duration: {
                nights: 5,
                days: 6
            },
            startingPrice: 2000,
            priceCurrency: 'USD',
            priceUnit: 'per person',
            locations: ['Gangtok', 'Lachen', 'Lachung'],
            highlights: [
                'Visit the serene Tsomgo Lake and Baba Mandir',
                'Explore the picturesque Yumthang Valley (Valley of Flowers)',
                'Witness stunning views of Mt. Kanchenjunga',
                'Stay in premium mountain retreats',
                'Private transfers in comfortable SUVs'
            ],
            overview: {
                title: 'Gangtok & North Sikkim Premium Escape',
                description: 'Discover the mystical beauty of Gangtok and the dramatic landscapes of North Sikkim on this premium 6 Days / 5 Nights journey. Traverse high-altitude lakes, sacred temples, and lush valleys covered in rhododendrons. Ideal for travelers seeking scenic majesty and cultural tranquility with curated stays and expert local guidance.',
                durationLabel: '6 Days / 5 Nights',
                groupSize: '2-8 Guests',
                guide: 'Private Expert Guide',
                languages: 'English, Hindi'
            },
            amenityIds: [], // Will be empty or populated via backend relations if needed
            itinerary: [
                {
                    dayNumber: 1,
                    title: 'Arrival in Gangtok',
                    description: 'Arrive at Bagdogra Airport (IXB) or NJP Railway Station. Meet your private driver who will transfer you through scenic winding roads along the Teesta River to your premium hotel in Gangtok. Spend the evening relaxing or exploring the Mall Road (MG Marg).',
                    experiences: [
                        'Warm meet & greet',
                        'Scenic drive along Teesta River',
                        'Leisure evening at MG Marg'
                    ],
                    images: []
                },
                {
                    dayNumber: 2,
                    title: 'Gangtok Sightseeing Tour',
                    description: 'Explore the highlights of Gangtok. Visit Rumtek Monastery, Do Drul Chorten Stupa, Namgyal Institute of Tibetology, and the Flower Exhibition Centre. In the afternoon, enjoy panoramic views of the city from the Gangtok Ropeway.',
                    experiences: [
                        'Rumtek Monastery visit',
                        'Tibetan culture immersion',
                        'Gangtok Ropeway cable car ride'
                    ],
                    images: []
                },
                {
                    dayNumber: 3,
                    title: 'Excursion to Tsomgo Lake & Baba Mandir',
                    description: 'Depart early for a day excursion to the sacred, high-altitude Tsomgo Lake (12,400 ft) nestled amidst snowy mountains. Continue to Baba Harbhajan Singh Mandir, a shrine of deep local reverence. Return to Gangtok in the evening.',
                    experiences: [
                        'Tsomgo Lake mountain views',
                        'Yatung Border history briefing',
                        'Baba Mandir shrine visit'
                    ],
                    images: []
                },
                {
                    dayNumber: 4,
                    title: 'Gangtok to Lachen (North Sikkim)',
                    description: 'Travel northwards to the remote mountain village of Lachen (8,800 ft). Stop by Singhik View Point and Bhim Nala Waterfalls along the route. Check in to your premium wooden cabin retreat and prepare for high-altitude valley excursions.',
                    experiences: [
                        'Mountain waterfall viewpoints',
                        'North Sikkim forest drives',
                        'Cabin retreat bonfire'
                    ],
                    images: []
                },
                {
                    dayNumber: 5,
                    title: 'Gurudongmar Lake and drive to Lachung',
                    description: 'Start at dawn to visit Gurudongmar Lake (17,800 ft), one of the highest lakes in the world, with holy crystal-clear waters. Return for lunch and drive to Lachung (8,600 ft) passing through stunning mountain terrain.',
                    experiences: [
                        'Gurudongmar Lake high-altitude valley views',
                        'Snowy peak photography',
                        'Transfer to scenic Lachung'
                    ],
                    images: []
                },
                {
                    dayNumber: 6,
                    title: 'Yumthang Valley & Departure',
                    description: 'Explore Yumthang Valley (11,800 ft), known as the Valley of Flowers. Walk through alpine meadows and natural hot springs. Later, drive back to Gangtok or Bagdogra for your departure journey.',
                    experiences: [
                        'Yumthang Valley alpine trek',
                        'Hot springs thermal experience',
                        'Departure transfer'
                    ],
                    images: []
                }
            ],
            inclusions: [
                '5 Nights premium hotel & retreat accommodation',
                'Breakfast & Dinner daily',
                'All ground transfers & sightseeing in private SUV (Innova/Xylo)',
                'North Sikkim Inner Line Permits (ILP)',
                'Local expert English/Hindi speaking driver & guide'
            ],
            exclusions: [
                'Airfare or Train tickets',
                'Lunches, snacks, and alcoholic beverages',
                'Zero Point excursion fees (optional extra)',
                'Travel insurance'
            ],
            travelStyle: 'Scenic & Cultural',
            bestTimeToVisit: 'March to June, October to December',
            faq: [
                {
                    question: 'Is a permit required for North Sikkim?',
                    answer: 'Yes, Lachen, Lachung, and Gurudongmar Lake are restricted areas. We will fully arrange the Inner Line Permits (ILP) for you.'
                },
                {
                    question: 'Is altitude sickness a concern?',
                    answer: 'Since Gurudongmar Lake is at 17,800 ft, we recommend resting well in Lachen the night before and keeping hydrated. Consult a doctor beforehand if you have cardiac or respiratory issues.'
                }
            ],
            notes: [
                'Permit requirements require 4 passport size photos and photo IDs.',
                'Zero Point travel is subject to weather conditions and can be paid locally.'
            ],
            images: {
                hero: {
                    publicId: 'gangtok-hero',
                    url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
                    alt: 'Gangtok Monastery and Hills'
                },
                gallery: [
                    {
                        publicId: 'gangtok-gallery-1',
                        url: 'https://images.unsplash.com/photo-1616388969587-8196f32388b4?auto=format&fit=crop&w=800&q=80',
                        alt: 'Sikkim Hills'
                    }
                ]
            },
            relatedTours: [],
            seo: {
                metaTitle: 'Gangtok 6D 5N Premium Tour Package | Voya Trail',
                metaDescription: 'Book a premium 6 days Gangtok and North Sikkim tour with Voya Trail. Includes luxury retreats, private SUV transfers, and Inner Line permits.',
                metaKeywords: ['gangtok tour', 'sikkim package', 'north sikkim travel', 'lachen lachung package'],
                canonicalUrl: 'https://voyatrail.com/india-tours/gangtok/custom-signature-escape'
            },
            status: 'published'
        });

        console.log(`\n✨ Gangtok package created successfully! ID: ${newPackage._id}\n`);
        process.exit(0);
    } catch (error: any) {
        console.error('\n❌ Seeding Error:', error.message);
        console.error(error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
    }
};

seedGangtok();
