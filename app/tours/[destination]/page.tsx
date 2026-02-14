import { Metadata } from "next";
import { notFound } from "next/navigation";
import { publicAPI } from "@/lib/api";
import TourDetailClient from "@/components/package/TourDetailClient";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const res = await publicAPI.getPackageBySlug(slug);
    if (res.success && res.data) {
      const pkg = res.data;
      const seo = pkg.seo || {};

      return {
        title: seo.metaTitle || `${pkg.title} | Wanderlust`,
        description: seo.metaDescription || pkg.overviewDescription || pkg.description,
        keywords: seo.metaKeywords?.join(", ") || "",
        alternates: {
          canonical: seo.canonicalUrl || undefined,
        },
        openGraph: {
          title: seo.metaTitle || pkg.title,
          description: seo.metaDescription || pkg.overviewDescription,
          images: pkg.mainImage ? [{ url: pkg.mainImage }] : [],
        }
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Tour Details | Wanderlust",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  try {
    const res = await publicAPI.getPackageBySlug(slug);

    if (!res.success || !res.data) {
      notFound();
    }

    return <TourDetailClient tour={res.data} />;
  } catch (error) {
    console.error("Error fetching tour details:", error);
    notFound();
  }
}



