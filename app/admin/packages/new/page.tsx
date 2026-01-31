"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminToursAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function NewTourPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [heroImage, setHeroImage] = useState<{ publicId: string; url: string } | null>(null);

  const handleUploadHero = async () => {
    if (!heroImageFile) return;
    setError(null);
    try {
      const response = await adminToursAPI.uploadTourImage(heroImageFile, "tours/hero");
      if (response.success) {
        setHeroImage(response.data);
      } else {
        setError(response.message || "Failed to upload image");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to upload image");
    }
  };

  const handleSubmit = async (formData: FormData) => {
    setSaving(true);
    setError(null);

    try {
      const title = String(formData.get("title") || "");
      const slug = String(formData.get("slug") || "");
      const category = String(formData.get("category") || "");
      const startingPrice = Number(formData.get("startingPrice") || 0);
      const overviewDescription = String(formData.get("overviewDescription") || "");

      const payload: any = {
        title,
        slug,
        category,
        duration: {
          nights: 0,
          days: Number(formData.get("durationDays") || 1),
        },
        startingPrice,
        locations: String(formData.get("locations") || "")
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean),
        highlights: String(formData.get("highlights") || "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
        overview: {
          title,
          description: overviewDescription,
          durationLabel: String(formData.get("durationLabel") || ""),
          groupSize: String(formData.get("groupSize") || ""),
          guide: String(formData.get("guide") || ""),
          languages: String(formData.get("languages") || ""),
        },
        amenityIds: [],
        itinerary: [
          {
            dayNumber: 1,
            title: "Day 1",
            description: overviewDescription || "Day 1 itinerary description",
            images: [],
          },
        ],
        inclusions: String(formData.get("inclusions") || "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
        exclusions: String(formData.get("exclusions") || "")
          .split("\n")
          .map((v) => v.trim())
          .filter(Boolean),
        travelStyle: String(formData.get("travelStyle") || ""),
        bestTimeToVisit: String(formData.get("bestTimeToVisit") || ""),
        faq: [],
        notes: [],
        images: {
          hero: heroImage || undefined,
          gallery: heroImage ? [heroImage] : [],
        },
        relatedTours: [],
        seo: {
          metaTitle: String(formData.get("seoTitle") || title),
          metaDescription: String(formData.get("seoDescription") || overviewDescription),
          metaKeywords: String(formData.get("seoKeywords") || "")
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean),
          canonicalUrl: String(formData.get("canonicalUrl") || `https://example.com/tours/${slug}`),
        },
        status: formData.get("status") === "published" ? "published" : "draft",
      };

      const response = await adminToursAPI.createTour(payload);

      if (response.success) {
        router.push("/admin/packages");
      } else {
        setError(response.message || "Failed to create tour");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || "Failed to create tour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Tour</h1>
        <p className="text-gray-600 text-sm">
          Start with the essentials. You can refine details later.
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      <form
        action={handleSubmit}
        className="space-y-8 bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
      >
        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Basic Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input name="title" placeholder="Golden Triangle with Varanasi" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug
              </label>
              <Input
                name="slug"
                placeholder="golden-triangle-with-varanasi"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category ID
              </label>
              <Input
                name="category"
                placeholder="MongoDB ObjectId of category"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Price (₹)
              </label>
              <Input
                name="startingPrice"
                type="number"
                min={0}
                step="100"
                required
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Overview
              </label>
              <Textarea
                name="overviewDescription"
                rows={4}
                placeholder="A 7-day journey through Delhi, Agra, Jaipur and the holy city of Varanasi."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration Days
              </label>
              <Input name="durationDays" type="number" min={1} defaultValue={7} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration Label
              </label>
              <Input name="durationLabel" placeholder="7 Days / 6 Nights" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Group Size
              </label>
              <Input name="groupSize" placeholder="2–12 guests" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guide
              </label>
              <Input name="guide" placeholder="English-speaking local guide" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Languages
              </label>
              <Input name="languages" placeholder="English, Hindi" />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Locations & Highlights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Locations (comma separated)
              </label>
              <Input name="locations" placeholder="Delhi, Agra, Jaipur, Varanasi" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Highlights (one per line)
              </label>
              <Textarea
                name="highlights"
                rows={4}
                placeholder={"Sunrise at Taj Mahal\nEvening Aarti in Varanasi"}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Inclusions & Exclusions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Inclusions (one per line)
              </label>
              <Textarea
                name="inclusions"
                rows={4}
                placeholder={"Accommodation in premium hotels\nDaily breakfast"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exclusions (one per line)
              </label>
              <Textarea
                name="exclusions"
                rows={4}
                placeholder={"International flights\nPersonal expenses"}
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            Hero Image
          </h2>
          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setHeroImageFile(file);
              }}
            />
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleUploadHero}
                disabled={!heroImageFile}
              >
                Upload Hero Image
              </Button>
              {heroImage && (
                <span className="text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded">
                  Image uploaded
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
            SEO & Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Title
              </label>
              <Input name="seoTitle" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Canonical URL
              </label>
              <Input name="canonicalUrl" placeholder="https://your-domain.com/tours/slug" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Description
              </label>
              <Textarea name="seoDescription" rows={3} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SEO Keywords (comma separated)
              </label>
              <Input name="seoKeywords" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                defaultValue="draft"
                className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/admin/packages")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? "Creating..." : "Create Tour"}
          </Button>
        </div>
      </form>
    </div>
  );
}


