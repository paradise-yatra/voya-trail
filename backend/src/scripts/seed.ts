import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import TourCategory from '../models/TourCategory';
import Destination from '../models/Destination';
import Amenity from '../models/Amenity';
import TourPackage from '../models/TourPackage';
import User from '../models/User';

dotenv.config();

const seedData = async () => {
    try {
        console.log('\n🌱 SEEDING DATABASE - PARADISE YATRA 🌱\n');

        await connectDB();

        // 1. Clear existing data
        console.log('🧹 Clearing old users, tours, categories, destinations, and amenities...');
        await TourPackage.deleteMany({});
        await TourCategory.deleteMany({});
        await Destination.deleteMany({});
        await Amenity.deleteMany({});
        await User.deleteMany({});
        console.log('✅ Collection cleanup completed.');

        // 2. Create Default Admin User
        console.log('\n🔐 Seeding Admin User...');
        const adminUser = await User.create({
            email: 'admin@voyatrail.com',
            password: 'password123',
            name: 'Admin User',
            role: 'admin'
        });
        console.log(`✅ Created Admin User: ${adminUser.email} / password123`);

        // 2. Create Amenities
        console.log('\n✨ Seeding Amenities...');
        const amenities = await Amenity.insertMany([
            { label: 'Free Wi-Fi', iconKey: 'Wifi', isActive: true },
            { label: 'Luxury Stay', iconKey: 'Hotel', isActive: true },
            { label: 'Expert Guide', iconKey: 'UserCheck', isActive: true },
            { label: 'Private Transport', iconKey: 'Car', isActive: true },
            { label: 'Daily Breakfast', iconKey: 'Coffee', isActive: true },
            { label: 'Sightseeing', iconKey: 'Compass', isActive: true }
        ]);
        console.log(`✅ Created ${amenities.length} amenities.`);

        // 3. Create Destinations
        console.log('\n📍 Seeding Destinations...');
        const destinations = await Destination.insertMany([
            { name: 'Kerala', slug: 'kerala', description: 'God\'s Own Country', isActive: true },
            { name: 'Jaipur', slug: 'jaipur', description: 'The Pink City of India', isActive: true },
            { name: 'Varanasi', slug: 'varanasi', description: 'The Spiritual Capital of India', isActive: true },
            { name: 'Delhi', slug: 'delhi', description: 'The Historic Capital', isActive: true },
            { name: 'Bangkok', slug: 'bangkok', description: 'Vibrant city life in Thailand', isActive: true },
            { name: 'Phuket', slug: 'phuket', description: 'Beautiful beaches and island life', isActive: true }
        ]);
        console.log(`✅ Created ${destinations.length} destinations.`);

        // 4. Create Tour Categories
        console.log('\n📂 Seeding Tour Categories...');
        const catIndia = await TourCategory.create({
            name: 'India Tours',
            slug: 'india',
            description: 'Explore the vibrant culture, spiritual heritage, and stunning landscapes of India.',
            isActive: true
        });

        const catThailand = await TourCategory.create({
            name: 'Thailand Tours',
            slug: 'thailand-tours',
            description: 'Discover tropical beaches, royal palaces, ancient ruins, and ornate temples.',
            isActive: true
        });
        console.log('✅ Created India and Thailand Tour Categories.');

        // 5. Create Tour Packages
        console.log('\n📦 Seeding Tour Packages...');

        const packagesData = [
            {
                title: 'Kerala Backwaters & Houseboat Escape',
                slug: 'kerala-backwaters-houseboat',
                subtitle: 'Relax in the serene backwaters of Alleppey and Kumarakom',
                category: catIndia._id,
                duration: { nights: 4, days: 5 },
                startingPrice: 24999,
                priceCurrency: 'INR',
                priceUnit: 'per person',
                locations: ['Kerala'],
                highlights: [
                    'Overnight stay in a private luxury houseboat',
                    'Explore Munnar tea gardens and waterfalls',
                    'Guided spice plantation walk in Thekkady',
                    'Watch traditional Kathakali dance performance'
                ],
                overview: {
                    title: 'Kerala Backwaters Delight',
                    description: 'Escape to Kerala, God\'s Own Country. This 5-day tour takes you through the lush tea gardens of Munnar, wildlife experiences in Thekkady, and culminates in a magical overnight houseboat cruise along the serene backwaters of Alleppey.',
                    durationLabel: '5 Days / 4 Nights',
                    groupSize: '2 - 12 travelers',
                    guide: 'Local English-speaking guides',
                    languages: 'English, Hindi, Malayalam'
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[3]._id, amenities[4]._id],
                itinerary: [
                    {
                        dayNumber: 1,
                        title: 'Arrive in Cochin & Transfer to Munnar',
                        shortTitle: 'Arrival & Munnar Transfer',
                        description: 'Arrive at Cochin airport. Meet our representative and drive to Munnar. En route, enjoy the view of Cheeyappara and Valara waterfalls. Check-in to your resort in Munnar and spend the evening at leisure.',
                        experiences: ['Waterfall sightseeing', 'Scenic road trip'],
                        images: ['https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 2,
                        title: 'Munnar Sightseeing Tour',
                        shortTitle: 'Munnar Exploration',
                        description: 'After breakfast, embark on a full-day sightseeing tour of Munnar. Visit Mattupetty Dam, Kundala Lake, Echo Point, and the Tea Museum. Learn about the history of tea cultivation in the region.',
                        experiences: ['Tea plantation walk', 'Boating at Kundala Lake', 'Photo sessions'],
                        images: ['https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 3,
                        title: 'Munnar to Thekkady Wild Life Sanctuary',
                        shortTitle: 'Thekkady Spice Tour',
                        description: 'Drive from Munnar to Thekkady. Check-in to your hotel. In the afternoon, visit a spice plantation to see cardamom, pepper, vanilla, and coffee plantations. Enjoy an optional boat cruise on Periyar Lake.',
                        experiences: ['Spice plantation tour', 'Periyar wildlife viewing'],
                        images: ['https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 4,
                        title: 'Thekkady to Alleppey Houseboat Stay',
                        shortTitle: 'Houseboat Experience',
                        description: 'Drive to Alleppey and board your private luxury houseboat. Glide past coconut groves, paddy fields, and local villages. Enjoy freshly cooked traditional Keralan meals on board.',
                        experiences: ['Houseboat cruise', 'Backwater photography', 'Traditional meals'],
                        images: ['https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 5,
                        title: 'Alleppey to Cochin Departure',
                        shortTitle: 'Departure',
                        description: 'Enjoy breakfast on the houseboat, then disembark at Alleppey. Drive back to Cochin Airport/Railway Station for your onward journey.',
                        experiences: ['Farewell shopping in Cochin'],
                        images: ['https://images.unsplash.com/photo-1590001155093-a3c66ab0c3ff?auto=format&fit=crop&w=800&q=80']
                    }
                ],
                inclusions: [
                    'Accommodations in 4-star hotels & luxury houseboat',
                    'All breakfasts & all meals on board the houseboat',
                    'Private AC sedan for transfers and sightseeing',
                    'Spice plantation entry fees'
                ],
                exclusions: [
                    'Airfare or Train tickets',
                    'Lunch & dinner (except on the houseboat)',
                    'Tips, laundry, and personal expenses',
                    'Optional activities (boating, elephant rides)'
                ],
                travelStyle: 'Leisure & Romantic',
                bestTimeToVisit: 'October to March',
                faq: [
                    { question: 'Is the houseboat stay private?', answer: 'Yes, the houseboat is reserved exclusively for you with its own dedicated captain and chef.' },
                    { question: 'Will I see wild animals in Thekkady?', answer: 'Yes, during the Periyar lake boat cruise, you can frequently spot wild elephants, bison, and various bird species along the banks.' }
                ],
                notes: [
                    'Houseboat AC operates from 9:00 PM to 6:00 AM only.',
                    'Carry comfortable walking shoes for Munnar and Thekkady.'
                ],
                images: {
                    hero: { publicId: 'kerala_hero', url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80', alt: 'Kerala Backwaters Houseboat' },
                    gallery: [
                        { publicId: 'k1', url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80', alt: 'Munnar Tea Gardens' },
                        { publicId: 'k2', url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', alt: 'Alleppey River' }
                    ]
                },
                seo: {
                    metaTitle: 'Kerala Backwaters & Munnar Tour Package | Paradise Yatra',
                    metaDescription: 'Book our 5-day luxury Kerala Backwaters tour package. Experience Munnar tea hills, Thekkady wildlife, and an Alleppey houseboat stay.',
                    metaKeywords: ['kerala package', 'houseboat tour', 'munnar tour', 'paradise yatra'],
                    canonicalUrl: 'http://localhost:3000/india/kerala-backwaters-houseboat'
                },
                status: 'published'
            },
            {
                title: 'Royal Rajasthan Golden Triangle Tour',
                slug: 'golden-triangle-rajasthan',
                subtitle: 'Discover Delhi, Agra, and Jaipur in a majestic 6-day journey',
                category: catIndia._id,
                duration: { nights: 5, days: 6 },
                startingPrice: 32999,
                priceCurrency: 'INR',
                priceUnit: 'per person',
                locations: ['Delhi', 'Jaipur'],
                highlights: [
                    'Guided tour of Taj Mahal in Agra at sunrise',
                    'Explore historic monuments in Old and New Delhi',
                    'Visit the majestic Amber Fort in Jaipur',
                    'Stay in a heritage palace hotel in Jaipur'
                ],
                overview: {
                    title: 'Golden Triangle Tour',
                    description: 'The Golden Triangle is India\'s most iconic tourist circuit, connecting the historic capital Delhi, the monument of love Agra, and the royal city Jaipur. This tour offers a perfect introduction to India\'s rich history and architectural heritage.',
                    durationLabel: '6 Days / 5 Nights',
                    groupSize: '4 - 15 travelers',
                    guide: 'Certified Monument Guides',
                    languages: 'English, Hindi, French, Spanish'
                },
                amenityIds: [amenities[1]._id, amenities[2]._id, amenities[3]._id, amenities[4]._id, amenities[5]._id],
                itinerary: [
                    {
                        dayNumber: 1,
                        title: 'Arrive in Delhi & Heritage Walk',
                        shortTitle: 'Delhi Arrival',
                        description: 'Arrive at Indira Gandhi International Airport, Delhi. Transfer to your hotel. In the afternoon, visit Qutub Minar, Humayun\'s Tomb, and drive past India Gate and Parliament House.',
                        experiences: ['Heritage sightseeing', 'Delhi street food tasting'],
                        images: ['https://images.unsplash.com/photo-1668270146059-e93ddc078028?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 2,
                        title: 'Delhi to Agra & Taj Mahal Sunset',
                        shortTitle: 'Agra Transfer & Taj Mahal',
                        description: 'Drive to Agra via Yamuna Expressway. Check-in to hotel. Late afternoon, visit the magnificent Agra Fort and watch the sunset over the Taj Mahal from Mehtab Bagh.',
                        experiences: ['Agra Fort visit', 'Taj Mahal sunset viewing'],
                        images: ['https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 3,
                        title: 'Sunrise at Taj Mahal & Drive to Jaipur',
                        shortTitle: 'Agra to Jaipur via Fatehpur Sikri',
                        description: 'Visit the Taj Mahal at sunrise. Return to hotel for breakfast. Check-out and drive to Jaipur, visiting the ghost city Fatehpur Sikri and the Abhaneri stepwells along the way.',
                        experiences: ['Taj Mahal sunrise', ' Fatehpur Sikri tour'],
                        images: ['https://images.unsplash.com/photo-1545231027-63b3f1e37be1?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 4,
                        title: 'Full Day Jaipur Sightseeing',
                        shortTitle: 'Jaipur Palaces & Forts',
                        description: 'Visit the Amber Fort, taking a jeep ride to the entrance. Later, visit Hawa Mahal (Palace of Winds), City Palace, and Jantar Mantar observatory.',
                        experiences: ['Fort exploration', 'City Palace tour', 'Local bazaar shopping'],
                        images: ['https://images.unsplash.com/photo-1477584322817-449eb5793e27?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 5,
                        title: 'Royal Village Experience & Dinner',
                        shortTitle: 'Jaipur Village Experience',
                        description: 'Spend the morning at leisure or explore local craft villages. In the evening, enjoy a traditional Rajasthani dinner with cultural folk dance performances.',
                        experiences: ['Folk dance show', ' Rajasthani cuisine feast'],
                        images: ['https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 6,
                        title: 'Jaipur to Delhi Departure',
                        shortTitle: 'Departure',
                        description: 'After breakfast, check-out and drive back to Delhi. You will be transferred to airport for your flight back home.',
                        experiences: ['Departure transfers'],
                        images: ['https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80']
                    }
                ],
                inclusions: [
                    '5 Nights accommodation in selected luxury hotels',
                    'Daily buffet breakfast',
                    'Private AC Innova Crysta for all transfers & tours',
                    'Monument entrance fees and expert monument guides'
                ],
                exclusions: [
                    'Camera fees at monuments',
                    'Meals other than breakfasts',
                    'Tips for guide and driver'
                ],
                travelStyle: 'Cultural & Historical',
                bestTimeToVisit: 'October to April',
                faq: [
                    { question: 'Is the Taj Mahal closed on any day?', answer: 'Yes, the Taj Mahal is closed every Friday for prayers.' },
                    { question: 'What should I wear at monuments?', answer: 'Dress modestly, especially at active places of worship where shoulders and knees should be covered. Removing shoes is required at temple interiors.' }
                ],
                notes: [
                    'Taj Mahal sunrise timing is subject to seasonal changes and weather conditions (fog in winter).',
                    'Shopping guides in Jaipur are optional, please verify authenticity of gems and textiles.'
                ],
                images: {
                    hero: { publicId: 'rajasthan_hero', url: 'https://images.unsplash.com/photo-1477584322817-449eb5793e27?auto=format&fit=crop&w=1200&q=80', alt: 'Amber Fort Jaipur' },
                    gallery: [
                        { publicId: 'r1', url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80', alt: 'Taj Mahal Agra' },
                        { publicId: 'r2', url: 'https://images.unsplash.com/photo-1668270146059-e93ddc078028?auto=format&fit=crop&w=800&q=80', alt: 'Qutub Minar Delhi' }
                    ]
                },
                seo: {
                    metaTitle: 'Golden Triangle Tour India | Delhi, Agra & Jaipur Package',
                    metaDescription: 'Embark on a majestic 6-day Golden Triangle tour. Experience India\'s history in Delhi, the beauty of the Taj Mahal in Agra, and Jaipur\'s forts.',
                    metaKeywords: ['golden triangle tour', 'taj mahal tour', 'jaipur package', 'rajasthan tour'],
                    canonicalUrl: 'http://localhost:3000/india/golden-triangle-rajasthan'
                },
                status: 'published'
            },
            {
                title: 'Valley of Flowers & Uttarakhand Himalayan Escape',
                slug: 'valley-of-flowers-uttarakhand',
                subtitle: 'Trek the pristine Valley of Flowers and explore the spiritual heart of Uttarakhand',
                category: catIndia._id,
                duration: { nights: 6, days: 7 },
                startingPrice: 43999,
                priceCurrency: 'INR',
                priceUnit: 'per person',
                locations: ['Uttarakhand', 'Badrinath', 'Rudraprayag'],
                highlights: [
                    'Trek through the UNESCO-listed Valley of Flowers',
                    'Witness the Ganga Aarti in Rishikesh or Haridwar',
                    'Visit the sacred shrine of Badrinath',
                    'Experience alpine meadows and Himalayan cuisine'
                ],
                overview: {
                    title: 'Valley of Flowers Adventure',
                    description: 'Discover Uttarakhand\'s high-altitude paradise with a guided trek to the Valley of Flowers, combined with spiritual visits and scenic Himalayan drives. This 7-day escape blends nature, culture, and comfort.',
                    durationLabel: '7 Days / 6 Nights',
                    groupSize: '4 - 12 travelers',
                    guide: 'Experienced Himalayan Trek Guide',
                    languages: 'English, Hindi'
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[2]._id, amenities[4]._id, amenities[5]._id],
                itinerary: [
                    {
                        dayNumber: 1,
                        title: 'Arrive Delhi and transfer to Haridwar',
                        shortTitle: 'Delhi to Haridwar',
                        description: 'Arrive in Delhi and transfer by luxury coach to Haridwar. Check in to your hotel and attend the evening Ganga Aarti at Har Ki Pauri.',
                        experiences: ['Ganga Aarti', 'Haridwar evening stroll'],
                        images: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 2,
                        title: 'Haridwar to Joshimath via Devprayag',
                        shortTitle: 'Devprayag & Joshimath',
                        description: 'Travel through the confluence of rivers at Devprayag and drive to Joshimath. Enjoy views of the majestic Himalayas en route.',
                        experiences: ['River confluence visit', 'Mountain drive'],
                        images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 3,
                        title: 'Trek to Ghangaria - Base for Valley of Flowers',
                        shortTitle: 'Ghangaria Trek',
                        description: 'Begin your trek from Govindghat to Ghangaria, following alpine trails and charming villages. Overnight stay in a comfortable guesthouse in Ghangaria.',
                        experiences: ['Trek through meadows', 'Village walk'],
                        images: ['https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 4,
                        title: 'Valley of Flowers Trek',
                        shortTitle: 'Valley of Flowers',
                        description: 'Explore the spectacular Valley of Flowers, known for its vibrant alpine blooms, pristine streams, and panoramic Himalayan vistas.',
                        experiences: ['Guided valley trek', 'Flora photography'],
                        images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 5,
                        title: 'Hemkund Sahib Pilgrimage & Back to Ghangaria',
                        shortTitle: 'Hemkund Sahib',
                        description: 'Visit the sacred lake shrine of Hemkund Sahib (seasonal), then return to Ghangaria for an overnight stay.',
                        experiences: ['Pilgrimage visit', 'Mountain views'],
                        images: ['https://images.unsplash.com/photo-1477584322817-449eb5793e27?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 6,
                        title: 'Ghangaria to Joshimath and Badrinath',
                        shortTitle: 'Badrinath Visit',
                        description: 'Trek back to Govindghat and drive to Badrinath. Visit the famous Badrinath Temple and enjoy hot spring baths.',
                        experiences: ['Temple darshan', 'Hot springs'],
                        images: ['https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 7,
                        title: 'Depart Badrinath to Delhi',
                        shortTitle: 'Delhi Departure',
                        description: 'Leave Badrinath after breakfast and drive back to Delhi for your onward flight. Enjoy scenic Himalayan views on the way.',
                        experiences: ['Scenic return drive', 'Departure transfer'],
                        images: ['https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80']
                    }
                ],
                inclusions: [
                    'Deluxe hotel accommodation and guesthouse stays',
                    'All breakfasts, selected meals, and snacks',
                    'Private AC transfers and mountain permits',
                    'Guided Valley of Flowers trek and local expert guide'
                ],
                exclusions: [
                    'Airfare or rail tickets to Delhi',
                    'Personal expenses and porter charges',
                    'Meals not specified in the itinerary',
                    'Tips and insurance'
                ],
                travelStyle: 'Nature & Spiritual',
                bestTimeToVisit: 'July to September',
                faq: [
                    { question: 'Is the Valley of Flowers trek difficult?', answer: 'The trek is moderate and suitable for travelers with good fitness. The trail is well-defined and supported by porter services.', },
                    { question: 'Will I need a permit for Hemkund Sahib?', answer: 'Yes, entry permits are arranged as part of the package and included in the itinerary.' }
                ],
                notes: [
                    'Carry warm clothes for high-altitude nights.',
                    'The Valley of Flowers is open only during the monsoon season, typically July to September.'
                ],
                images: {
                    hero: { publicId: 'uttarakhand_hero', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', alt: 'Valley of Flowers Uttarakhand' },
                    gallery: [
                        { publicId: 'u1', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', alt: 'Valley of Flowers trek' },
                        { publicId: 'u2', url: 'https://images.unsplash.com/photo-1477584322817-449eb5793e27?auto=format&fit=crop&w=800&q=80', alt: 'Badrinath temple' }
                    ]
                },
                seo: {
                    metaTitle: 'Valley of Flowers Tour Package | Uttarakhand Himalayas',
                    metaDescription: 'Discover the Valley of Flowers and the spiritual beauty of Uttarakhand on a 7-day Himalayan escape with expert guide and comfortable stays.',
                    metaKeywords: ['valley of flowers tour', 'uttarakhand package', 'badrinath tour', 'hemkund sahib'],
                    canonicalUrl: 'http://localhost:3000/india/valley-of-flowers-uttarakhand'
                },
                status: 'published'
            },
            {
                title: 'Tropical Thailand Bangkok & Phuket Explorer',
                slug: 'thailand-bangkok-phuket',
                subtitle: 'Temples, street food, and pristine beaches in a 6-day package',
                category: catThailand._id,
                duration: { nights: 5, days: 6 },
                startingPrice: 38500,
                priceCurrency: 'INR',
                priceUnit: 'per person',
                locations: ['Bangkok', 'Phuket'],
                highlights: [
                    'Visit Grand Palace and Wat Phra Kaew in Bangkok',
                    'Private speedboat cruise to Phi Phi Islands',
                    'Enjoy shopping and street food in Bangkok night markets',
                    'Guided city tour of Phuket Old Town'
                ],
                overview: {
                    title: 'Thailand Explorer',
                    description: 'Experience the best of both worlds in Thailand: the bustling, vibrant capital city Bangkok, followed by the tranquil sandy beaches and crystal-clear waters of Phuket. This 6-day tour is ideal for families, couples, and friends seeking adventure and relaxation.',
                    durationLabel: '6 Days / 5 Nights',
                    groupSize: '2 - 10 travelers',
                    guide: 'English-speaking Tour Leader',
                    languages: 'English, Thai'
                },
                amenityIds: [amenities[0]._id, amenities[1]._id, amenities[2]._id, amenities[3]._id, amenities[4]._id, amenities[5]._id],
                itinerary: [
                    {
                        dayNumber: 1,
                        title: 'Welcome to Bangkok',
                        shortTitle: 'Bangkok Arrival',
                        description: 'Arrive at Suvarnabhumi Airport, Bangkok. Meet our representative and transfer to hotel. In the evening, take a dinner cruise along the Chao Phraya River, viewing illuminated temples.',
                        experiences: ['Airport transfer', 'Chao Phraya dinner cruise'],
                        images: ['https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 2,
                        title: 'Grand Palace & Bangkok Temples',
                        shortTitle: 'Bangkok Temples',
                        description: 'Visit the Grand Palace, the official residence of the Kings of Siam. Discover the Temple of the Emerald Buddha. In the afternoon, visit Wat Pho (Temple of Reclining Buddha) and Wat Arun (Temple of Dawn).',
                        experiences: ['Temple history tour', 'Tuk-tuk ride'],
                        images: ['https://images.unsplash.com/photo-1563492065561-7690f38a63e6?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 3,
                        title: 'Fly to Phuket & Sunset at Promthep Cape',
                        shortTitle: 'Flight to Phuket',
                        description: 'Check-out from Bangkok hotel and transfer to airport for flight to Phuket. Check-in to your beach resort. In the evening, drive to Promthep Cape for a breath-taking sunset view.',
                        experiences: ['Domestic flight', 'Promthep Cape sunset'],
                        images: ['https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 4,
                        title: 'Phi Phi Islands Speedboat Tour',
                        shortTitle: 'Phi Phi Islands Cruise',
                        description: 'Embark on a full-day speedboat excursion to Phi Phi Islands. Swim in Maya Bay (featured in the movie "The Beach"), snorkel at Coral Bay, and enjoy buffet lunch on Phi Phi Don island.',
                        experiences: ['Speedboat cruising', 'Snorkeling', 'Island exploring'],
                        images: ['https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 5,
                        title: 'Phuket City Tour & Leisure Time',
                        shortTitle: 'Phuket Exploration',
                        description: 'Discover Phuket Old Town with its colonial Sino-Portuguese architecture. Visit Wat Chalong temple and the Big Buddha. Spend the afternoon shopping or relaxing on Patong Beach.',
                        experiences: ['Cultural city tour', 'Beach leisure time'],
                        images: ['https://images.unsplash.com/photo-1540979388789-6eca280c4c5b?auto=format&fit=crop&w=800&q=80']
                    },
                    {
                        dayNumber: 6,
                        title: 'Phuket Departure',
                        shortTitle: 'Departure',
                        description: 'After breakfast, transfer to Phuket International Airport for your return flight home.',
                        experiences: ['Departure airport transfer'],
                        images: ['https://images.unsplash.com/photo-1538964173425-93884d739596?auto=format&fit=crop&w=800&q=80']
                    }
                ],
                inclusions: [
                    '2 Nights in Bangkok, 3 Nights in Phuket (4-star beach resorts)',
                    'Daily breakfast & lunch during Phi Phi islands tour',
                    'Speedboat cruise to Phi Phi Islands with snorkeling gear',
                    'All airport transfers and city sightseeing in private vehicles'
                ],
                exclusions: [
                    'International airfare',
                    'Domestic flight Bangkok to Phuket (approx. ₹3000-5000)',
                    'Thailand tourist visa fees',
                    'National park entry fee at Phi Phi Islands (400 THB per person)'
                ],
                travelStyle: 'Beach & Adventure',
                bestTimeToVisit: 'November to April',
                faq: [
                    { question: 'Is Thailand visa on arrival available for Indian passport holders?', answer: 'Yes, Thailand offers Visa on Arrival or Visa Waiver schemes for Indian passport holders. Please check current rules before booking.' },
                    { question: 'Is the Phi Phi island speedboat safe for children?', answer: 'Yes, life jackets are provided for all passengers. However, speedboats can be bumpy, so pregnant women or people with back issues are advised to take a ferry instead.' }
                ],
                notes: [
                    'Ensure passport has at least 6 months validity from travel date.',
                    'Phi Phi island tour is weather dependent. In case of rough seas, alternative tours will be offered.'
                ],
                images: {
                    hero: { publicId: 'thailand_hero', url: 'https://images.unsplash.com/photo-1537956965359-7573183d1f57?auto=format&fit=crop&w=1200&q=80', alt: 'Phi Phi Islands Thailand' },
                    gallery: [
                        { publicId: 't1', url: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80', alt: 'Bangkok Skyline' },
                        { publicId: 't2', url: 'https://images.unsplash.com/photo-1563492065561-7690f38a63e6?auto=format&fit=crop&w=800&q=80', alt: 'Wat Arun Bangkok' }
                    ]
                },
                seo: {
                    metaTitle: 'Thailand Tour Package | Bangkok & Phuket Tour',
                    metaDescription: 'Book our 6-day Thailand tour package covering Bangkok temples and Phuket beaches. Includes Phi Phi island tour, transfers, and guide.',
                    metaKeywords: ['thailand tour', 'phuket package', 'bangkok package', 'phi phi island'],
                    canonicalUrl: 'http://localhost:3000/thailand-tours/thailand-bangkok-phuket'
                },
                status: 'published'
            }
        ];

        const seededPackages = await TourPackage.insertMany(packagesData);
        console.log(`✅ Created ${seededPackages.length} tour packages.`);

        console.log('\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY! 🎉\n');
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
