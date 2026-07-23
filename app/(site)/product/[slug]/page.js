import { getProductBySlug, getProducts, getSettings } from '@/lib/db';
import { parseJSON } from '@/lib/utils';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProducts = [
  {
    id: 1,
    title: 'Classic Cashmere Blend Trench Coat',
    slug: 'classic-cashmere-blend-trench-coat',
    description: 'Elegant wool & cashmere blend trench coat featuring double-breasted closure and water-resistant finish.',
    content: '<h2>Timeless Fashion & Premium Quality</h2><p>Stay warm and stylish with our handcrafted cashmere blend trench coat.</p>',
    price: 189.99,
    compare_price: 299.99,
    brand: 'Burberry',
    category: 'apparel',
    image_url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["Double-breasted closure","70% Wool 30% Cashmere","Water-resistant finish"]',
    affiliate_link: 'https://www.burberry.com/?aff=affsite_coat',
    meta_title: 'Classic Cashmere Trench Coat | AffSite Deals',
    meta_description: 'Get exclusive cashback on classic cashmere trench coats. Free shipping on partner merchant orders.'
  },
  {
    id: 2,
    title: 'Designer Distressed Denim Jacket',
    slug: 'designer-distressed-denim-jacket',
    description: 'Vintage wash organic denim jacket crafted with premium heavy cotton.',
    content: '<h2>Classic Outerwear Style</h2><p>Designed for comfort and long-lasting durability.</p>',
    price: 79.99,
    compare_price: 129.99,
    brand: "Levi's",
    category: 'apparel',
    image_url: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["100% Organic Cotton","Vintage Wash"]',
    affiliate_link: 'https://www.levis.com/?aff=affsite_jacket',
    meta_title: 'Designer Distressed Denim Jacket | AffSite Deals',
    meta_description: 'Shop vintage distressed denim jacket with instant rebate.'
  },
  {
    id: 3,
    title: 'Vintage Floral Summer Midi Dress',
    slug: 'vintage-floral-summer-midi-dress',
    description: 'Lightweight linen blend summer midi dress with puff sleeves.',
    content: '<h2>Chic Summer Wardrobe</h2><p>Breathable fabric perfect for warm sunny days.</p>',
    price: 59.99,
    compare_price: 89.99,
    brand: 'ZARA',
    category: 'apparel',
    image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["Linen Blend","Puff Sleeves"]',
    affiliate_link: 'https://www.zara.com/?aff=affsite_dress',
    meta_title: 'Vintage Floral Summer Midi Dress | AffSite Deals',
    meta_description: 'Discover ZARA floral midi dress promo code.'
  },
  {
    id: 4,
    title: 'Premium Heavyweight Fleece Hoodie',
    slug: 'premium-heavyweight-fleece-hoodie',
    description: 'Pre-shrunk 450GSM heavyweight fleece hoodie.',
    content: '<h2>Ultimate Everyday Comfort</h2><p>Hand-crafted with soft brushed fleece interior.</p>',
    price: 64.99,
    compare_price: 99.99,
    brand: 'Nike',
    category: 'apparel',
    image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["450GSM Cotton","Pre-shrunk"]',
    affiliate_link: 'https://www.nike.com/?aff=affsite_hoodie',
    meta_title: 'Premium Heavyweight Fleece Hoodie | AffSite Deals',
    meta_description: 'Nike fleece hoodie verified promo code.'
  },
  {
    id: 5,
    title: 'Wireless Active Noise Canceling Headphones',
    slug: 'wireless-active-noise-canceling-headphones',
    description: 'Industry leading ANC headphones with 30-hour battery life.',
    content: '<h2>Immersive High Fidelity Sound</h2><p>Crystal clear calls and active noise cancellation.</p>',
    price: 249.99,
    compare_price: 349.99,
    brand: 'Sony',
    category: 'digital',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["30-Hour ANC","Bluetooth 5.3"]',
    affiliate_link: 'https://www.sony.com/?aff=affsite_anc',
    meta_title: 'Wireless Active Noise Canceling Headphones | AffSite Deals',
    meta_description: 'Sony Wireless ANC headphones cashback deal.'
  },
  {
    id: 6,
    title: 'Smart Robotic Vacuum Cleaner & Mop',
    slug: 'smart-robotic-vacuum-cleaner-mop',
    description: 'Smart LiDAR mapping robotic vacuum cleaner with 5000Pa suction.',
    content: '<h2>Automated Home Cleaning</h2><p>Multi-surface suction and automatic mop scrubbing.</p>',
    price: 399.99,
    compare_price: 599.99,
    brand: 'Roborock',
    category: 'home',
    image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80',
    gallery: '[]',
    compatible_models: '[]',
    features: '["LiDAR Mapping","5000Pa Suction"]',
    affiliate_link: 'https://www.roborock.com/?aff=affsite_vacuum',
    meta_title: 'Smart Robotic Vacuum Cleaner & Mop | AffSite Deals',
    meta_description: 'Roborock smart robot vacuum promo link.'
  }
];

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const slug = resolvedParams?.slug;
    let product;
    try { product = await getProductBySlug(slug); } catch { product = null; }
    if (!product) {
      product = fallbackProducts.find(p => p.slug === slug) || fallbackProducts[0];
    }

    const title = String(product.meta_title || product.title || 'Product Details');
    const description = String(product.meta_description || product.description || '');

    return { title, description };
  } catch (err) {
    return { title: 'Product Details', description: 'View product details and deals.' };
  }
}


