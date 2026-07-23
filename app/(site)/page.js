import { getAllProducts, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

// Fallback products when DB is not available (dev mode)
const fallbackProducts = [
  { id: 1, title: 'Samsung DA29-00020B Filter', slug: 'samsung-da29-00020b-replacement', price: 29.99, compare_price: 49.99, brand: 'Samsung', image_url: 'https://placehold.co/600x600/0F4C81/FFFFFF?text=Samsung', features: '["NSF Certified","6-Month Life"]', is_featured: 1 },
  { id: 2, title: 'GE MWF SmartWater Filter', slug: 'ge-mwf-smartwater-replacement', price: 24.99, compare_price: 44.99, brand: 'GE', image_url: 'https://placehold.co/600x600/0A3558/FFFFFF?text=GE+MWF', features: '["NSF Certified","Easy Install"]', is_featured: 1 },
  { id: 3, title: 'LG LT1000P Filter', slug: 'lg-lt1000p-replacement', price: 26.99, compare_price: 45.99, brand: 'LG', image_url: 'https://placehold.co/600x600/00B4D8/FFFFFF?text=LG', features: '["Quick Connect","200 Gallon"]', is_featured: 1 },
  { id: 4, title: 'Whirlpool W10295370A Filter', slug: 'whirlpool-w10295370a-replacement', price: 22.99, compare_price: 39.99, brand: 'Whirlpool', image_url: 'https://placehold.co/600x600/0096B4/FFFFFF?text=Whirlpool', features: '["Triple Filtration","NSF Certified"]', is_featured: 1 },
  { id: 5, title: 'Maytag UKF8001 PUR Filter', slug: 'maytag-ukf8001-replacement', price: 23.99, compare_price: 42.99, brand: 'Maytag', image_url: 'https://placehold.co/600x600/0D4373/FFFFFF?text=Maytag', features: '["Multi-Brand","Premium Carbon"]', is_featured: 1 },
  { id: 6, title: 'Portable Nugget Ice Maker', slug: 'portable-nugget-ice-maker', price: 189.99, compare_price: 299.99, brand: 'FiltersPro', image_url: 'https://placehold.co/600x600/003D47/FFFFFF?text=Ice+Maker', features: '["26 lbs/Day","Self-Cleaning"]', is_featured: 1 },
];

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

  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedHomepage;
  if (archetype === 'minimalist') SelectedHomepage = MinimalistTheme.Homepage;
  else if (archetype === 'futuristic') SelectedHomepage = FuturisticTheme.Homepage;
  else if (archetype === 'luxury') SelectedHomepage = LuxuryTheme.Homepage;
  else SelectedHomepage = ClassicTheme.Homepage;

  return <SelectedHomepage settings={settings} featuredProducts={featuredProducts} />;
}
