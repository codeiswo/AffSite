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
export { Homepage, ProductListPage, ProductDetailPage, SinglePage } from './classic';