export default async function ProductDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  let rawProduct;
  try { rawProduct = await getProductBySlug(slug); } catch { rawProduct = null; }

  if (!rawProduct) {
    rawProduct = fallbackProducts.find(p => p.slug === slug) || fallbackProducts[0];
  }

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = settings.site_url || 'https://www.affsite.com';

  const product = JSON.parse(JSON.stringify(rawProduct || {}));

  const gallery = parseJSON(product.gallery) || [];
  const features = parseJSON(product.features) || [];
  const compatibleModels = parseJSON(product.compatible_models) || [];
  const allImages = Array.from(new Set([product.image_url, ...gallery].filter(Boolean)));
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

  // Related products
  let rawRelatedProducts = [];
  try {
    const result = await getProducts({ brand: product.brand, limit: 4 });
    rawRelatedProducts = (result?.products || []).filter(p => p.id !== product.id).slice(0, 3);
  } catch { /* ignore */ }

  if (rawRelatedProducts.length === 0) {
    rawRelatedProducts = fallbackProducts.filter(p => p.id !== product.id).slice(0, 3);
  }

  const relatedProducts = JSON.parse(JSON.stringify(rawRelatedProducts || []));

  // JSON-LD Product & Breadcrumb Schema
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title || '',
    description: product.description || '',
    image: allImages,
    brand: { '@type': 'Brand', name: product.brand || 'Generic' },
    sku: product.sku || `SKU-${product.id || '0'}`,
    offers: {
      '@type': 'Offer',
      price: product.price || 0,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.affiliate_link || `${baseUrl}/product/${product.slug || ''}`,
      seller: { '@type': 'Organization', name: settings.site_name || 'AffSite Deals' },
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${baseUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.title || 'Product', item: `${baseUrl}/product/${product.slug || ''}` }
    ]
  };

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedProductDetail;
  if (archetype === 'minimalist') SelectedProductDetail = MinimalistTheme.ProductDetailPage;
  else if (archetype === 'futuristic') SelectedProductDetail = FuturisticTheme.ProductDetailPage;
  else if (archetype === 'luxury') SelectedProductDetail = LuxuryTheme.ProductDetailPage;
  else SelectedProductDetail = ClassicTheme.ProductDetailPage;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdProduct) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <SelectedProductDetail
        product={product}
        allImages={allImages}
        discount={discount}
        features={features}
        compatibleModels={compatibleModels}
        relatedProducts={relatedProducts}
      />
    </>
  );
}
