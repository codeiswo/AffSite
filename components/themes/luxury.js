'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, ShoppingBag, Tag, Percent, Sparkles } from 'lucide-react';
import BrandWall from '@/components/common/brand-wall';
import { formatPrice } from '@/lib/utils';

// Luxury Gold-Bordered Product Card
function LuxuryProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <div className="group bg-[#0f0f11] border border-gold/10 hover:border-gold/50 p-6 rounded-none transition-all duration-700 hover:shadow-[0_10px_30px_rgba(212,168,75,0.08)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-square bg-black border border-gold/5 rounded-none mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 bg-[#d4a84b] text-black text-xs font-heading font-bold uppercase tracking-wider">
              {discount}% OFF
            </div>
          )}
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#d4a84b]/80 font-heading block mb-1">{product.brand || 'Luxury Store'}</span>
        <h3 className="text-lg font-heading font-bold text-white group-hover:text-[#d4a84b] transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 mb-4">
          <span className="text-xl font-heading text-[#d4a84b]">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through font-heading">{formatPrice(product.compare_price)}</span>
          )}
        </div>
      </Link>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#d4a84b]/50 text-[#d4a84b] font-heading text-xs font-bold uppercase tracking-widest hover:bg-[#d4a84b] hover:text-black transition-all duration-500"
      >
        SHOP BOUTIQUE DEAL <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// ============================================
