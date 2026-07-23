import { getProducts, getSettings, getCategories } from '@/lib/db';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = [
  { id: 1, title: 'Classic Cashmere Blend Trench Coat', slug: 'classic-cashmere-blend-trench-coat', price: 189.99, compare_price: 299.99, brand: 'Burberry', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80', features: '["70% Wool 30% Cashmere","Water-resistant finish","Dry clean only"]', affiliate_link: 'https://www.burberry.com', is_featured: 1 },
  { id: 2, title: 'Designer Distressed Denim Jacket', slug: 'designer-distressed-denim-jacket', price: 79.99, compare_price: 129.99, brand: "Levi's", category: 'apparel', image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80', features: '["100% Organic Cotton","Vintage Wash Finish","Reinforced Stitching"]', affiliate_link: 'https://www.levis.com', is_featured: 1 },
  { id: 3, title: 'Vintage Floral Summer Midi Dress', slug: 'vintage-floral-summer-midi-dress', price: 59.99, compare_price: 89.99, brand: 'ZARA', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80', features: '["Breathable Linen Fabric","Puff Sleeves","Side Slit"]', affiliate_link: 'https://www.zara.com', is_featured: 1 },
  { id: 4, title: 'Premium Heavyweight Fleece Hoodie', slug: 'premium-heavyweight-fleece-hoodie', price: 64.99, compare_price: 99.99, brand: 'Nike', category: 'apparel', image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80', features: '["450GSM Heavyweight Fleece","Double-Layer Hood","Pre-shrunk Fabric"]', affiliate_link: 'https://www.nike.com', is_featured: 1 },
  { id: 5, title: 'Wireless Active Noise Canceling Headphones', slug: 'wireless-active-noise-canceling-headphones', price: 249.99, compare_price: 349.99, brand: 'Sony', category: 'digital', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', features: '["ANC Noise Cancellation","30-Hour Playtime","Bluetooth 5.3"]', affiliate_link: 'https://www.sony.com', is_featured: 1 },
  { id: 6, title: 'Smart Robotic Vacuum Cleaner & Mop', slug: 'smart-robotic-vacuum-cleaner-mop', price: 399.99, compare_price: 599.99, brand: 'Roborock', category: 'home', image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80', features: '["LiDAR Precision Mapping","5000Pa Suction","Self-Emptying Base"]', affiliate_link: 'https://www.roborock.com', is_featured: 1 },
];

const brands = ['Burberry', "Levi's", 'ZARA', 'Nike', 'Sony', 'Roborock', 'Gucci', 'adidas', 'Uniqlo'];
const fallbackCategories = ['apparel', 'digital', 'home', 'beauty', 'sports', 'services'];

export const metadata = {
  title: 'All Brand Deals & Coupons | AffSite Deals',
  description: 'Browse our complete collection of fashion brand deals, promo codes, and shopping discounts across top categories.',
};

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const brand = params?.brand || '';
  const category = params?.category || '';
  const sort = params?.sort || 'sort_order';
  const search = params?.search || '';
  const page = parseInt(params?.page || '1');

  let rawProducts, total;
  try {
    const result = await getProducts({ page, limit: 12, brand, category, search, sort });
    rawProducts = result?.products;
    total = result?.total || 0;
    if (!rawProducts || rawProducts.length === 0) {
      rawProducts = fallbackProducts;
      total = fallbackProducts.length;
    }
  } catch {
    rawProducts = fallbackProducts;
    total = fallbackProducts.length;
  }

  // Filter fallback products if needed
  if (rawProducts === fallbackProducts) {
    if (brand) rawProducts = rawProducts.filter(p => p.brand === brand);
    if (category) rawProducts = rawProducts.filter(p => p.category === category);
    total = rawProducts.length;
  }

  const products = JSON.parse(JSON.stringify(rawProducts || []));

  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  // Fetch dynamic categories from DB
  let dbCategories = [];
  try {
    dbCategories = await getCategories();
  } catch (_) {}

  // Use DB categories if available, otherwise fallback
  const categories = dbCategories.length > 0
    ? JSON.parse(JSON.stringify(dbCategories.map(c => ({ name: c.name, slug: c.slug }))))
    : fallbackCategories.map(c => ({ name: c, slug: c }));

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedProductList;
  if (archetype === 'minimalist') SelectedProductList = MinimalistTheme.ProductListPage;
  else if (archetype === 'futuristic') SelectedProductList = FuturisticTheme.ProductListPage;
  else if (archetype === 'luxury') SelectedProductList = LuxuryTheme.ProductListPage;
  else SelectedProductList = ClassicTheme.ProductListPage;

  return (
    <SelectedProductList
      selectedCategory={category}
      selectedBrand={brand}
      products={products}
      categories={categories}
      brands={brands}
    />
  );
}

