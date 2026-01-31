"use client";

import React from "react";
import { HeroGallery } from "@/components/package/HeroGallery";
import { PackageContent } from "@/components/package/PackageContent";

interface TourDetailClientProps {
    tour: any;
}

export default function TourDetailClient({ tour }: TourDetailClientProps) {
    const heroImages = {
        main: tour.images?.hero?.url || tour.mainImage || "/placeholder.jpg",
        topRight: tour.images?.gallery?.[0]?.url || tour.galleryImages?.[0] || "/placeholder.jpg",
        bottomRight: tour.images?.gallery?.[1]?.url || tour.galleryImages?.[1] || "/placeholder.jpg",
    };

    const overview = {
        title: tour.overview?.title || tour.title,
        description: tour.overview?.description || tour.overviewDescription || tour.description || "",
        duration: tour.overview?.durationLabel || `${tour.durationDays || 0} Days`,
        groupSize: tour.overview?.groupSize || `Max ${tour.maxPeople || 12} Guests`,
        guide: tour.overview?.guide || tour.guideType || "Private Expert",
        languages: tour.overview?.languages || (Array.isArray(tour.languages) ? tour.languages.join(", ") : "English"),
    };

    const amenities = (tour.amenityIds || tour.amenities || []).map((a: any) => {
        if (typeof a === 'string') {
            return {
                icon: () => null,
                title: a,
                description: "Included",
            };
        }
        return {
            icon: () => null,
            title: a.label || a.name || "Amenity",
            description: a.iconKey || "",
        };
    });

    const roadmap = (tour.itinerary || []).map((day: any) => ({
        day: day.dayNumber || day.day || 1,
        title: day.title,
        description: day.description,
        experiences: day.experiences || [],
        stay: day.stay
            ? {
                name: day.stay.name,
                image: day.stay.image,
                stars: day.stay.stars,
                location: day.stay.location,
                distances: day.stay.distances,
                cuisine: day.stay.cuisine,
                facilities: day.stay.facilities,
            }
            : undefined,
        images: day.images || [],
    }));

    return (
        <main className="bg-background min-h-screen">
            <HeroGallery
                images={heroImages}
                title={tour.title}
                location={
                    (tour.locations && tour.locations.length > 0)
                        ? tour.locations.join(" • ")
                        : (tour.location || "India")
                }
                duration={overview.duration}
                people={overview.groupSize}
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Tours", href: "/packages" },
                    { label: tour.title },
                ]}
            />

            <section className="max-w-[1280px] mx-auto px-4 md:px-8 py-10">
                <PackageContent
                    overview={overview}
                    amenities={amenities}
                    roadmap={roadmap}
                />
            </section>
        </main>
    );
}
