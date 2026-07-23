import { getSettings } from '@/lib/db';

export const runtime = 'edge';

export default async function robots() {
  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const BASE_URL = settings.site_url || 'https://www.affsite.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
