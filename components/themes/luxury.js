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
        CLAIM BOUTIQUE REBATE <ArrowRight className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}

// ============================================
// 1. HOMEPAGE
// ============================================
export { Homepage, ProductListPage, ProductDetailPage, SinglePage } from './classic';

