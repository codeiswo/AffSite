import { getAllProducts, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = [
  { id: 1, title: 'Classic Cashmere Blend Trench Coat', slug: 'classic-cashmere-blend-trench-coat', price: 189.99, compare_price: 299.99, brand: 'Burberry', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80', features: '["70% Wool 30% Cashmere","Water Resistant"]', affiliate_link: 'https://www.burberry.com/?aff=affsite_coat', is_featured: 1 },
  { id: 2, title: 'Designer Distressed Denim Jacket', slug: 'designer-distressed-denim-jacket', price: 79.99, compare_price: 129.99, brand: "Levi's", category: 'apparel', image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80', features: '["100% Organic Cotton","Vintage Wash"]', affiliate_link: 'https://www.levis.com/?aff=affsite_jacket', is_featured: 1 },
  { id: 3, title: 'Vintage Floral Summer Midi Dress', slug: 'vintage-floral-summer-midi-dress', price: 59.99, compare_price: 89.99, brand: 'ZARA', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80', features: '["Linen Blend","Puff Sleeves"]', affiliate_link: 'https://www.zara.com/?aff=affsite_dress', is_featured: 1 },
  { id: 4, title: 'Premium Heavyweight Fleece Hoodie', slug: 'premium-heavyweight-fleece-hoodie', price: 64.99, compare_price: 99.99, brand: 'Nike', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80', features: '["450GSM Cotton","Pre-shrunk"]', affiliate_link: 'https://www.nike.com/?aff=affsite_hoodie', is_featured: 1 },
  { id: 5, title: 'Wireless Active Noise Canceling Headphones', slug: 'wireless-active-noise-canceling-headphones', price: 249.99, compare_price: 349.99, brand: 'Sony', category: 'digital', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', features: '["30-Hour ANC","Bluetooth 5.3"]', affiliate_link: 'https://www.sony.com/?aff=affsite_anc', is_featured: 1 },
  { id: 6, title: 'Smart Robotic Vacuum Cleaner & Mop', slug: 'smart-robotic-vacuum-cleaner-mop', price: 399.99, compare_price: 599.99, brand: 'Roborock', category: 'home', image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80', features: '["LiDAR Mapping","5000Pa Suction"]', affiliate_link: 'https://www.roborock.com/?aff=affsite_vacuum', is_featured: 1 },
];

export async function generateMetadata() {
  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = settings.site_url || 'https://www.affsite.com';

  return {
    alternates: {
      canonical: baseUrl,
    },
  };
}

export default async function HomePage() {
  let products;
  let settings = {};
  try {
    products = await getAllProducts();
    if (!products || products.length === 0) products = fallbackProducts;
  } catch {
    products = fallbackProducts;
  }

  try {
    settings = await getSettings();
  } catch (_) {}

  const baseUrl = settings.site_url || 'https://www.affsite.com';
  const siteName = settings.site_name || 'AffSite Deals';

  const jsonLdWebSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/products?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const jsonLdOrg = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
  };

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedHomepage;
  if (archetype === 'minimalist') SelectedHomepage = MinimalistTheme.Homepage;
  else if (archetype === 'futuristic') SelectedHomepage = FuturisticTheme.Homepage;
  else if (archetype === 'luxury') SelectedHomepage = LuxuryTheme.Homepage;
  else SelectedHomepage = ClassicTheme.Homepage;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }} />
      <SelectedHomepage settings={settings} featuredProducts={featuredProducts} />
    </>
  );
}
