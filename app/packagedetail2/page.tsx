"use client"

import React from "react"
import Link from "next/link"
import {
  ArrowDown,
  Calendar,
  CheckCircle2,
  Hotel,
  UtensilsCrossed,
  Mountain,
  Footprints,
  Star,
  Anchor,
  Droplet,
  Heart,
  Waves,
} from "lucide-react"

export default function PackageDetail2Page() {
  return (
    <div className="bg-[#fdfbf7] text-[#1c2a1e] font-display overflow-x-hidden selection:bg-[#2a5934] selection:text-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-black/30 z-10" />
          <div
            className="w-full h-full bg-cover bg-center bg-no-repeat transform scale-105"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGt2qxObYgnexrJqzVnSjVP9XKD8GtJOQM1BipSxOjehvLEzP-JU192j9vfLHcpWlnCcvmtYDcnioeIy6FiWDFGaVRy_Ky2V2CfM9fAaOW1tQNzw3pHlaPXvWeZSd3l5BN-5uJZdQ79NC_gT5b-v9h44O-7txQidwyAx2OBmWuXADuIyjj8-r5hjD1j-BsJ1DxdnyApwCsVRvCHFV4gUf8ECHDmlZ2U27pVPry3s7PL-da5zZIDqecnyq2fk0_LIZUu7H5xvJEp0-6')",
            }}
          />
        </div>
        <div className="relative z-20 flex flex-col items-center text-center px-4 max-w-4xl mx-auto space-y-6 mt-16">
          <span className="text-white font-medium tracking-[0.2em] uppercase text-sm bg-[#2a5934]/80 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
            The Signature Collection
          </span>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-thin leading-[0.9] tracking-tight drop-shadow-2xl" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
            Kerala:
            <br /> <span className="font-bold">Serenity in Green</span>
          </h1>
          <p className="text-white text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed drop-shadow-md">
            A 7-day immersive journey through the silent backwaters of Alleppey and the mist-covered tea gardens of Munnar.
          </p>
          <div className="pt-8">
            <button className="group flex items-center gap-3 px-8 py-4 bg-white text-[#2a5934] rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              <span className="text-sm font-bold uppercase tracking-wider">Explore The Journey</span>
              <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="relative py-24 px-6 md:px-20 bg-[#fdfbf7]" id="highlights">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <div className="md:w-1/3 sticky top-32">
              <h2 className="text-4xl font-bold text-[#1c2a1e] mb-6 leading-tight">
                Highlights of the <span className="text-[#2a5934] italic">Soul</span>
              </h2>
              <p className="text-[#4a554b] text-lg leading-relaxed mb-8">
                Discover the essence of God&apos;s Own Country through curated moments designed to linger in your memory forever. This is not just sightseeing; it&apos;s soul-feeling.
              </p>
              <div className="h-1 w-20 bg-[#2a5934]/20 rounded-full">
                <div className="h-full w-1/2 bg-[#2a5934] rounded-full" />
              </div>
            </div>
            <div className="md:w-2/3 grid grid-cols-1 gap-6">
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Droplet className="w-32 h-32 text-[#2a5934]" />
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="size-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2a5934] shadow-sm">
                    <Droplet className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1c2a1e]">Private Houseboat Villa</h3>
                  <p className="text-[#4a554b]">Drift along the silent backwaters in your own private floating villa, complete with a personal chef and sunset canoe rides.</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Mountain className="w-32 h-32 text-[#2a5934]" />
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="size-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2a5934] shadow-sm">
                    <Mountain className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1c2a1e]">Tea Tasting in the Clouds</h3>
                  <p className="text-[#4a554b]">Sample the finest flushes amidst the mist-covered hills of Munnar at a heritage plantation estate dating back to 1890.</p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 transition-all hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Heart className="w-32 h-32 text-[#2a5934]" />
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="size-12 rounded-full bg-[#e8f5e9] flex items-center justify-center text-[#2a5934] shadow-sm">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#1c2a1e]">Ayurvedic Rejuvenation</h3>
                  <p className="text-[#4a554b]">Realign your energies with a personalized 90-minute Abhyanga session by expert vaidyas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary Section - Sticky Scroll */}
      <div className="relative w-full bg-[#f3eee6]" id="itinerary">
        <section className="sticky top-0 h-screen w-full flex items-end pb-32 md:pb-0 md:items-center justify-start overflow-hidden border-t border-white">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCUvwgBnZGBy_MsdnTha8Y70zpPBMht1YnjPo8tzV0pUbH897bjs7YNBa4_sV3evAEYdFE3DAweQfzcyvpDnEs2fuI9iOubkyzAn68I8cbus09jCLJLB_qJk4CgjXae_s5aQPgGwx15e7z8KHfYx7_qWw0gy2uufq2jl-NZd5Q6jZG-bOjY14AiKQRk0z8_Yz_i4o9kUYE6X7mmRZwwBMSx8kTLTKTofFy-OMN3udRIDKxrljVKiszcs75ADHPHWzRhC-uFB--hJ317')",
              }}
            />
          </div>
          <div className="relative z-20 px-6 md:px-20 max-w-3xl w-full">
            <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50 transform transition-all hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#2a5934] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">Day 01</span>
                <span className="text-[#1c2a1e]/60 text-sm font-bold uppercase tracking-widest">Kochi</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a5934] mb-6">Arrival in the Queen of the Arabian Sea</h2>
              <p className="text-[#4a554b] text-lg leading-relaxed font-normal mb-8">
                Your journey begins amidst the colonial charm of Fort Kochi. Walk through streets lined with rain trees and Dutch architecture. As dusk falls, watch the iconic Chinese fishing nets silhouetted against a burning orange sky.
              </p>
              <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <Hotel className="w-5 h-5 text-[#2a5934]" />
                  <span>Brunton Boatyard</span>
                </div>
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <UtensilsCrossed className="w-5 h-5 text-[#2a5934]" />
                  <span>Welcome Dinner</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-0 h-screen w-full flex items-end pb-32 md:pb-0 md:items-center justify-end overflow-hidden border-t border-white">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9w8Jap655UmhU6v68oKOMzgV_mJX2gYI4MWVatGt8fkj7s4wSK_hGWcdn9RNi6lNr3g4zXhZbyaE5VtqsdKFBih4yfYn8hQt4yhQAya8ltgYKHpIuV9tRCuFJ9yh16cmw7E0IHsWP6EAw_sxSOOjDRXgW3hue8QZX2fO8ZE5r8rT9iKqSBh3Sz9GGTXg6H2y7D1zqQ-eFk8rASpt7dut_QWj9QZWlh2xDaBW97QjC1RdYSwhLUVBGM6srAQdc45Od3VVSgGx9EPnf')",
              }}
            />
          </div>
          <div className="relative z-20 px-6 md:px-20 max-w-3xl w-full">
            <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50 transform transition-all hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#2a5934] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">Day 02 & 03</span>
                <span className="text-[#1c2a1e]/60 text-sm font-bold uppercase tracking-widest">Munnar</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a5934] mb-6">Ascent to the Emerald Hills</h2>
              <p className="text-[#4a554b] text-lg leading-relaxed font-normal mb-8">
                Drive up winding roads to Munnar, where the air turns crisp and the world turns green. Spend your days trekking through private estates, learning the art of tea making, and spotting the rare Nilgiri Tahr.
              </p>
              <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <Mountain className="w-5 h-5 text-[#2a5934]" />
                  <span>Tea Museum Tour</span>
                </div>
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <Footprints className="w-5 h-5 text-[#2a5934]" />
                  <span>Nature Trek</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-0 h-screen w-full flex items-end pb-32 md:pb-0 md:items-center justify-start overflow-hidden border-t border-white">
          <div className="absolute inset-0 z-0">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJ_RHYvFH8yFbyRiZ7lkXalGthB7xbfx_G249YvUNausk8gKRd141R9C9wa33rC1LDsEF0f5fjtxAxZPm9XbZHboHYZh2HSb-vl3oZyAN3Bi7v55syDcBK759M1JDbklM_qEBNIdYkldXuRyyD8OoNO8NZpNJvJrypuaTKOabFzHZJ8j4eVrvrTNMhiS03wCrX_1HOERm9Vx_YDfUBMvBAxBJ4ZCFIbZBRwujkuB54VT3TuG5Qebrl76e7jG2oqYQTe0wYq627Vle3')",
              }}
            />
          </div>
          <div className="relative z-20 px-6 md:px-20 max-w-3xl w-full">
            <div className="bg-white/95 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-2xl border border-white/50 transform transition-all hover:scale-[1.01]">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#2a5934] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-md">Day 04</span>
                <span className="text-[#1c2a1e]/60 text-sm font-bold uppercase tracking-widest">Alleppey</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#2a5934] mb-6">Life on the Water</h2>
              <p className="text-[#4a554b] text-lg leading-relaxed font-normal mb-8">
                Board your private Kettuvallam (rice barge). The engine cuts, and silence takes over. Glide past village life, duck farming, and ancient temples. Dine on fresh Karimeen fish prepared by your on-board chef under starlight.
              </p>
              <div className="flex flex-wrap gap-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <Star className="w-5 h-5 text-[#2a5934]" />
                  <span>Premium Houseboat</span>
                </div>
                <div className="flex items-center gap-2 text-[#1c2a1e] text-sm font-medium">
                  <Anchor className="w-5 h-5 text-[#2a5934]" />
                  <span>Canoe Ride</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Accommodations Section */}
      <section className="relative py-24 px-6 md:px-20 bg-[#fdfbf7] border-t border-gray-200" id="stay">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col mb-12">
            <h2 className="text-4xl font-bold text-[#1c2a1e] mb-4">
              Sanctuaries of <span className="text-[#2a5934] italic">Rest</span>
            </h2>
            <p className="text-[#4a554b] text-lg max-w-2xl">Handpicked accommodations that blend heritage, luxury, and nature.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbF84gPQJzcVaUY2308mGaV09cue1CGfYk8iyYgT5nwjVfhSjoo-atCrV5xCyaHmFRKQ1RqH2BBE0EnFjGdIimiqhS34cynPLFQ1_vDvhUaFfCv0SEwXIv8uvowrTnDGebICdIrRu1mc263SW4DYADt61BenJIfecwKSDetgf2_5IrBwv9yEDKD5nX1KWYVv2THoujaHvYfgeOw7f-50DWjUABNyVUxn-NwIlxB1EEYvPFgqz96nlvBdIcqzYOF3IIqRjCHXzUT2Tx')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Kumarakom Lake Resort</h3>
                    <p className="text-white/90 text-sm font-medium">Heritage Luxury Collection</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-lg text-white flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">5.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-1 bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] group hover:border-[#2a5934]/30 transition-colors">
              <div className="flex justify-between items-start">
                <Waves className="w-8 h-8 text-[#2a5934] bg-[#e8f5e9] p-2 rounded-lg" />
              </div>
              <div>
                <h4 className="text-[#1c2a1e] font-bold text-lg">Infinity Pools</h4>
                <p className="text-[#4a554b]/70 text-sm mt-1">Overlooking the Vembanad Lake</p>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-2 relative group overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAeiVWSONjP4OtHxHeVrmoFmnIzJuaIvl8eB9nd4tU94X64htTu5hA502MqvUG9HhfwlQeM7fH13YvP_hzGhFvQEGZFUSnHQqEPlSZ6layY6qpjwBWx22aPiQ1FQ7Rdbc6zoyLzm2YEAn7aucHg2uCy_jTHEQAhQ95DLGRcTYKpPUqRIj3JI229hAgcOf0TJ_hSJ7tNYPPAVEaCWgQ5AITmxFxjnnR8sqUeS7y1QyCprxoOXorVryL1fObpUwTGszngS4uo1wPM6VXt')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-1">Windermere Estate</h3>
                <p className="text-white/80 text-xs">Munnar</p>
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-1 bg-white rounded-2xl p-6 flex flex-col justify-between border border-gray-100 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] group hover:border-[#2a5934]/30 transition-colors">
              <div className="flex justify-between items-start">
                <Heart className="w-8 h-8 text-[#2a5934] bg-[#e8f5e9] p-2 rounded-lg" />
              </div>
              <div>
                <h4 className="text-[#1c2a1e] font-bold text-lg">Forest Spa</h4>
                <p className="text-[#4a554b]/70 text-sm mt-1">Open-air therapeutic massages</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 md:px-20 bg-[#f3eee6] border-t border-gray-200 mb-32" id="pricing">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-[#2a5934] font-bold tracking-widest uppercase text-sm mb-4 block">The Investment</span>
          <h2 className="text-5xl font-bold text-[#1c2a1e] mb-6">Crafted for the Discerning</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-2 mb-8">
            <span className="text-[#4a554b] text-lg">Starting from</span>
            <span className="text-4xl font-display font-black text-[#2a5934]">₹1,20,000</span>
            <span className="text-[#4a554b] text-lg">/ person</span>
          </div>
          <p className="text-[#4a554b] text-lg mb-12 max-w-xl mx-auto">
            Includes all luxury accommodations, private transfers in a premium sedan, all meals on the houseboat, guided experiences, and dedicated concierge support 24/7.
          </p>
          <div className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left max-w-3xl mx-auto">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2a5934]" />
              <span className="text-[#1c2a1e] text-sm font-medium">7 Days / 6 Nights</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2a5934]" />
              <span className="text-[#1c2a1e] text-sm font-medium">Breakfast & Dinner</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2a5934]" />
              <span className="text-[#1c2a1e] text-sm font-medium">Private Chauffeur</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2a5934]" />
              <span className="text-[#1c2a1e] text-sm font-medium">All Entry Fees</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#fdfbf7] text-[#4a554b]/60 py-12 text-center border-t border-gray-200">
        <div className="flex justify-center gap-6 mb-8">
          <span className="hover:text-[#2a5934] cursor-pointer transition-colors font-medium">Instagram</span>
          <span className="hover:text-[#2a5934] cursor-pointer transition-colors font-medium">Twitter</span>
          <span className="hover:text-[#2a5934] cursor-pointer transition-colors font-medium">Facebook</span>
        </div>
        <p className="text-sm">© 2024 LuxeVoyage. All rights reserved.</p>
      </footer>

      {/* Fixed Navigation Dots */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 max-w-[90vw]">
        <div className="flex items-center p-1.5 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 rounded-full">
          <a
            className="px-5 py-2.5 rounded-full text-sm font-bold text-[#1c2a1e] hover:bg-gray-50 transition-colors border-r border-gray-200/60"
            href="#highlights"
          >
            Highlights
          </a>
          <a
            className="px-5 py-2.5 rounded-full text-sm font-bold text-[#1c2a1e] hover:bg-gray-50 transition-colors border-r border-gray-200/60"
            href="#itinerary"
          >
            Itinerary
          </a>
          <a
            className="px-5 py-2.5 rounded-full text-sm font-bold text-[#1c2a1e] hover:bg-gray-50 transition-colors border-r border-gray-200/60"
            href="#stay"
          >
            Stay
          </a>
          <a className="px-5 py-2.5 rounded-full text-sm font-bold text-[#1c2a1e] hover:bg-gray-50 transition-colors" href="#pricing">
            Pricing
          </a>
        </div>
      </div>

      {/* Fixed CTA Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="group flex items-center gap-3 bg-[#2a5934] text-white px-6 py-4 rounded-full font-bold shadow-lg hover:bg-[#1e3f26] hover:scale-105 transition-all duration-300 ring-4 ring-white/50">
          <span>Check Availability</span>
          <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

