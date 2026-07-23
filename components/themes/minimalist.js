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
// 1. HOMEPAGE
// ============================================
export function Homepage({ settings, featuredProducts }) {
  const siteTitle = settings.site_name || 'AffSite Deals';
  const siteDesc = settings.site_tagline || 'Curated Fashion Cashback Deals & Exclusive Coupons';

  return (
    <div className="bg-[#FAF9F6] text-gray-900 dark:bg-[#121212] dark:text-gray-100 min-h-screen">
      {/* Minimal Hero */}
      <section className="pt-32 pb-20 border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom max-w-5xl">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4 block">
              CURATED FASHION & LIFESTYLE REBATES
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-normal text-gray-900 dark:text-white leading-tight mb-6">
              {siteDesc}
            </h1>
            <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
              Handpicked apparel collections, promo codes, and verified cashback offers from official brand stores. No gimmicks, just direct savings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300"
              >
                Browse Collection
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

      <BrandWall />

      {/* Featured Products */}
      <section className="section-padding bg-white dark:bg-black border-b border-gray-100 dark:border-gray-900">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Our Store</span>
              <h2 className="text-3xl font-heading font-normal text-gray-900 dark:text-white">
                Featured Fashion Offers
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
            {featuredProducts.map((product) => (
              <MinimalProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { ProductListPage, ProductDetailPage, SinglePage } from './classic';
