const CMS_URL = "https://shiny-bass-900.convex.site/api/public/content";

export interface CMSPost {
  title: string;
  slug: string;
  content: string;
  createdAt: number;
  pipelineType: string;
}

export async function fetchCMSPosts(
  business: string,
  type: string = "blog",
  limit: number = 10
): Promise<CMSPost[]> {
  const url = `${CMS_URL}?business=${business}&type=${type}&limit=${limit}`;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchCMSPostBySlug(
  business: string,
  slug: string
): Promise<CMSPost | null> {
  const url = `${CMS_URL}?business=${business}&slug=${slug}`;
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) return data[0];
    if (data && !Array.isArray(data)) return data;
    return null;
  } catch {
    return null;
  }
}
