"use client"

import React from "react"
import Link from "next/link"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Calendar as CalendarIcon,
    MapPin,
    Star,
    Heart,
    Share2,
    ChevronDown,
    Hotel,
    Car,
    UtensilsCrossed,
    Ticket,
    ArrowRight,
    HelpCircle,
} from "lucide-react"
import { HeroGallery } from "@/components/package/HeroGallery"

import { PackageContent } from "@/components/package/PackageContent"
import { RelatedTours } from "@/components/package/RelatedTours"

export default function PackageDetailPage() {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="relative min-h-screen pb-20 bg-[#FAFAFA] text-[#1e293b] antialiased">
            <main className="relative min-h-screen pb-20">
                <HeroGallery
                    images={{
                        main: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80",
                        topRight: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
                        bottomRight: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                    }}
                    title="Taj, Tiger and Tranquility – A tasting menu"
                    location="Delhi • Agra • Ranthambore • Jaipur • Cochin • Kumarakom • Kovalam"
                    duration="14 Days, 13 Nights"
                    people="2-12 People"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "India Tours", href: "/india-tours" },
                        { label: "Taj, Tiger and Tranquility – A tasting menu" },
                    ]}
                />

                {/* Main Content Layout */}
                <div className="relative z-20 max-w-[1280px] mx-auto px-4 md:px-8 pt-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                        {/* Left Column: Details & Itinerary */}
                        <div className="lg:col-span-8 flex flex-col gap-12 pb-12">
                            <PackageContent
                                overview={{
                                    title: "Experience Overview",
                                    description:
                                        "A grand 14-day odyssey that bridges the majestic heritage of North India with the tranquil tropical beauty of the South. From the imperial monuments of Delhi and the eternal Taj Mahal to the wild jungles of Ranthambore and the serene backwaters of Kerala, this journey offers a complete tapestry of India's diverse landscapes and cultures.",
                                    duration: "14 Days",
                                    groupSize: "Max 12 Guests",
                                    guide: "Private Expert",
                                    languages: "English, French",
                                }}
                                amenities={[
                                    {
                                        icon: Hotel,
                                        title: "Luxury Stays",
                                        description: "Handpicked heritage hotels and premium backwater resorts.",
                                    },
                                    {
                                        icon: Car,
                                        title: "Private Transport",
                                        description: "AC vehicle for all transfers and sightseeing.",
                                    },
                                    {
                                        icon: UtensilsCrossed,
                                        title: "Daily Breakfast",
                                        description: "Gourmet breakfast included at all hotels.",
                                    },
                                    {
                                        icon: Ticket,
                                        title: "Domestic Flights",
                                        description: "Included flight from Jaipur to Cochin.",
                                    },
                                ]}
                                roadmap={[
                                    {
                                        day: 1,
                                        title: "Arrive Delhi - Welcome to India",
                                        description:
                                            "Arrive at Delhi's Indira Gandhi International Airport. You are met by an Equinox representative with a traditional and sacred marigold flower garland. Delhi stands as the capital of Modern India, where you can see the mingling of the Old and New India. Use this day to relax and recuperate or explore handcrafted local experiences.",
                                        experiences: ["Traditional Welcome", "Airport Transfer", "Hotel Check-in"],
                                        stay: {
                                            name: "The Imperial, New Delhi",
                                            image: "/hotels/hotel_delhi_pro_1769427140762.png",
                                            stars: 5,
                                            location: "Janpath, New Delhi",
                                            distances: {
                                                airport: "14.5 KM",
                                                railway: "2.8 KM",
                                                cityHeart: "0.5 KM",
                                            },
                                            cuisine: "Multi-cuisine excellence featuring authentic Indian, Pan-Asian, and Continental delicacies.",
                                            facilities: ["Luxury Spa", "Outdoor Pool", "Fitness Center", "24/7 Room Service"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1598333108583-8bc60198bc43?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1564507592333-c60657451ddc?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 2,
                                        title: "Delhi - Imperial Heritage",
                                        description:
                                            "Explore Old Delhi with an exhilarating cycle rickshaw ride through Kinari bazaar, ending at the majestic Jama Masjid. Drive past the Imperial Rajpath, India Gate, and Rashtrapati Bhawan. Visit Qutub Minar, Humayun's Tomb, and the community kitchen at Bangla Sahib Gurdwara.",
                                        experiences: ["Rickshaw Ride", "Jama Masjid Visit", "Heritage Walk"],
                                        stay: {
                                            name: "The Imperial, New Delhi",
                                            image: "/hotels/hotel_delhi_pro_1769427140762.png",
                                            stars: 5,
                                            location: "Janpath, New Delhi",
                                            distances: {
                                                airport: "14.5 KM",
                                                railway: "2.8 KM",
                                                cityHeart: "0.5 KM",
                                            },
                                            cuisine: "Multi-cuisine excellence featuring authentic Indian, Pan-Asian, and Continental delicacies.",
                                            facilities: ["Luxury Spa", "Outdoor Pool", "Fitness Center", "24/7 Room Service"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1597041634447-6cd8822277ad?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 3,
                                        title: "Delhi to Agra - The City of Taj",
                                        description:
                                            "Depart for Agra by road or the Gatiman Express. Visit the Agra Fort, a fine example of Mughal architecture. Explore Itimad-Ud-Daula, fondly known as the 'Baby Taj.' At sunset, witness the long-awaited visit to the Taj Mahal, bathed in the soft light of the evening sun.",
                                        experiences: ["Taj Mahal Sunset Visit", "Agra Fort Tour"],
                                        stay: {
                                            name: "The Oberoi Amarvilas, Agra",
                                            image: "https://images.unsplash.com/photo-1564507592333-c60657451ddc?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Taj East Gate Road, Agra",
                                            distances: {
                                                airport: "12 KM",
                                                railway: "6 KM",
                                                cityHeart: "1 KM",
                                            },
                                            cuisine: "Exquisite dining with views of the Taj Mahal.",
                                            facilities: ["Taj View Rooms", "Luxury Spa", "Outdoor Pool", "Fine Dining"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1564507592333-c60657451ddc?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 4,
                                        title: "Agra to Ranthambore via Fatehpur Sikri",
                                        description:
                                            "Drive to Ranthambore via Fatehpur Sikri, the abandoned Mughal citadel. Arrive in Ranthambore, home to the Royal Bengal Tiger, and prepare for your jungle adventure.",
                                        experiences: ["Fatehpur Sikri Visit", "Jungle Orientation"],
                                        stay: {
                                            name: "Aman-i-Khas, Ranthambore",
                                            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Ranthambore Road, Sawai Madhopur",
                                            distances: {
                                                airport: "180 KM",
                                                railway: "12 KM",
                                                cityHeart: "10 KM",
                                            },
                                            cuisine: "Organic dining with ingredients from the resort's own garden.",
                                            facilities: ["Luxury Tents", "Spa Tent", "Outdoor Pool", "Guided Safaris"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 5,
                                        title: "Ranthambore - Wildlife Safari",
                                        description:
                                            "Early morning and afternoon safaris in Ranthambore National Park. Spot tigers, leopards, and diverse wildlife amidst the ruins of the ancient fort within the park.",
                                        experiences: ["Morning Safari", "Afternoon Safari", "Fort Visit"],
                                        stay: {
                                            name: "Aman-i-Khas, Ranthambore",
                                            image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Ranthambore Road, Sawai Madhopur",
                                            distances: {
                                                airport: "180 KM",
                                                railway: "12 KM",
                                                cityHeart: "10 KM",
                                            },
                                            cuisine: "Organic dining with ingredients from the resort's own garden.",
                                            facilities: ["Luxury Tents", "Spa Tent", "Outdoor Pool", "Guided Safaris"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1615966650071-855b15f29ad1?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1581012733671-91306903c9c5?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 6,
                                        title: "Ranthambore to Jaipur - The Pink City",
                                        description:
                                            "Drive to Jaipur, the capital of Rajasthan. Known as the 'Pink City', it is a treasure trove of Rajput history and architecture. Evening at leisure to explore local markets.",
                                        experiences: ["Scenic Drive", "Bazaar Walk"],
                                        stay: {
                                            name: "Rambagh Palace, Jaipur",
                                            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Bhawani Singh Road, Jaipur",
                                            distances: {
                                                airport: "11 KM",
                                                railway: "4 KM",
                                                cityHeart: "2 KM",
                                            },
                                            cuisine: "Royal Rajasthani cuisine served in a palace setting.",
                                            facilities: ["Palace Gardens", "Heritage Suites", "Outdoor Pool", "Spa"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1602339752474-f77aa7bcaecd?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 7,
                                        title: "Jaipur - Royal Forts & Palaces",
                                        description:
                                            "Explore Amber Fort by jeep, a hilltop fortress of Rajput architecture. Visit the City Palace and the eccentric Jantar Mantar observatory. Participate in the evening aarti ceremony at Govind Devji temple.",
                                        experiences: ["Amber Fort Jeep Safari", "City Palace Tour"],
                                        stay: {
                                            name: "Rambagh Palace, Jaipur",
                                            image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Bhawani Singh Road, Jaipur",
                                            distances: {
                                                airport: "11 KM",
                                                railway: "4 KM",
                                                cityHeart: "2 KM",
                                            },
                                            cuisine: "Royal Rajasthani cuisine served in a palace setting.",
                                            facilities: ["Palace Gardens", "Heritage Suites", "Outdoor Pool", "Spa"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1602339752474-f77aa7bcaecd?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 8,
                                        title: "Jaipur to Cochin - Gateway to the South",
                                        description:
                                            "Fly from Jaipur to Cochin (Kochi), the 'Queen of the Arabian Sea'. Experience the shift from the desert sands of the North to the tropical shores of the South.",
                                        experiences: ["Domestic Flight", "Cochin Orientation"],
                                        stay: {
                                            name: "Brunton Boatyard, Cochin",
                                            image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Fort Kochi, Cochin",
                                            distances: {
                                                airport: "36 KM",
                                                railway: "12 KM",
                                                cityHeart: "0.5 KM",
                                            },
                                            cuisine: "Seafood specialties and colonial-era recipes.",
                                            facilities: ["Harbor View", "Outdoor Pool", "Heritage Architecture", "Spa"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 9,
                                        title: "Cochin - Colonial Charms",
                                        description:
                                            "Visit the Jewish Synagogue, St. Francis Church, and the Dutch Palace. Witness the iconic Chinese Fishing Nets and end the day with a traditional Kathakali dance performance.",
                                        experiences: ["Kathakali Performance", "Heritage Tour"],
                                        stay: {
                                            name: "Brunton Boatyard, Cochin",
                                            image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Fort Kochi, Cochin",
                                            distances: {
                                                airport: "36 KM",
                                                railway: "12 KM",
                                                cityHeart: "0.5 KM",
                                            },
                                            cuisine: "Seafood specialties and colonial-era recipes.",
                                            facilities: ["Harbor View", "Outdoor Pool", "Heritage Architecture", "Spa"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 10,
                                        title: "Cochin to Kumarakom - Backwater Bliss",
                                        description:
                                            "Drive to Kumarakom, the heart of Kerala's backwaters. Relax at your resort and indulge in world-renowned Ayurvedic treatments.",
                                        experiences: ["Ayurvedic Massage", "Resort Relaxation"],
                                        stay: {
                                            name: "Kumarakom Lake Resort",
                                            image: "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Kumarakom, Kerala",
                                            distances: {
                                                airport: "70 KM",
                                                railway: "14 KM",
                                                cityHeart: "2 KM",
                                            },
                                            cuisine: "Authentic Kerala delicacies and fresh backwater seafood.",
                                            facilities: ["Infinity Pool", "Ayurvedic Spa", "Backwater Cruises", "Yoga"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 11,
                                        title: "Kumarakom - Life on the Water",
                                        description:
                                            "Spend a night on a luxury houseboat, sailing gently through the labyrinthine canals of the backwaters. Experience the languid pace of life and traditional delicacies.",
                                        experiences: ["Houseboat Cruise", "Backwater Dining"],
                                        stay: {
                                            name: "Luxury Houseboat",
                                            image: "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Alleppey Backwaters",
                                            distances: {
                                                airport: "85 KM",
                                                railway: "5 KM",
                                                cityHeart: "0 KM",
                                            },
                                            cuisine: "Traditional Kerala meals prepared on board.",
                                            facilities: ["Private Deck", "AC Bedrooms", "On-board Chef", "Canal Views"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1589982840479-8994a08b1d02?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 12,
                                        title: "Kumarakom to Kovalam - Coastal Serenity",
                                        description:
                                            "Drive to Kovalam, a haven of peace and tranquility. Spend your days sunbathing, swimming, or indulging in yoga and Ayurveda by the seaside.",
                                        experiences: ["Coastal Drive", "Beach Relaxation"],
                                        stay: {
                                            name: "The Leela Kovalam",
                                            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Kovalam Beach, Trivandrum",
                                            distances: {
                                                airport: "15 KM",
                                                railway: "14 KM",
                                                cityHeart: "1 KM",
                                            },
                                            cuisine: "Cliff-top dining with panoramic ocean views.",
                                            facilities: ["Private Beach", "Infinity Pool", "Ayurvedic Spa", "Fitness Center"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523741491-517a2a937532?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523278191-995cbcda646b?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 13,
                                        title: "Kovalam - Rejuvenation",
                                        description:
                                            "A full day at leisure in Kovalam. Enjoy the three curve-shaped beaches and the stony outcroppings that form this beautiful coastal resort.",
                                        experiences: ["Yoga Session", "Ayurvedic Treatment"],
                                        stay: {
                                            name: "The Leela Kovalam",
                                            image: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80",
                                            stars: 5,
                                            location: "Kovalam Beach, Trivandrum",
                                            distances: {
                                                airport: "15 KM",
                                                railway: "14 KM",
                                                cityHeart: "1 KM",
                                            },
                                            cuisine: "Cliff-top dining with panoramic ocean views.",
                                            facilities: ["Private Beach", "Infinity Pool", "Ayurvedic Spa", "Fitness Center"],
                                        },
                                        images: [
                                            "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523741491-517a2a937532?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523278191-995cbcda646b?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                    {
                                        day: 14,
                                        title: "Kovalam to Trivandrum - Farewell",
                                        description:
                                            "Last morning in India. Departure transfer to Trivandrum International airport for your flight home, carrying memories of a lifetime.",
                                        experiences: ["Airport Transfer"],
                                        images: [
                                            "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523741491-517a2a937532?auto=format&fit=crop&w=400&q=80",
                                            "https://images.unsplash.com/photo-1590523278191-995cbcda646b?auto=format&fit=crop&w=400&q=80",
                                        ],
                                    },
                                ]}
                            />
                        </div>

                        {/* Right Column: Sticky Sidebar */}
                        <div className="lg:col-span-4 relative">
                            <div className="sticky top-32">
                                <div className="rounded-2xl bg-white border border-[#e2e8f0] p-6 overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-end gap-2 mb-1">
                                            <p className="text-sm text-slate-500 font-medium">Starting from</p>
                                        </div>
                                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-6">
                                            <h3 className="text-3xl font-bold text-[#df2c28]">₹2,10,000</h3>
                                            <span className="text-sm text-slate-500 bg-gray-100 px-2 py-1 rounded">per person</span>
                                        </div>
                                        <form className="space-y-4">
                                            {/* Date Picker Trigger */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Dates</label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-medium px-4 py-6 bg-gray-50 border-gray-200 hover:bg-white hover:border-primary/50 text-slate-900 shadow-none cursor-pointer",
                                                                !date && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-3 h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
                                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={setDate}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>

                                            {/* Guest Dropdown */}
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Guests</label>
                                                <Select>
                                                    <SelectTrigger className="w-full px-4 py-6 bg-gray-50 border-gray-200 hover:bg-white hover:border-primary/50 text-slate-900 shadow-none cursor-pointer">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-slate-400">👥</span>
                                                            <SelectValue placeholder="2 Adults" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="1">1 Adult</SelectItem>
                                                        <SelectItem value="2">2 Adults</SelectItem>
                                                        <SelectItem value="3">3 Adults</SelectItem>
                                                        <SelectItem value="4">4 Adults</SelectItem>
                                                        <SelectItem value="5">5 Adults</SelectItem>
                                                        <SelectItem value="6">6 Adults</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>



                                            {/* CTA */}
                                            <button
                                                className="w-full py-4 px-6 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98]"
                                                type="button"
                                            >
                                                Book This Experience
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                            <div className="text-center">
                                                <p className="text-xs text-slate-400">Free cancellation up to 7 days before trip.</p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Need Help Card */}
                                <div className="mt-6 rounded-xl bg-white p-4 flex items-center gap-4 border border-[#e2e8f0]">
                                    <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <HelpCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">Need customization?</p>
                                        <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-medium hover:underline">
                                            Chat with a Luxury Expert
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <RelatedTours
                tours={[
                    {
                        title: "Taj & Tigers",
                        price: "₹1,45,000",
                        duration: "6 Days",
                        image:
                            "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                        title: "Hidden Rajasthan",
                        price: "₹1,65,000",
                        duration: "9 Days",
                        image:
                            "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=400&q=80",
                    },
                    {
                        title: "Royal India",
                        price: "₹2,10,000",
                        duration: "12 Days",
                        image:
                            "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80",
                    },
                ]}
            />
        </div>
    )
}
