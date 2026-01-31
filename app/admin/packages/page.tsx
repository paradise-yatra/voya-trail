"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { adminToursAPI } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface AdminTourListItem {
  _id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "archived";
  startingPrice: number;
}

export default function AdminPackagesPage() {
  const [tours, setTours] = useState<AdminTourListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await adminToursAPI.listTours();
        if (response.success) {
          setTours(response.data);
        } else {
          setError(response.message || "Failed to load tours");
        }
      } catch (err: any) {
        setError(
          err?.response?.data?.message || err?.message || "Failed to load tours"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tour Packages</h1>
          <p className="text-gray-600 text-sm">
            Manage all tour packages, their status and pricing.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/packages/new">Create New Tour</Link>
        </Button>
      </div>

      {loading && (
        <div className="text-gray-600 text-sm">Loading tour packages...</div>
      )}

      {error && !loading && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-2 rounded-md">
          {error}
        </div>
      )}

      {!loading && !error && tours.length === 0 && (
        <div className="text-sm text-gray-500 border border-dashed border-gray-200 rounded-lg px-4 py-8 text-center">
          No tour packages found. Create your first tour to get started.
        </div>
      )}

      {!loading && !error && tours.length > 0 && (
        <div className="overflow-x-auto border border-gray-200 rounded-xl bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Starting Price
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {tours.map((tour) => (
                <tr key={tour._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {tour.title}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {tour.slug}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        tour.status === "published"
                          ? "bg-green-50 text-green-700 ring-1 ring-green-600/20"
                          : tour.status === "draft"
                          ? "bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20"
                          : "bg-gray-50 text-gray-600 ring-1 ring-gray-500/20"
                      }`}
                    >
                      {tour.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    ₹{tour.startingPrice.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/packages/${tour._id}`}>Edit</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}


