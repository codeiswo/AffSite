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
// 1. HOMEPAGE
// ============================================
export function Homepage({ settings, featuredProducts }) {
  const siteDesc = settings.site_tagline || 'Cyber Fashion & Multi-Category Cashback Portal';

  return (
    <div className="bg-[#030712] text-white min-h-screen relative overflow-hidden">
      {/* Dynamic tech nodes */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Cyber Hero */}
      <section className="relative pt-36 pb-24 border-b border-[#111827]">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent uppercase tracking-widest mb-6">
              <Terminal className="w-3.5 h-3.5 animate-pulse" />
              CYBER_DEALS_ENGINE // VERIFIED_PROMO_v2.0
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-accent leading-tight mb-6">
              {siteDesc}
            </h1>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-mono">
              High-tech cashback aggregation network linking directly to official brand stores. Up to 70% off apparel, tech gear & lifestyle coupons.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-black font-mono font-bold hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.5)] transition-all duration-300 transform hover:-translate-y-0.5 text-center"
              >
                EXPLORE DEALS
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-8 py-4 rounded-xl border border-[#1f2937] hover:border-accent text-white font-mono hover:bg-white/5 transition-all duration-300 text-center"
              >
                CONTACT SUPPORT
              </Link>
            </div>
          </div>
        </div>
      </section>

      <BrandWall />

      {/* Featured Products */}
      <section className="section-padding bg-[#070b13] border-b border-[#111827]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
            <div>
              <p className="text-xs font-mono text-accent uppercase tracking-widest mb-2">// PRODUCT_CATALOG</p>
              <h2 className="text-3xl font-heading font-extrabold text-white">Active Cashback Offers</h2>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-wider mt-4 md:mt-0"
            >
              VIEW ALL DEALS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <TechProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { ProductListPage, ProductDetailPage, SinglePage } from './classic';
