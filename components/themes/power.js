'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Star, CheckCircle2, ChevronRight, Package, ShoppingBag, 
  Zap, ShieldCheck, BatteryCharging, Sun, Shield, Award, HelpCircle, ChevronDown, 
  Cpu, Flame, ExternalLink, RefreshCw, ThumbsUp, MessageSquare
} from 'lucide-react';
import BrandWall from '@/components/common/brand-wall';
import { formatPrice } from '@/lib/utils';

// ============================================
// POWER STYLING UTILS & PRODUCT CARD
// ============================================
function PowerProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-sm ring-1 ring-stone-900/[0.04] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-orange-500/50">
      {/* Product Image Area */}
      <div className="relative h-72 overflow-hidden bg-stone-50 flex items-center justify-center p-6 border-b border-stone-100">
        {discount > 0 && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-extrabold text-[11px] shadow-md tracking-wider">
            {discount}% OFF
          </span>
        )}
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
          alt={product.title}
          className="h-full w-full object-contain object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Product Details Area */}
      <div className="flex flex-1 flex-col p-6 space-y-3">
        <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-orange-600 uppercase tracking-widest">
          <Zap className="w-3.5 h-3.5 fill-orange-500" />
          <span>{product.brand || 'POWER GENERATOR'}</span>
        </div>

        <h3 className="flex-1 font-heading font-extrabold text-base leading-snug text-stone-900 line-clamp-2 group-hover:text-orange-600 transition-colors">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        {/* Price Tag */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-2xl font-extrabold text-stone-950 font-mono">{formatPrice(product.price)}</span>
          {product.compare_price > 0 && (
            <span className="text-xs text-stone-400 line-through font-mono">{formatPrice(product.compare_price)}</span>
          )}
        </div>

        {/* Outbound Link Button */}
        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-5 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md shadow-orange-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95"
        >
          <span>Shop Official Store</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </article>
  );
}

