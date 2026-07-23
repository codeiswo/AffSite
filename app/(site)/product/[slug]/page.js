import { getProductBySlug, getProducts, getSettings } from '@/lib/db';
import { notFound } from 'next/navigation';
import { parseJSON } from '@/lib/utils';
import { getThemeArchetype } from '@/lib/theme';
import * as ClassicTheme from '@/components/themes/classic';
import * as MinimalistTheme from '@/components/themes/minimalist';
import * as FuturisticTheme from '@/components/themes/futuristic';
import * as LuxuryTheme from '@/components/themes/luxury';

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

const fallbackProduct = {
  id: 1, title: 'Samsung DA29-00020B Water Filter Replacement', slug: 'samsung-da29-00020b-replacement',
  description: 'High-performance replacement water filter compatible with Samsung DA29-00020B.',
  content: '<h2>Premium Water Filtration</h2><p>Our premium replacement filter delivers crystal-clear water.</p>',
  price: 29.99, compare_price: 49.99, brand: 'Samsung', category: 'Refrigerator Water Filters',
  image_url: 'https://placehold.co/600x600/0F4C81/FFFFFF?text=Samsung+Filter',
  gallery: '["https://placehold.co/600x600/0F4C81/FFFFFF?text=Side+View","https://placehold.co/600x600/0F4C81/FFFFFF?text=Install"]',
  compatible_models: '["RF28HMEDBSR","RF263BEAESR","RF28HFEDBSR","RF23HCEDBSR"]',
  features: '["NSF 42 & 53 Certified","6-Month Filter Life","300 Gallon Capacity","Reduces 99% of Lead","Easy Twist & Lock"]',
  meta_title: 'Samsung DA29-00020B Water Filter', meta_description: 'Premium Samsung water filter replacement.'
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { product = null; }
  if (!product) product = fallbackProduct;

  return {
    title: product.meta_title || product.title,
    description: product.meta_description || product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { product = null; }

  if (!product) {
    if (slug === fallbackProduct.slug) {
      product = fallbackProduct;
    } else {
      notFound();
    }
  }

  const gallery = parseJSON(product.gallery);
  const features = parseJSON(product.features);
  const compatibleModels = parseJSON(product.compatible_models);
  const allImages = Array.from(new Set([product.image_url, ...gallery].filter(Boolean)));
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;

  // Related products
  let relatedProducts = [];
  try {
    const result = await getProducts({ brand: product.brand, limit: 4 });
    relatedProducts = (result.products || []).filter(p => p.id !== product.id).slice(0, 3);
  } catch { /* ignore */ }

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: allImages,
    brand: { '@type': 'Brand', name: product.brand },
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'FiltersPro' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  let settings = {};
  try {
    settings = await getSettings();
  } catch (_) {}

  const theme = settings.site_theme || 'default';
  const archetype = getThemeArchetype(theme);

  let SelectedProductDetail;
  if (archetype === 'minimalist') SelectedProductDetail = MinimalistTheme.ProductDetail;
  else if (archetype === 'futuristic') SelectedProductDetail = FuturisticTheme.ProductDetail;
  else if (archetype === 'luxury') SelectedProductDetail = LuxuryTheme.ProductDetail;
  else SelectedProductDetail = ClassicTheme.ProductDetail;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
