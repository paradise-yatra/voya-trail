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
            main: "https://images.pexels.com/photos/28762053/pexels-photo-28762053.jpeg?auto=compress&cs=tinysrgb&w=1200",
            topRight: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
            bottomRight: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80",
          }}
          title="Golden Triangle & The Spiritual Ganges"
          location="Delhi • Agra • Jaipur • Varanasi, India"
          duration="8 Days, 7 Nights"
          people="2-12 People"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "India Tours", href: "/india-tours" },
            { label: "Golden Triangle & The Spiritual Ganges" },
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
                    "Embark on a soul-stirring journey through India's most iconic destinations. This curated 8-day expedition takes you from the bustling historic lanes of Delhi to the timeless marble beauty of the Taj Mahal, the royal pink city of Jaipur, and finally to the spiritual heart of India—Varanasi. Experience the perfect blend of Mughal grandeur, Rajput royalty, and the deep-rooted spirituality of the Ganges.",
                  duration: "8 Days",
                  groupSize: "Max 12 Guests",
                  guide: "Private Expert",
                  languages: "English, French",
                }}
                amenities={[
                  {
                    icon: Hotel,
                    title: "Luxury Stays",
                    description: "Handpicked heritage and 5-star accommodations.",
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
                    description:
                      "Included flights: Jaipur to Varanasi, Varanasi to Delhi.",
                  },
                ]}
                roadmap={[
                  {
                    day: 1,
                    title: "Arrive Delhi - The Imperial Welcome",
                    description:
                      "Arrive at Delhi's Indira Gandhi International Airport. You are met by an Equinox representative with a traditional and sacred marigold flower garland. Delhi stands as the capital of Modern India, where you can see the mingling of the Old and New India. Use this day to relax and recuperate or explore handcrafted local experiences.",
                    experiences: [
                      "Traditional Marigold Welcome",
                      "Private Airport Transfer",
                      "Leisure time at The Imperial"
                    ],
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
                      cuisine:
                        "Multi-cuisine excellence featuring authentic Indian, Pan-Asian, and Continental delicacies. Specializes in royal Mughlai and contemporary fusion.",
                      facilities: [
                        "Luxury Spa",
                        "Outdoor Pool",
                        "Fitness Center",
                        "24/7 Room Service",
                        "Business Lounge",
                        "Valet Parking",
                      ],
                    },
                    images: [
                      "/roadmap/delhi_welcome_pro_1769426427618.png",
                      "https://images.unsplash.com/photo-1598333108583-8bc60198bc43?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1564507592333-c60657451ddc?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 2,
                    title: "Delhi - Old & New Heritage",
                    description:
                      "Start with a walk in Lodhi Gardens. Explore Old Delhi with an exhilarating cycle rickshaw ride through Kinari bazaar, ending at the majestic Jama Masjid. Drive past the Imperial Rajpath, India Gate, and Rashtrapati Bhawan. Visit Qutub Minar, Humayun's Tomb, and the community kitchen at Bangla Sahib Gurdwara.",
                    experiences: [
                      "Cycle Rickshaw Ride in Chandni Chowk",
                      "Guided Tour of Jama Masjid",
                      "Visit to Bangla Sahib Community Kitchen",
                      "Sunset at Humayun's Tomb"
                    ],
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
                      cuisine:
                        "Multi-cuisine excellence featuring authentic Indian, Pan-Asian, and Continental delicacies. Specializes in royal Mughlai and contemporary fusion.",
                      facilities: [
                        "Luxury Spa",
                        "Outdoor Pool",
                        "Fitness Center",
                        "24/7 Room Service",
                        "Business Lounge",
                        "Valet Parking",
                      ],
                    },
                    images: [
                      "/roadmap/old_delhi_heritage_pro_1769426448111.png",
                      "https://images.unsplash.com/photo-1624314138470-5a2f24623f10?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1585123334904-845d60e97b29?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 3,
                    title: "Delhi to Agra - The City of Taj",
                    description:
                      "Depart for Agra by road or the Gatiman Express. Visit the Agra Fort, a fine example of Mughal architecture. Explore Itimad-Ud-Daula, fondly known as the \"Baby Taj.\" At sunset, witness the long-awaited visit to the Taj Mahal, bathed in the soft light of the evening sun.",
                    experiences: [
                      "Gatiman Express Premium Train Experience",
                      "Guided Tour of Agra Fort",
                      "Sunset Visit to the Taj Mahal"
                    ],
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
                      cuisine: "Exquisite dining with views of the Taj Mahal, offering traditional Indian flavors and international favorites.",
                      facilities: [
                        "Taj View Rooms",
                        "Luxury Spa",
                        "Outdoor Pool",
                        "Fine Dining",
                        "Bar & Lounge",
                        "Fitness Center",
                      ],
                    },
                    images: [
                      "/roadmap/agra_taj_mahal_pro_1769426466966.png",
                      "https://images.unsplash.com/photo-1564507592333-c60657451ddc?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1594993877167-a08f13013dc3?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 4,
                    title: "Agra to Jaipur via Fatehpur Sikri",
                    description:
                      "Drive to Jaipur via Fatehpur Sikri, the abandoned Mughal citadel. Stop at the massive Abhaneri stepwell, a 13-level architectural marvel. Arrive in Jaipur, the \"Pink City,\" and enjoy the evening at leisure in Rajasthan's princely capital.",
                    experiences: [
                      "Explore Fatehpur Sikri Citadel",
                      "Visit Abhaneri Stepwell",
                      "Traditional Rajasthani Dinner"
                    ],
                    stay: {
                      name: "Rambagh Palace, Jaipur",
                      image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=800&q=80",
                      stars: 5,
                      location: "Bhawani Singh Road, Jaipur",
                      distances: {
                        airport: "11 KM",
                        railway: "4 KM",
                        cityHeart: "2 KM",
                      },
                      cuisine: "Royal Rajasthani cuisine served in a palace setting, along with global culinary delights.",
                      facilities: [
                        "Palace Gardens",
                        "Heritage Suites",
                        "Outdoor Pool",
                        "Spa & Wellness",
                        "Polo Bar",
                        "Fine Dining",
                      ],
                    },
                    images: [
                      "/roadmap/fatehpur_sikri_pro_1769426517992.png",
                      "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 5,
                    title: "Jaipur - Royal Forts & Observatories",
                    description:
                      "Explore Amber Fort by jeep, a hilltop fortress of Rajput architecture. Visit the City Palace and the eccentric Jantar Mantar observatory. Participate in the evening aarti ceremony at Govind Devji temple, a local Jaipur tradition.",
                    experiences: [
                      "Jeep Safari to Amber Fort",
                      "Private Tour of City Palace",
                      "Evening Aarti at Govind Devji Temple"
                    ],
                    stay: {
                      name: "Rambagh Palace, Jaipur",
                      image: "https://images.unsplash.com/photo-1524230507669-5ff97982bb5e?auto=format&fit=crop&w=800&q=80",
                      stars: 5,
                      location: "Bhawani Singh Road, Jaipur",
                      distances: {
                        airport: "11 KM",
                        railway: "4 KM",
                        cityHeart: "2 KM",
                      },
                      cuisine: "Royal Rajasthani cuisine served in a palace setting, along with global culinary delights.",
                      facilities: [
                        "Palace Gardens",
                        "Heritage Suites",
                        "Outdoor Pool",
                        "Spa & Wellness",
                        "Polo Bar",
                        "Fine Dining",
                      ],
                    },
                    images: [
                      "/roadmap/jaipur_amber_fort_pro_1769426544370.png",
                      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1602339752474-f77aa7bcaecd?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 6,
                    title: "Jaipur to Varanasi - The Spiritual Flight",
                    description:
                      "Fly from Jaipur to Varanasi, the spiritual heart of India. Witness the mesmerizing Evening Aarti on the banks of the River Ganges. Walk through the labyrinthine streets of the old town, filled with shrines, curious shops, and ancient secrets.",
                    experiences: [
                      "Evening Ganga Aarti Ceremony",
                      "Guided Old City Heritage Walk",
                      "Bazaar Exploration"
                    ],
                    stay: {
                      name: "Brijrama Palace, Varanasi",
                      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=800&q=80",
                      stars: 5,
                      location: "Darbhanga Ghat, Varanasi",
                      distances: {
                        airport: "25 KM",
                        railway: "5 KM",
                        cityHeart: "0.1 KM",
                      },
                      cuisine: "Traditional vegetarian Banarasi cuisine and international vegetarian dishes served by the Ganges.",
                      facilities: [
                        "Ganges View",
                        "Heritage Architecture",
                        "Yoga Studio",
                        "Library",
                        "Cultural Performances",
                        "Private Boat Service",
                      ],
                    },
                    images: [
                      "/roadmap/varanasi_aarti_pro_1769426567455.png",
                      "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 7,
                    title: "Varanasi - Sunrise & Sarnath",
                    description:
                      "Experience a poetic sunrise on the Ganges. Visit Akharas and Ashrams to learn about spiritual lifestyles. Explore Benares Hindu University and a traditional Sanskrit school. Later, visit Sarnath, where Buddha delivered his first sermon. Meet the famous Banaras silk weavers.",
                    experiences: [
                      "Sunrise Boat Ride on the Ganges",
                      "Excursion to Sarnath",
                      "Silk Weaving Workshop Visit"
                    ],
                    stay: {
                      name: "Brijrama Palace, Varanasi",
                      image: "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&w=800&q=80",
                      stars: 5,
                      location: "Darbhanga Ghat, Varanasi",
                      distances: {
                        airport: "25 KM",
                        railway: "5 KM",
                        cityHeart: "0.1 KM",
                      },
                      cuisine: "Traditional vegetarian Banarasi cuisine and international vegetarian dishes served by the Ganges.",
                      facilities: [
                        "Ganges View",
                        "Heritage Architecture",
                        "Yoga Studio",
                        "Library",
                        "Cultural Performances",
                        "Private Boat Service",
                      ],
                    },
                    images: [
                      "/roadmap/varanasi_sunrise_pro_1769426586490.png",
                      "https://images.unsplash.com/photo-1605153322277-dd0d7f608b4d?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1610123598195-90f2e511a753?auto=format&fit=crop&w=400&q=80",
                    ],
                  },
                  {
                    day: 8,
                    title: "Varanasi to Delhi - Farewell",
                    description:
                      "Fly back to Delhi from Varanasi. Connect to your onward flight, bidding farewell to this mystical land with memories of a lifetime.",
                    experiences: [
                      "Morning Leisure in Varanasi",
                      "Transfer to Airport"
                    ],
                    images: [
                      "/roadmap/india_farewell_pro_1769426604762.png",
                      "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=400&q=80",
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
                      <h3 className="text-3xl font-bold text-[#df2c28]">₹1,50,000</h3>
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