// ============================================
// 1. HOMEPAGE (Jackery Inspired Power Station Theme)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const [openFaq, setOpenFaq] = useState(null);
  const siteDesc = settings.site_tagline || 'Engineered for Performance — Official Power Station Store';

  const faqs = [
    {
      q: 'What can a portable power station run?',
      a: 'Capacity determines runtime. Our Explorer and Solar Generator units span 200Wh to 3,000Wh+. A mid-size power station comfortably runs a full-size refrigerator, CPAP machines, laptops, TV, and lights during grid outages or off-grid camping trips.'
    },
    {
      q: 'How long does the LiFePO4 battery pack last over time?',
      a: 'Every flagship power station features automotive-grade LiFePO4 cells rated for 3,000+ full charge cycles before reaching 70% original capacity. That equates to roughly 10 years of weekly use with maximum thermal stability.'
    },
    {
      q: 'Can I recharge directly from solar panels?',
      a: 'Yes. Every model includes a built-in MPPT charge controller for seamless solar panel integration. Larger units accept up to 1,400W solar input for fast, 100% fuel-free recharging outdoors.'
    },
    {
      q: 'Is it completely safe for indoor emergency home backup?',
      a: 'Absolutely. Unlike gas generators, zero emissions and noise under 30dB mean you can operate units safely inside bedrooms, RVs, tents, or living rooms. Integrated BMS monitors 62 protection points in real-time.'
    }
  ];

  const defaultModules = [
    { id: 'm1', type: 'hero', name: 'Hero Power Banner', active: true },
    { id: 'm2', type: 'about_story', name: 'Jackery Story & Technology Breakdown', active: true },
    { id: 'm3', type: 'product_grid', name: 'Featured Power Units Grid', active: true },
    { id: 'm4', type: 'tech_specs', name: 'Key Advantages & Specs', active: true },
    { id: 'm5', type: 'faq', name: 'Frequently Asked Questions', active: true }
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
          <section key={mod.id || index} className="relative isolate overflow-hidden bg-stone-950 pt-28 pb-20 sm:pt-36 sm:pb-28">
            {/* Background image & dark overlay */}
            <div className="absolute inset-0 -z-20 bg-[url('https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center opacity-25" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950/90 via-stone-950/80 to-stone-900" />

            <div className="container-custom max-w-5xl text-center relative z-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-orange-400 backdrop-blur-sm mb-6">
                <Star className="w-3.5 h-3.5 fill-orange-400" />
                ENGINEERED TO PERFORM // OFFICIAL STORE
              </div>

              {/* Headline */}
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] drop-shadow-2xl">
                {mod.title || siteDesc}
              </h1>

              {/* Orange Gradient Accent Bar */}
              <div className="mx-auto mt-6 h-1.5 w-24 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500 shadow-lg shadow-orange-500/50" />

              {/* Subtitle */}
              <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-200 font-medium">
                {mod.subtitle || 'Welcome to the official power station portal. Engineered with LiFePO4 cell chemistry, intelligent BMS battery management, and ultra-fast solar recharging for reliable off-grid energy.'}
              </p>

              {/* Action Buttons */}
              <div className="mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/products"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-2xl shadow-orange-600/40 transition-all duration-300 hover:shadow-orange-500/60 hover:scale-105 active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Official Units</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#about-story"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:bg-white/20 backdrop-blur-md"
                >
                  <span>Explore Technology</span>
                  <ChevronDown className="w-4 h-4" />
                </a>
              </div>
            </div>
          </section>
        );
      }

      case 'about_story': {
        return (
          <section id="about-story" key={mod.id || index} className="py-20 bg-white border-b border-stone-200/60">
            <div className="container-custom max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Card Image Showcase */}
                <div className="lg:col-span-5 relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 border border-stone-200 shadow-2xl relative">
                    <img
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                      alt="Jackery Portable Power Station Technology"
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-stone-900/90 backdrop-blur-md border border-white/10 text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shrink-0 shadow-md">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-orange-400">Automotive Grade</p>
                        <p className="text-xs text-stone-300">LiFePO4 3,000+ Cycle Durability</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Story Content */}
                <div className="lg:col-span-7 space-y-6">
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700">
                    <ShieldCheck className="w-4 h-4 text-orange-600" />
                    Power Technology
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-950 tracking-tight leading-tight">
                    Engineered Around Real-World Off-Grid Performance
                  </h2>
                  <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-400 to-amber-600 shadow-sm" />

                  <div className="space-y-4 text-sm text-stone-600 leading-relaxed font-medium pt-2">
                    <p>
                      For over a decade, our mission has been focused on delivering clean, quiet, and dependable energy. Every unit pairs automotive-grade LiFePO4 cells with intelligent battery management, turning solar panels and wall outlets into reliable AC/DC power.
                    </p>
                    <p>
                      Pure sine wave inverters safeguard sensitive laptops, medical CPAP equipment, and refrigerators. Dual fast-charging technology allows 0 to 80% recharging in as little as 60 minutes.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <p className="text-2xl font-extrabold font-mono text-stone-900">3,000+</p>
                      <p className="text-xs text-stone-500 font-semibold mt-1">Full Charge Cycles to 70%</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                      <p className="text-2xl font-extrabold font-mono text-stone-900">60 Min</p>
                      <p className="text-xs text-stone-500 font-semibold mt-1">Emergency Super Charging</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'product_grid': {
        return (
          <section key={mod.id || index} className="py-20 bg-stone-100/60 border-b border-stone-200/60">
            <div className="container-custom max-w-6xl">
              <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-3">
                    <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
                    Featured Lineup
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-950 tracking-tight">
                    Featured Portable Power Stations
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-orange-600 hover:text-orange-700 transition-colors uppercase tracking-wider"
                >
                  <span>View All Lineup</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.map((p) => (
                  <PowerProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'tech_specs': {
        return (
          <section key={mod.id || index} className="py-20 bg-stone-900 text-white">
            <div className="container-custom max-w-6xl">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-400 mb-3">
                  <BatteryCharging className="w-4 h-4 text-orange-400" />
                  Key Specifications & Advantages
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-white">
                  Why Adventurers & Homeowners Trust Our Gear
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 space-y-4 hover:border-orange-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/20">
                    <BatteryCharging className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-white">LiFePO4 Long Battery Life</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    Automotive-grade cell chemistry engineered for over 3,000 charging cycles — roughly 10 full years of weekly outdoor use.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 space-y-4 hover:border-orange-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                    <Sun className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-white">Solar Generator Integration</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    Plug-and-play MPPT controller supports up to 1,400W solar panel input for 100% clean, silent, fuel-free energy anywhere.
                  </p>
                </div>

                <div className="p-8 rounded-3xl bg-stone-800/80 border border-stone-700/80 space-y-4 hover:border-orange-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-heading font-extrabold text-white">Safe Indoor Zero-Emissions</h3>
                  <p className="text-xs text-stone-400 leading-relaxed font-medium">
                    Zero gas fumes or carbon monoxide. Operating under 30dB, units are safe for bedrooms, living rooms, and tents.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'faq': {
        return (
          <section key={mod.id || index} className="py-20 bg-white">
            <div className="container-custom max-w-4xl">
              <div className="text-center mb-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-3">
                  <HelpCircle className="w-4 h-4 text-orange-600" />
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-950 tracking-tight">
                  Power Station FAQs & Guidance
                </h2>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/50">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-6 text-left font-heading font-extrabold text-stone-900 flex items-center justify-between gap-4 hover:text-orange-600 transition-colors cursor-pointer"
                    >
                      <span className="text-base sm:text-lg">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-orange-600' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-6 pb-6 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200/60 pt-4 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased font-sans">
      {modules.map((mod, index) => renderModule(mod, index))}
    </div>
  );
}

// ============================================
// 2. PRODUCT LIST PAGE (Power Theme Catalog)
// ============================================
export function ProductListPage({ products = [], categories = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  let filtered = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (sortBy === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-high') filtered.sort((a, b) => b.price - a.price);

  return (
    <div className="pt-28 pb-20 bg-stone-100/60 min-h-screen">
      <div className="container-custom max-w-6xl">
        {/* Header Title */}
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-2">
            <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
            Official Store Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-stone-950">
            Portable Power Stations & Solar Generators
          </h1>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-sm mb-8">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              All Products
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setSelectedCategory(c.slug)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === c.slug
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs font-bold text-stone-800 outline-none"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <PowerProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Re-export shared ProductDetailPage & SinglePage from classic
export { ProductDetailPage, SinglePage } from './classic';
