import { getProducts, getSettings } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = [
  { id: 1, title: 'Samsung DA29-00020B Filter', slug: 'samsung-da29-00020b-replacement', price: 29.99, compare_price: 49.99, brand: 'Samsung', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/0F4C81/FFFFFF?text=Samsung', features: '["NSF Certified","6-Month Life"]', is_featured: 1 },
  { id: 2, title: 'GE MWF SmartWater Filter', slug: 'ge-mwf-smartwater-replacement', price: 24.99, compare_price: 44.99, brand: 'GE', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/0A3558/FFFFFF?text=GE+MWF', features: '["NSF Certified","Easy Install"]', is_featured: 1 },
  { id: 3, title: 'LG LT1000P Filter', slug: 'lg-lt1000p-replacement', price: 26.99, compare_price: 45.99, brand: 'LG', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/00B4D8/FFFFFF?text=LG', features: '["Quick Connect","200 Gallon"]', is_featured: 1 },
  { id: 4, title: 'Whirlpool W10295370A Filter', slug: 'whirlpool-w10295370a-replacement', price: 22.99, compare_price: 39.99, brand: 'Whirlpool', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/0096B4/FFFFFF?text=Whirlpool', features: '["Triple Filtration","NSF Certified"]', is_featured: 1 },
  { id: 5, title: 'Maytag UKF8001 PUR Filter', slug: 'maytag-ukf8001-replacement', price: 23.99, compare_price: 42.99, brand: 'Maytag', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/0D4373/FFFFFF?text=Maytag', features: '["Multi-Brand","Premium Carbon"]', is_featured: 1 },
  { id: 6, title: 'Frigidaire ULTRAWF Filter', slug: 'frigidaire-ultrawf-replacement', price: 21.99, compare_price: 38.99, brand: 'Frigidaire', category: 'Refrigerator Water Filters', image_url: 'https://placehold.co/600x600/005B6B/FFFFFF?text=Frigidaire', features: '["Activated Carbon","Push-In Install"]', is_featured: 1 },
];

const brands = ['Samsung', 'GE', 'LG', 'Whirlpool', 'Maytag', 'Frigidaire'];
const categories = ['Refrigerator Water Filters', 'Refrigerator Air Filters', 'Ice Maker'];

export const metadata = {
  title: 'All Products - Refrigerator Water Filter Replacements',
  description: 'Browse our complete collection of premium refrigerator water filter replacements. Samsung, GE, LG, Whirlpool, Maytag & more. NSF certified, great prices.',
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const brand = params?.brand || '';
  const category = params?.category || '';
  const sort = params?.sort || 'sort_order';
  const search = params?.search || '';
  const page = parseInt(params?.page || '1');

  let products, total;
  try {
    const result = await getProducts({ page, limit: 12, brand, category, search, sort });
    products = result.products;
    total = result.total;
    if (!products || products.length === 0) {
      products = fallbackProducts;
      total = fallbackProducts.length;
    }
  } catch {
    products = fallbackProducts;
    total = fallbackProducts.length;
  }

  // Filter fallback products if needed
  if (products === fallbackProducts) {
    if (brand) products = products.filter(p => p.brand === brand);
    if (category) products = products.filter(p => p.category === category);
    total = products.length;
  }

  const totalPages = Math.ceil(total / 12);

  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedProductList;
  if (archetype === 'minimalist') SelectedProductList = MinimalistTheme.ProductList;
  else if (archetype === 'futuristic') SelectedProductList = FuturisticTheme.ProductList;
  else if (archetype === 'luxury') SelectedProductList = LuxuryTheme.ProductList;
  else SelectedProductList = ClassicTheme.ProductList;

  return (
    <SelectedProductList
      category={category}
      brand={brand}
      sort={sort}
      products={products}
      total={total}
      page={page}
      totalPages={totalPages}
      categories={categories}
      brands={brands}
    />
  );
}
