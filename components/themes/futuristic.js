'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Terminal, Cpu, ShoppingBag, Tag, Percent, Sparkles } from 'lucide-react';
import BrandWall from '@/components/common/brand-wall';
import { formatPrice } from '@/lib/utils';

// Futuristic Dynamic Product Card
function TechProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <div className="group relative bg-[#090b11]/80 backdrop-blur-md border border-[#1b2234] hover:border-accent p-6 rounded-2xl transition-all duration-500 hover:-translate-y-1.5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <Link href={`/product/${product.slug}`} className="block relative z-10">
        <div className="aspect-square bg-black/50 border border-[#141b2b] rounded-xl mb-4 flex items-center justify-center p-8 relative overflow-hidden">
          {discount > 0 && (
            <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-accent text-black text-xs font-mono font-bold tracking-widest animate-pulse">
              -{discount}%
            </div>
          )}
          <img
            src={product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
            alt={product.title}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <span className="text-[10px] font-mono uppercase tracking-widest text-accent/80 flex items-center gap-1.5 mb-1.5">
          <Cpu className="w-3.5 h-3.5" />
          {product.brand || 'OFFICIAL STORE'}
        </span>
        <h3 className="text-lg font-heading font-bold text-white group-hover:text-accent transition-colors line-clamp-1">
          {product.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 mb-4">
          <span className="text-xl font-mono font-bold text-white">{formatPrice(product.price)}</span>
          {product.compare_price && (
            <span className="text-sm text-gray-500 line-through font-mono">{formatPrice(product.compare_price)}</span>
          )}
        </div>
      </Link>

      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="relative z-10 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold uppercase tracking-wider hover:bg-accent hover:text-black transition-all duration-300"
      >
        CLAIM DEAL & REBATE <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// ============================================
// 1. HOMEPAGE (Futuristic / Cyberpunk High-Tech Theme)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const siteDesc = settings.site_tagline || 'Cyber Fashion & Multi-Category Cashback Portal';

  const defaultModules = [
    { id: 'm1', type: 'hero', name: 'Hero Banner', active: true },
    { id: 'm2', type: 'brand_wall', name: 'Partner Brands Wall', active: true },
    { id: 'm3', type: 'product_grid', name: 'Featured Products Grid', active: true },
    { id: 'm4', type: 'category_grid', name: 'Category Explorer Bar', active: true },
    { id: 'm5', type: 'rebate_calc', name: 'Interactive Rebate Calculator', active: true },
    { id: 'm6', type: 'features', name: 'Why Choose Us', active: true }
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
          <section key={mod.id || index} className="relative pt-36 pb-24 border-b border-[#111827] bg-[#030712]">
            <div className="container-custom relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent uppercase tracking-widest mb-6">
                  <Terminal className="w-3.5 h-3.5 animate-pulse" />
                  CYBER_DEALS_ENGINE // VERIFIED_PROMO_v2.0
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-accent leading-tight mb-6">
                  {mod.title || siteDesc}
                </h1>
                <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
                  {mod.subtitle || 'High-tech cashback aggregation network linking directly to official brand stores. Up to 70% off apparel, tech gear & lifestyle coupons.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href={mod.btnUrl || '/products'}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
                  >
                    {mod.btnText || 'EXPLORE DEALS'}
                  </Link>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1f2937] hover:border-accent text-white font-mono hover:bg-white/5 transition-all duration-300 text-center"
                  >
                    CONTACT SUPPORT
                  </Link>
                </div>
              </div>

              {/* Cyber Live Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-16 p-4 rounded-2xl bg-black/40 border border-[#1e293b] backdrop-blur-xl font-mono text-center">
                <div className="p-3">
                  <p className="text-xs text-gray-500 uppercase">// REBATES_DISBURSED</p>
                  <p className="text-xl font-bold text-accent">$2,450,000+</p>
                </div>
                <div className="p-3 border-y sm:border-y-0 sm:border-x border-[#1e293b]">
                  <p className="text-xs text-gray-500 uppercase">// LATENCY_OUTBOUND</p>
                  <p className="text-xl font-bold text-emerald-400">&lt; 15ms Direct</p>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 uppercase">// VERIFIED_STORES</p>
                  <p className="text-xl font-bold text-purple-400">1,500+ Active</p>
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
          <section key={mod.id || index} className="section-padding bg-[#070b13] border-b border-[#111827]">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                <div>
                  <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">// PRODUCT_CATALOG</p>
                  <h2 className="text-3xl font-heading font-extrabold text-white">
                    {mod.title || 'Active Cashback Offers'}
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mt-4 md:mt-0"
                >
                  VIEW ALL DEALS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {productsToDisplay.map((product) => (
                  <TechProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'category_grid': {
        return (
          <section key={mod.id || index} className="py-16 bg-[#030712] border-b border-[#111827]">
            <div className="container-custom">
              <div className="text-center mb-10">
                <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">// CATEGORY_MATRIX</p>
                <h2 className="text-3xl font-heading font-extrabold text-white">
                  {mod.title || 'Explore Cyber Channels'}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { name: 'Apparel', slug: 'apparel', code: 'CH_01' },
                  { name: 'Digital 3C', slug: 'digital', code: 'CH_02' },
                  { name: 'Home Living', slug: 'home', code: 'CH_03' },
                  { name: 'Services', slug: 'services', code: 'CH_04' },
                  { name: 'Sports', slug: 'sports', code: 'CH_05' },
                  { name: 'Beauty', slug: 'beauty', code: 'CH_06' },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className="p-5 rounded-xl bg-[#090b11] border border-[#1b2234] hover:border-accent text-center font-mono transition-all group block"
                  >
                    <span className="text-[10px] text-accent/70 block mb-1">{cat.code}</span>
                    <span className="text-sm font-bold text-white group-hover:text-accent transition-colors">
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
          <section key={mod.id || index} className="py-20 bg-[#070b13] border-b border-[#111827]">
            <div className="container-custom max-w-4xl text-center">
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">// PROTOCOL_FEATURES</p>
              <h2 className="text-3xl font-heading font-extrabold text-white mb-12">
                {mod.title || 'Encrypted Direct Merchant Tracking'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-left">
                {[
                  { tag: 'SYS_01', title: 'Direct Tracking API', desc: 'Instant merchant referral link tokenization with zero proxy latency.' },
                  { tag: 'SYS_02', title: 'Zero Friction Access', desc: 'No user logins required to claim promo discount vouchers.' },
                  { tag: 'SYS_03', title: 'Automated Audit', desc: 'Coupons tested with merchant checkout API on 24-hour cycles.' },
                ].map(({ tag, title, desc }) => (
                  <div key={tag} className="p-6 rounded-2xl bg-[#090b11] border border-[#1b2234]">
                    <span className="text-[10px] text-accent font-bold block mb-2">{tag}</span>
                    <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'custom_banner': {
        return (
          <section key={mod.id || index} className="py-12 bg-[#030712]">
            <div className="container-custom">
              <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-accent/10 via-purple-900/20 to-black border border-accent/30 backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
                {mod.imageUrl && (
                  <img src={mod.imageUrl} alt={mod.title || 'Banner'} className="w-full md:w-1/2 max-h-64 object-contain rounded-xl border border-accent/20" />
                )}
                <div className="space-y-4 font-mono">
                  {mod.title && <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{mod.title}</h2>}
                  {mod.subtitle && <p className="text-sm text-gray-400">{mod.subtitle}</p>}
                  {mod.btnText && (
                    <Link
                      href={mod.btnUrl || '/products'}
                      className="inline-block px-6 py-3 rounded-xl bg-accent text-black font-bold text-xs uppercase tracking-widest hover:bg-accent/80 transition-colors"
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
          <section key={mod.id || index} className="py-8 bg-[#030712] font-mono">
            <div className="container-custom">
              {mod.title && <h3 className="text-xs text-accent uppercase tracking-widest mb-4">// {mod.title}</h3>}
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
    <div className="bg-[#030712] text-white min-h-screen relative overflow-hidden">
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      {modules.map((mod, i) => renderModule(mod, i))}
    </div>
  );
}

export { ProductListPage, ProductDetailPage, SinglePage } from './classic';


