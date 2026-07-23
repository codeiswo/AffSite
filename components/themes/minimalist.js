'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, ShoppingBag, Tag, Percent, Sparkles } from 'lucide-react';
import Hero from '@/components/common/hero';
import BrandWall from '@/components/common/brand-wall';
import ProductCard from '@/components/common/product-card';
import { formatPrice } from '@/lib/utils';

// Helper to render minimal product cards
function MinimalProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <div className="group bg-white border border-gray-200 dark:border-gray-800 p-6 rounded-lg transition-all duration-300 hover:border-gray-900 dark:hover:border-white">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-gray-50 dark:bg-gray-950 rounded mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-bold uppercase tracking-wider">
              -{discount}%
            </div>
          )}
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold">{product.brand || 'Apparel'}</span>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 mb-2 group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-bold text-gray-900 dark:text-white">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-400 line-through">{formatPrice(product.compare_price)}</span>
          )}
        </div>
      </Link>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-900 dark:border-white text-xs font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
      >
        Get Deal <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// ============================================
// 1. HOMEPAGE (Minimalist Scandinavian Theme)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const siteDesc = settings.site_tagline || 'Curated Fashion & Lifestyle Brand Deals';

  const categoriesList = [
    { name: 'Apparel & Fashion', slug: 'apparel', icon: '👗' },
    { name: 'Electronics & Digital', slug: 'digital', icon: '💻' },
    { name: 'Home & Living', slug: 'home', icon: '🛋️' },
    { name: 'Services & Subscriptions', slug: 'services', icon: '⚡' },
    { name: 'Sports & Outdoors', slug: 'sports', icon: '🏃' },
    { name: 'Beauty & Skincare', slug: 'beauty', icon: '💄' },
  ];

  const defaultModules = [
    { id: 'm1', type: 'hero', name: 'Hero Banner', active: true },
    { id: 'm2', type: 'brand_wall', name: 'Partner Brands Wall', active: true },
    { id: 'm3', type: 'product_grid', name: 'Featured Products Grid', active: true },
    { id: 'm4', type: 'category_grid', name: 'Category Explorer Bar', active: true },
    { id: 'm5', type: 'features', name: 'Why Choose Us', active: true },
    { id: 'm6', type: 'testimonials', name: 'Shopper Reviews', active: true }
  ];

  let modules = defaultModules;
  if (settings.homepage_modules) {
    try {
      const parsed = typeof settings.homepage_modules === 'string'
        ? JSON.parse(settings.homepage_modules)
        : settings.homepage_modules;
      if (Array.isArray(parsed) && parsed.length > 0) {
        modules = parsed;
      }
    } catch (_) {}
  }

  const renderModule = (mod, index) => {
    if (mod.active === false) return null;

    switch (mod.type) {
      case 'hero': {
        return (
          <section key={mod.id || index} className="pt-32 pb-20 border-b border-gray-200 dark:border-gray-800 bg-[#FAF9F6] dark:bg-[#121212]">
            <div className="container-custom max-w-5xl">
              <div className="max-w-3xl">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4 block">
                  CURATED LIFESTYLE & HOME DEALS
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal text-gray-900 dark:text-white leading-tight mb-6">
                  {mod.title || siteDesc}
                </h1>
                <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
                  {mod.subtitle || 'Handpicked apparel collections, promo codes, and verified discount offers from official brand stores. No gimmicks, just direct savings.'}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={mod.btnUrl || '/products'}
                    className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
                  >
                    {mod.btnText || 'Browse Collection'}
                  </Link>
                  <Link
                    href="/about"
                    className="px-6 py-3 border-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white font-bold text-sm uppercase tracking-wider transition-colors"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'brand_wall': {
        return <BrandWall key={mod.id || index} title={mod.title} subtitle={mod.subtitle} />;
      }

      case 'product_grid': {
        const displayLimit = mod.limit || 6;
        const productsToDisplay = featuredProducts.slice(0, displayLimit);
        return (
          <section key={mod.id || index} className="section-padding bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
                <div>
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">OUR SELECTION</span>
                  <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
                    {mod.title || 'Featured Offers'}
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mt-4 md:mt-0"
                >
                  Shop All Deals
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToDisplay.map((product) => (
                  <MinimalProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'category_grid': {
        return (
          <section key={mod.id || index} className="py-16 bg-[#FAF9F6] dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800">
            <div className="container-custom max-w-5xl">
              <div className="text-center mb-10">
                <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-2 block">CATEGORIES</span>
                <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
                  {mod.title || 'Browse by Category'}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoriesList.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-center hover:border-gray-900 dark:hover:border-white transition-colors block group"
                  >
                    <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                      {cat.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'rebate_calc':
      case 'features': {
        return (
          <section key={mod.id || index} className="py-20 bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900">
            <div className="container-custom max-w-4xl text-center">
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3 block">WHY CHOOSE US</span>
              <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white mb-12">
                {mod.title || 'Direct Savings & Transparent Discounts'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Direct Merchant Links', desc: 'No middleman delays. Tracked directly with official brand partner stores.' },
                  { title: '100% Free Access', desc: 'Zero hidden membership fees or subscription requirements.' },
                  { title: 'Verified Coupons', desc: 'Promo codes manually verified and updated daily for accuracy.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg text-left">
                    <h3 className="text-base font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-2">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'testimonials': {
        return (
          <section key={mod.id || index} className="py-20 bg-[#FAF9F6] dark:bg-[#121212]">
            <div className="container-custom max-w-4xl text-center">
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-3 block">TESTIMONIALS</span>
              <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white mb-12">
                {mod.title || 'Smart Shopper Experience'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { text: 'Extremely clean UI with direct brand store links. Saved $120 on Burberry coat.', author: 'Sarah M.' },
                  { text: 'No annoying popup ads. Click the deal and check out on Nike directly.', author: 'David K.' },
                  { text: 'Simple, fast, and high discount rates for official store purchases.', author: 'Elena R.' },
                ].map(({ text, author }) => (
                  <div key={author} className="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-4">&ldquo;{text}&rdquo;</p>
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-900 dark:text-white">— {author}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'custom_banner': {
        return (
          <section key={mod.id || index} className="py-12 bg-white dark:bg-black">
            <div className="container-custom max-w-5xl">
              <div className="p-10 border-2 border-gray-900 dark:border-white rounded-lg flex flex-col md:flex-row items-center justify-between gap-8">
                {mod.imageUrl && (
                  <img src={mod.imageUrl} alt={mod.title || 'Banner'} className="w-full md:w-1/2 max-h-60 object-contain rounded" />
                )}
                <div className="space-y-4">
                  {mod.title && <h2 className="text-2xl font-bold uppercase tracking-wider text-gray-900 dark:text-white">{mod.title}</h2>}
                  {mod.subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{mod.subtitle}</p>}
                  {mod.btnText && (
                    <Link
                      href={mod.btnUrl || '/products'}
                      className="inline-block px-6 py-3 border border-gray-900 dark:border-white text-xs font-bold uppercase tracking-wider hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
                    >
                      {mod.btnText}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'custom_html': {
        return (
          <section key={mod.id || index} className="py-8 bg-[#FAF9F6] dark:bg-[#121212]">
            <div className="container-custom max-w-5xl">
              {mod.title && <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">{mod.title}</h3>}
              {mod.htmlContent && <div dangerouslySetInnerHTML={{ __html: mod.htmlContent }} />}
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#FAF9F6] text-gray-900 dark:bg-[#121212] dark:text-gray-100 min-h-screen">
      {modules.map((mod, i) => renderModule(mod, i))}
    </div>
  );
}

export { ProductListPage, ProductDetailPage, SinglePage } from './classic';


