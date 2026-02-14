import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { publicAPI } from "@/lib/api";

interface Props {
  children: ReactNode;
  params: Promise<{
    category: string;
  }>;
}

export default async function CategoryLayout({ children, params }: Props) {
  const { category } = await params;

  try {
    const res = await publicAPI.getCategoryBySlug(category);
    if (!res?.success || !res?.data) {
      notFound();
    }
  } catch {
    notFound();
  }

  return <>{children}</>;
}