// 1. HOMEPAGE (Haute Couture Luxury Boutique Theme)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const siteDesc = settings.site_tagline || 'Haute Couture & Luxury Fashion Brand Directory';

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
          <section key={mod.id || index} className="relative pt-36 pb-28 border-b border-[#d4a84b]/20 text-center flex items-center justify-center overflow-hidden bg-[#070708]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,168,75,0.05)_0%,transparent_70%)]" />
            
            <div className="container-custom relative z-10 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-[1px] bg-[#d4a84b]/40" />
                <Star className="w-4 h-4 text-[#d4a84b] fill-[#d4a84b]" />
                <div className="w-12 h-[1px] bg-[#d4a84b]/40" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white leading-tight mb-6 tracking-wide">
                {mod.title || siteDesc}
              </h1>
              
              <div className="w-24 h-[1px] bg-[#d4a84b]/50 mx-auto mb-8" />

              <p className="text-base sm:text-lg text-[#a1a1a5] max-w-2xl mx-auto mb-10 leading-relaxed font-heading italic">
                {mod.subtitle || 'Discover designer fashion discounts, luxury apparel promo codes, and exclusive store links from Burberry, Gucci, Prada & luxury partner boutiques.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  href={mod.btnUrl || '/products'}
                  className="px-8 py-3.5 border border-[#d4a84b] text-black bg-[#d4a84b] hover:bg-transparent hover:text-[#d4a84b] font-heading font-bold tracking-widest text-xs uppercase transition-all duration-500 rounded-none shadow-[0_4px_20px_rgba(212,168,75,0.15)]"
                >
                  {mod.btnText || 'DISCOVER LUXURY DEALS'}
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 border border-[#d4a84b]/30 hover:border-[#d4a84b] text-white font-heading font-bold tracking-widest text-xs uppercase transition-all duration-500 rounded-none"
                >
                  OUR PROMISE
                </Link>
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
          <section key={mod.id || index} className="section-padding bg-black border-b border-[#d4a84b]/20">
            <div className="container-custom">
              <div className="text-center mb-16">
                <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
                  - CURATED SELECTION -
                </p>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                  {mod.title || 'Signature Offers'}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToDisplay.map((product) => (
                  <LuxuryProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'category_grid': {
        return (
          <section key={mod.id || index} className="py-20 bg-[#070708] border-b border-[#d4a84b]/20">
            <div className="container-custom">
              <div className="text-center mb-12">
                <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
                  - BOUTIQUE DIRECTORY -
                </p>
                <h2 className="text-3xl font-heading font-bold text-white">
                  {mod.title || 'Haute Categories'}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Fashion & Couture', slug: 'apparel' },
                  { name: 'Jewelry & Watches', slug: 'jewelry' },
                  { name: 'Boutique Beauty', slug: 'beauty' },
                  { name: 'Luxury Living', slug: 'home' },
                  { name: 'High-End Tech', slug: 'digital' },
                  { name: 'VIP Services', slug: 'services' },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="p-6 bg-[#0f0f11] border border-[#d4a84b]/20 hover:border-[#d4a84b] text-center transition-all group block"
                  >
                    <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#d4a84b] group-hover:text-white transition-colors">
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
          <section key={mod.id || index} className="py-24 bg-black border-b border-[#d4a84b]/20">
            <div className="container-custom max-w-4xl text-center">
              <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
                - OUR PROMISE -
              </p>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-16">
                {mod.title || 'Boutique Authenticity & Exclusive Privileges'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Official Merchants', desc: 'Direct affiliate integration with verified flagship brand stores.' },
                  { title: 'VIP Store Offers', desc: 'Privileged store links ensuring maximum savings on luxury purchases.' },
                  { title: 'Curated Deals', desc: 'Hand-vetted coupon codes tailored for discerning shoppers.' },
                ].map(({ title, desc }) => (
                  <div key={title} className="p-8 bg-[#0f0f11] border border-[#d4a84b]/20 text-center">
                    <Star className="w-5 h-5 text-[#d4a84b] fill-[#d4a84b] mx-auto mb-4" />
                    <h3 className="text-lg font-heading font-bold text-white mb-3">{title}</h3>
                    <p className="text-xs text-[#a1a1a5] leading-relaxed font-heading italic">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'testimonials': {
        return (
          <section key={mod.id || index} className="py-24 bg-[#070708]">
            <div className="container-custom max-w-4xl text-center">
              <p className="text-xs font-semibold text-[#d4a84b] uppercase tracking-widest mb-3">
                - CLIENT EXPERIENCES -
              </p>
              <h2 className="text-3xl font-heading font-bold text-white mb-16">
                {mod.title || 'Trusted by Discerning Shoppers'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {[
                  { text: 'Saved over $200 on my designer trench coat. Outstanding luxury portal.', author: 'Victoria R.' },
                  { text: 'Seamless redirection to official brand boutiques with guaranteed discount offers.', author: 'Charles B.' },
                  { text: 'High-end interface without spammy ads. Exceptional service.', author: 'Sophia L.' },
                ].map(({ text, author }) => (
                  <div key={author} className="p-8 bg-[#0f0f11] border border-[#d4a84b]/20">
                    <p className="text-xs text-[#a1a1a5] font-heading italic leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                    <span className="text-xs font-heading font-bold uppercase tracking-widest text-[#d4a84b]">— {author}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'custom_banner': {
        return (
          <section key={mod.id || index} className="py-16 bg-black">
            <div className="container-custom">
              <div className="p-10 md:p-14 bg-[#0f0f11] border border-[#d4a84b]/40 flex flex-col md:flex-row items-center justify-between gap-8">
                {mod.imageUrl && (
                  <img src={mod.imageUrl} alt={mod.title || 'Banner'} className="w-full md:w-1/2 max-h-64 object-contain border border-[#d4a84b]/20" />
                )}
                <div className="space-y-4 text-center md:text-left">
                  {mod.title && <h2 className="text-2xl sm:text-3xl font-heading font-bold text-white">{mod.title}</h2>}
                  {mod.subtitle && <p className="text-sm text-[#a1a1a5] font-heading italic">{mod.subtitle}</p>}
                  {mod.btnText && (
                    <Link
                      href={mod.btnUrl || '/products'}
                      className="inline-block px-8 py-3.5 bg-[#d4a84b] text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors"
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
          <section key={mod.id || index} className="py-8 bg-[#070708]">
            <div className="container-custom">
              {mod.title && <h3 className="text-xs font-heading text-[#d4a84b] uppercase tracking-widest mb-4">{mod.title}</h3>}
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
    <div className="bg-[#070708] text-[#e5e5e7] min-h-screen">
      {modules.map((mod, i) => renderModule(mod, i))}
    </div>
  );
}

export { ProductListPage, ProductDetailPage, SinglePage } from './classic';


