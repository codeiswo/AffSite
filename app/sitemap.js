import { getAllProducts, getPages, getSettings } from '@/lib/db';

export const runtime = 'edge';

export default async function sitemap() {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const BASE_URL = settings.site_url || 'https://www.affsite.com';

  const categories = ['apparel', 'digital', 'home', 'services', 'beauty', 'baby', 'sports', 'food', 'auto', 'pets'];

  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  const categoryPages = categories.map(cat => ({
    url: `${BASE_URL}/products?category=${encodeURIComponent(cat)}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.85,
  }));

  let productPages = [];
  try {
    const products = await getAllProducts();
    productPages = products.map(product => ({
      url: `${BASE_URL}/product/${product.slug}`,
      lastModified: new Date(product.updated_at || product.created_at),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));
  } catch { /* ignore */ }

  let cmsPages = [];
  try {
    const pages = await getPages({ published: true });
    cmsPages = pages.map(page => ({
      url: `${BASE_URL}/page/${page.slug}`,
      lastModified: new Date(page.updated_at || page.created_at),
      changeFrequency: 'monthly',
      priority: 0.5,
    }));
  } catch { /* ignore */ }

  return [...staticPages, ...categoryPages, ...productPages, ...cmsPages];
}
