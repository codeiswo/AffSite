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
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  let product;
  try { product = await getProductBySlug(slug); } catch { product = null; }
  if (!product) product = fallbackProduct;

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = settings.site_url || 'https://www.affsite.com';
  const canonicalUrl = `${baseUrl}/product/${product.slug}`;

  return {
    title: product.meta_title || product.title,
    description: product.meta_description || product.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: product.meta_title || product.title,
      description: product.meta_description || product.description,
      url: canonicalUrl,
      type: 'product',
      images: [
        {
          url: product.image_url || '/opengraph-image.png',
          width: 800,
          height: 800,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: product.meta_title || product.title,
      description: product.meta_description || product.description,
      images: [product.image_url || '/opengraph-image.png'],
    },
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

  let settings = {};
  try { settings = await getSettings(); } catch (_) {}
  const baseUrl = settings.site_url || 'https://www.affsite.com';

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

  // JSON-LD Product & Breadcrumb Schema
  const jsonLdProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: allImages,
    brand: { '@type': 'Brand', name: product.brand || 'Generic' },
    sku: product.sku || `SKU-${product.id}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.affiliate_link || `${baseUrl}/product/${product.slug}`,
      seller: { '@type': 'Organization', name: settings.site_name || 'AffSite Deals' },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
    },
  };

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Products', item: `${baseUrl}/products` },
      { '@type': 'ListItem', position: 3, name: product.title, item: `${baseUrl}/product/${product.slug}` }
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
