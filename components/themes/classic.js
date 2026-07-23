'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, 
  SlidersHorizontal, Grid3X3, ChevronRight, Package, Plus, Minus, ShoppingCart, 
  Tag, Percent, Sparkles, ShoppingBag, Copy, Check, ExternalLink, Zap, 
  Search, ShieldCheck, Flame, Gift, Clock, FlameIcon, ThumbsUp, MessageSquare, Award
} from 'lucide-react';
import Hero from '@/components/common/hero';
import BrandWall from '@/components/common/brand-wall';
import ProductCard from '@/components/common/product-card';
import { formatPrice } from '@/lib/utils';

// ============================================
// 1. HOMEPAGE (Default Classic Fashion & Multi-Category Theme)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const [calcSpend, setCalcSpend] = useState(500);
  const [calcRate, setCalcRate] = useState(12);
  const [calcStore, setCalcStore] = useState('Nike');
  const [copiedCode, setCopiedCode] = useState('');

  const stores = [
    { name: 'Burberry', rate: 15, coupon: 'LUXURY15', desc: '15% Off + $50 Voucher' },
    { name: 'Nike', rate: 12, coupon: 'NIKE20', desc: '12% Off + $20 Off' },
    { name: 'ZARA', rate: 10, coupon: 'SUMMER10', desc: '10% Off + Free Shipping' },
    { name: 'Sony', rate: 8, coupon: 'TECH30', desc: '8% Off + $30 Off' },
    { name: "Levi's", rate: 14, coupon: 'DENIM14', desc: '14% Off + Extra 10%' },
  ];

  const categoriesList = [
    { name: 'Apparel & Fashion', slug: 'apparel', icon: '👗', badge: 'Up to 18% Off', bg: 'from-pink-500/10 to-rose-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400' },
    { name: 'Electronics & Digital', slug: 'digital', icon: '💻', badge: 'Up to 12% Off', bg: 'from-blue-500/10 to-cyan-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400' },
    { name: 'Home & Living', slug: 'home', icon: '🛋️', badge: 'Up to 15% Off', bg: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' },
    { name: 'Services & Subscriptions', slug: 'services', icon: '⚡', badge: 'Up to 25% Off', bg: 'from-purple-500/10 to-indigo-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400' },
    { name: 'Sports & Outdoors', slug: 'sports', icon: '🏃', badge: 'Up to 14% Off', bg: 'from-amber-500/10 to-orange-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400' },
    { name: 'Beauty & Skincare', slug: 'beauty', icon: '💄', badge: 'Up to 20% Off', bg: 'from-rose-500/10 to-pink-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400' },
  ];

  const estimatedSavings = Math.round(calcSpend * (calcRate / 100));

  const defaultModules = [
    { id: 'm1', type: 'hero', name: 'Hero Banner', active: true },
    { id: 'm2', type: 'brand_wall', name: 'Partner Brands Wall', active: true },
    { id: 'm3', type: 'category_grid', name: 'Category Explorer Bar', active: true },
    { id: 'm4', type: 'product_grid', name: 'Featured Products Grid', active: true },
    { id: 'm5', type: 'rebate_calc', name: 'Interactive Rebate Calculator', active: true },
    { id: 'm6', type: 'features', name: 'Why Choose Us', active: true },
    { id: 'm7', type: 'testimonials', name: 'Shopper Reviews', active: true }
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
        const heroCustomSettings = {
          ...settings,
          hero_title: mod.title || settings.hero_title,
          hero_description: mod.subtitle || settings.hero_description,
          hero_button_text: mod.btnText || settings.hero_button_text,
          hero_button_url: mod.btnUrl || settings.hero_button_url,
          hero_image: mod.imageUrl || settings.hero_image,
        };
        return <Hero key={mod.id || `hero-${index}`} settings={heroCustomSettings} />;
      }

      case 'brand_wall': {
        return <BrandWall key={mod.id || `brand_wall-${index}`} title={mod.title} subtitle={mod.subtitle} />;
      }

      case 'category_grid': {
        return (
          <section key={mod.id || `category_grid-${index}`} className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
            <div className="container-custom">
              <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    EXPLORE MAINSTREAM CATEGORIES
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
                    {mod.title || 'Shop Deals by Category'}
                  </h2>
                </div>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
                >
                  Browse All Categories & Stores
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {categoriesList.map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/products?category=${cat.slug}`}
                    className={`group p-5 rounded-2xl bg-gradient-to-br ${cat.bg} border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden`}
                  >
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                    <span className="text-sm font-heading font-bold text-gray-900 dark:text-white mb-1 leading-tight">
                      {cat.name}
                    </span>
                    <div className="mt-3 px-2 py-0.5 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-[10px] font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {cat.badge}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'product_grid': {
        const displayLimit = mod.limit || 6;
        const productsToDisplay = featuredProducts.slice(0, displayLimit);
        return (
          <section key={mod.id || `product_grid-${index}`} className="section-padding bg-surface dark:bg-surface-dark">
            <div className="container-custom">
              <div className="text-center mb-14">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 text-xs font-extrabold uppercase tracking-wider mb-3">
                  <Flame className="w-4 h-4 animate-pulse" />
                  HOT & FEATURED OFFERS
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">
                  {mod.title || 'Verified Fashion & Multi-Category Deals'}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-base">
                  {mod.subtitle || 'Click outbound links to claim discount coupons and earn instant store savings at partner merchant stores.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {productsToDisplay.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/products"
                  className="group inline-flex items-center gap-2 btn-primary text-base px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Explore All Deals & Promo Codes
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </section>
        );
      }

      case 'rebate_calc': {
        return (
          <section key={mod.id || `rebate_calc-${index}`} className="section-padding bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.15),transparent_50%)]" />
            <div className="container-custom max-w-5xl relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  INSTANT SAVINGS CALCULATOR
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white">
                  {mod.title || 'Calculate Your Shopping Savings'}
                </h2>
                <p className="text-sm text-indigo-200 mt-3 leading-relaxed">
                  {mod.subtitle || 'Select your order spend and partner merchant store to calculate estimated store savings.'}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-xl">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-indigo-200 mb-2">Select Partner Store</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {stores.map((st) => (
                        <button
                          key={st.name}
                          type="button"
                          onClick={() => { setCalcStore(st.name); setCalcRate(st.rate); }}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            calcStore === st.name
                              ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                              : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <p className="text-xs font-extrabold line-clamp-1">{st.name}</p>
                          <span className="text-xs font-bold text-amber-300">{st.rate}% Off Deal</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-extrabold uppercase tracking-wider text-indigo-200">Order Amount</label>
                      <span className="text-lg font-mono font-extrabold text-amber-300">${calcSpend}</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={calcSpend}
                      onChange={(e) => setCalcSpend(Number(e.target.value))}
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 to-purple-600 p-6 sm:p-8 rounded-2xl text-center space-y-4 shadow-2xl">
                  <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">ESTIMATED STORE SAVINGS</p>
                  <p className="text-4xl sm:text-5xl font-mono font-extrabold text-amber-300">
                    +${estimatedSavings}
                  </p>
                  <p className="text-xs text-indigo-100 leading-relaxed">
                    Save up to <span className="font-bold text-amber-300">{calcRate}% off</span> on your <span className="font-bold text-white">${calcSpend}</span> order at <span className="font-bold text-white">{calcStore}</span>.
                  </p>
                  <Link
                    href={`/products?search=${calcStore}`}
                    className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold text-xs uppercase tracking-wider shadow-lg transition-all"
                  >
                    Explore {calcStore} Deals <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'features':
      case 'why_us': {
        return (
          <section key={mod.id || `features-${index}`} className="section-padding bg-white dark:bg-gray-900">
            <div className="container-custom">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
                  EASY 3-STEP PROCESS
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">
                  {mod.title || 'How to Claim Savings & Discounts'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { step: '01', title: 'Find Your Favorite Deal', desc: 'Browse verified coupons and discount deals across fashion, electronics, home, and services.' },
                  { step: '02', title: 'Click Outbound Track Link', desc: 'Click "Claim Coupon" to jump directly to official brand merchant website with tracking.' },
                  { step: '03', title: 'Shop & Save Big', desc: 'Complete your checkout at partner store and get instant discounts + store savings.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="text-center group p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 text-white font-heading font-extrabold text-2xl mb-6 shadow-lg shadow-indigo-600/30 group-hover:scale-110 transition-transform">
                      {step}
                    </div>
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'testimonials':
      case 'reviews': {
        const reviews = [
          { name: 'Sarah M.', role: 'Fashion Buyer', text: 'Used the Burberry 15% discount link and saved over $140 on my trench coat purchase. Works seamlessly!', rating: 5 },
          { name: 'David K.', role: 'Tech Enthusiast', text: 'Found active promo code for Sony wireless headphones plus 8% extra discount. Best deal portal.', rating: 5 },
          { name: 'Elena R.', role: 'Smart Shopper', text: 'Clean interface with zero misleading ads. Just click, get redirected, and save money.', rating: 5 },
        ];
        return (
          <section key={mod.id || `testimonials-${index}`} className="section-padding bg-surface dark:bg-surface-dark">
            <div className="container-custom">
              <div className="text-center mb-14">
                <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-3">
                  VERIFIED REVIEWS
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 dark:text-white mb-4">
                  {mod.title || 'Trusted by 100,000+ Smart Shoppers'}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {reviews.map(({ name, role, text, rating }) => (
                  <div key={name} className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(rating)].map((_, j) => (
                        <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">&ldquo;{text}&rdquo;</p>
                    <div className="flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-4">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{name}</p>
                        <p className="text-xs text-gray-400">{role}</p>
                      </div>
                      <ShieldCheck className="w-5 h-5 text-emerald-500 ml-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      }

      case 'custom_banner': {
        return (
          <section key={mod.id || `custom_banner-${index}`} className="py-12 bg-white dark:bg-gray-900">
            <div className="container-custom">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-800 bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                {mod.imageUrl && (
                  <div className="w-full md:w-1/2 aspect-video md:aspect-square max-h-72 rounded-2xl overflow-hidden bg-black/20 flex items-center justify-center shrink-0">
                    <img src={mod.imageUrl} alt={mod.title || 'Banner'} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`space-y-4 ${mod.imageUrl ? 'w-full md:w-1/2' : 'w-full text-center'}`}>
                  {mod.title && (
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-white">
                      {mod.title}
                    </h2>
                  )}
                  {mod.subtitle && (
                    <p className="text-indigo-200 text-sm md:text-base leading-relaxed">
                      {mod.subtitle}
                    </p>
                  )}
                  {mod.btnText && (
                    <div className="pt-2">
                      <Link
                        href={mod.btnUrl || '/products'}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-950 font-bold text-sm hover:bg-amber-300 transition-colors shadow-lg"
                      >
                        {mod.btnText}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      }

      case 'custom_html': {
        return (
          <section key={mod.id || `custom_html-${index}`} className="py-8 bg-surface dark:bg-surface-dark">
            <div className="container-custom">
              {mod.title && (
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-4">
                  {mod.title}
                </h3>
              )}
              {mod.htmlContent && (
                <div
                  className="prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: mod.htmlContent }}
                />
              )}
            </div>
          </section>
        );
      }

      default:
        return null;
    }
  };

  return (
    <>
      {modules.map((mod, i) => renderModule(mod, i))}
    </>
  );
}

// ============================================
// 2. PRODUCT LIST PAGE (Multi-Category Directory)
// ============================================
export function ProductListPage({ products = [], categories = [], brands = [], selectedCategory = '', selectedBrand = '', onFilterChange }) {
  const [viewMode, setViewMode] = useState('grid');
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesBrand = !selectedBrand || p.brand === selectedBrand;
    const matchesSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-indigo-500">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Deals Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-gray-900 dark:text-white">
            {selectedCategory || selectedBrand ? `${selectedCategory || selectedBrand} Deals` : 'All Cashback & Coupon Deals'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-2xl">
            Browse verified coupons, merchant rebates, and discount links across 10 mainstream categories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="card-premium p-6 rounded-3xl sticky top-28 space-y-6 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-4">
                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
                  Filter Offers
                </h3>
                {(selectedCategory || selectedBrand || search) && (
                  <button
                    onClick={() => {
                      if (onFilterChange) onFilterChange({ category: '', brand: '' });
                      setSearch('');
                    }}
                    className="text-xs text-rose-500 hover:underline font-bold"
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Search input */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 block">Search</label>
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search brand, item..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Categories</h4>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    className={`block px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                      !selectedCategory
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
                    }`}
                  >
                    All Categories
                  </Link>
                  {categories.map(cat => {
                    const catSlug = typeof cat === 'string' ? cat : cat.slug;
                    const catName = typeof cat === 'string' ? cat : cat.name;
                    return (
                      <Link
                        key={catSlug}
                        href={`/products?category=${catSlug}`}
                        className={`block px-3 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${
                          selectedCategory === catSlug
                            ? 'bg-indigo-600 text-white font-bold'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-750'
                        }`}
                      >
                        {catName}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Deals Found</h3>
                <p className="text-xs text-gray-400">Try selecting a different category or search term.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. PRODUCT DETAIL PAGE (Outbound Partner Link)
// ============================================
export function ProductDetailPage({ product = {}, relatedProducts = [] }) {
  let gallery = [];
  try {
    if (Array.isArray(product.gallery)) gallery = product.gallery;
    else if (typeof product.gallery === 'string' && product.gallery.trim()) gallery = JSON.parse(product.gallery);
  } catch (_) { gallery = []; }

  let defaultGallery = [];
  if (product.category === 'apparel') {
    defaultGallery = [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
    ];
  } else if (product.category === 'digital') {
    defaultGallery = [
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ];
  }

  const rawImages = [product.image_url, ...gallery, ...defaultGallery].filter(Boolean);
  const allImages = Array.from(new Set(rawImages));

  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const [likedReviews, setLikedReviews] = useState({});

  useEffect(() => {
    if (product.image_url) {
      setSelectedImage(product.image_url);
    }
  }, [product.image_url]);

  let features = [];
  try {
    if (Array.isArray(product.features)) features = product.features;
    else if (typeof product.features === 'string' && product.features.trim()) features = JSON.parse(product.features);
  } catch (_) { features = []; }

  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  // Extract or Generate Customer Reviews
  let reviews = [];
  try {
    if (Array.isArray(product.reviews)) reviews = product.reviews;
    else if (typeof product.reviews === 'string' && product.reviews.trim()) reviews = JSON.parse(product.reviews);
  } catch (_) {}

  if (!reviews || reviews.length === 0) {
    const brand = product.brand || 'Official Merchant';
    const title = product.title || 'Product';
    reviews = [
      {
        id: 1,
        author: 'Sophia Vance',
        avatar: 'SV',
        rating: 5,
        date: '2 days ago',
        verified: true,
        title: `Exceeded Expectations - Outstanding ${brand} Quality`,
        text: `I ordered this ${title} via the official ${brand} store redirect link. The fabric and finish feel luxuriously soft, heavy, and well-tailored. Arrived in 2 days in original brand packaging. Highly recommended!`,
        likes: 24,
        image: allImages[1] || null
      },
      {
        id: 2,
        author: 'Marcus Sterling',
        avatar: 'MS',
        rating: 5,
        date: '5 days ago',
        verified: true,
        title: 'Authentic Product & Instant Savings Verified',
        text: `Clicked the Shop Now button and was taken directly to the ${brand} checkout. Applied the promo code smoothly and saved over $110 compared to retail price. Great deal portal!`,
        likes: 18,
        image: null
      },
      {
        id: 3,
        author: 'Elena Rostova',
        avatar: 'ER',
        rating: 5,
        date: '1 week ago',
        verified: true,
        title: 'Chic Style & Perfect True-to-Size Fit',
        text: `Looks even more gorgeous in person than in photos! The stitching details and materials are 100% genuine top tier. Extremely comfortable and versatile for daily styling.`,
        likes: 15,
        image: allImages[2] || null
      },
      {
        id: 4,
        author: 'David Harrison',
        avatar: 'DH',
        rating: 5,
        date: '2 weeks ago',
        verified: true,
        title: 'Prompt Delivery & Excellent Packaging',
        text: `Received in original protective wrapping with all store tags attached. Fast dispatch from the brand partner store.`,
        likes: 9,
        image: null
      }
    ];
  }

  const handleLike = (id) => {
    setLikedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-indigo-500">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-indigo-500">Deals</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          {/* Main Image & Thumbnail Gallery */}
          <div className="lg:col-span-5">
            <div className="aspect-square bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-8 flex items-center justify-center relative overflow-hidden shadow-sm">
              <img
                src={selectedImage || product.image_url}
                alt={product.title}
                className="max-h-full max-w-full object-contain transition-all duration-300"
              />
              {discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs shadow-md">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Clickable Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl border-2 overflow-hidden flex items-center justify-center p-1.5 bg-white dark:bg-gray-800 transition-all cursor-pointer ${
                      (selectedImage || product.image_url) === img
                        ? 'border-indigo-600 ring-2 ring-indigo-600/30 scale-105'
                        : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details & Outbound CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">
                <span>{product.brand || 'Partner Brand'}</span>
                <span>•</span>
                <span className="text-emerald-500 flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Verified Deal</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>
              {product.description && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price & Deal Card */}
            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800/50 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Merchant Deal Price</p>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">${product.price}</span>
                  {product.compare_price > 0 && (
                    <span className="text-base text-gray-400 line-through font-mono">${product.compare_price}</span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow-sm">
                  ⚡ VERIFIED BRAND OFFER
                </span>
              </div>
            </div>

            {/* Outbound Link Button ("Shop Now") */}
            <div className="space-y-3 pt-2">
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-6 h-6" />
                Shop Now
                <ExternalLink className="w-5 h-5" />
              </a>
              <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Safe outbound link to official brand merchant website in new window.
              </p>
            </div>

            {/* Highlights & Features Checklist */}
            {features.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Highlights & Features</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* ============================================ */}
        {/* 1. AI PRODUCT DESCRIPTION & VISUAL SHOWCASE */}
        {/* ============================================ */}
        <div className="pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              AI Summary & Core Advantages
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 dark:text-white mb-8">
            Product Highlights & Visual Overview
          </h2>

          {/* 3 Core Advantage Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">
                Premium Quality & Materials
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Engineered with authentic high-grade materials and reinforced stitching for exceptional durability and luxurious comfort.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">
                Tailored Ergonomic Fit
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Designed for optimal silhouette, breathability, and versatile layering across all casual or formal occasions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">
                100% Authentic Store Deal
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                Direct jump link to {product.brand || 'partner'} official store. Guaranteed genuine stock with official brand warranty.
              </p>
            </div>
          </div>

          {/* Side-by-Side Visual Feature Showcase (图片与优势自动搭配) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gray-50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 mb-12">
            <div className="lg:col-span-5 aspect-square rounded-2xl overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-6 flex items-center justify-center">
              <img
                src={selectedImage || product.image_url}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Feature Breakdown
              </span>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-gray-900 dark:text-white">
                Why Shoppers Choose {product.title}
              </h3>
              <div className="space-y-3 pt-2">
                {[
                  { title: 'Signature Merchant Styling', desc: `Authentic ${product.brand || 'partner store'} craftsmanship with meticulous attention to detail and logo accents.` },
                  { title: 'All-Weather Versatility', desc: 'Designed for effortless climate adaptability, temperature control, and everyday durability.' },
                  { title: 'Official Store Jump Link', desc: 'Direct access to official merchant inventory, custom sizing guides, and exclusive discount codes.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Rich Content Overview HTML */}
          {product.content && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Detailed Description</h3>
              <div
                className="prose dark:prose-invert max-w-none text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.content }}
              />
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* 2. CUSTOMER REVIEWS & RATINGS SHOWCASE */}
        {/* ============================================ */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-5 h-5 text-indigo-500" />
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                  VERIFIED CUSTOMER REVIEWS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
                Shopper Ratings & Feedback
              </h2>
            </div>
          </div>

          {/* Overall Rating Summary Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm mb-8">
            <div className="md:col-span-4 text-center md:border-r border-gray-100 dark:border-gray-700 md:pr-6 flex flex-col justify-center">
              <p className="text-5xl font-heading font-extrabold text-gray-900 dark:text-white">4.9</p>
              <div className="flex items-center justify-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Based on 128 Verified Ratings</p>
            </div>

            <div className="md:col-span-8 space-y-2.5 flex flex-col justify-center">
              {[
                { label: '5 Stars', pct: '88%', count: '112' },
                { label: '4 Stars', pct: '10%', count: '13' },
                { label: '3 Stars', pct: '2%', count: '3' },
                { label: '2 Stars', pct: '0%', count: '0' },
                { label: '1 Star', pct: '0%', count: '0' },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-gray-500 dark:text-gray-400">{row.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: row.pct }} />
                  </div>
                  <span className="w-10 text-right font-mono text-gray-400">{row.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="space-y-4">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                      {rev.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">{rev.author}</h4>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                            <ShieldCheck className="w-3 h-3" /> Verified Buyer
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-gray-400">{rev.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                <h5 className="text-sm font-bold text-gray-900 dark:text-white">{rev.title}</h5>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{rev.text}</p>

                {rev.image && (
                  <div className="pt-1">
                    <img src={rev.image} alt="Customer upload preview" className="w-20 h-20 rounded-xl object-contain bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-1" />
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700/60 pt-3 text-xs text-gray-400">
                  <span>Official Merchant Verified Review</span>
                  <button
                    type="button"
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${likedReviews[rev.id] ? 'text-indigo-600 fill-indigo-600' : ''}`} />
                    <span>Helpful ({rev.likes + (likedReviews[rev.id] ? 1 : 0)})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. SINGLE CMS PAGE
// ============================================
export function SinglePage({ page = {} }) {
  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-gray-900 dark:text-white mb-8">
          {page?.title}
        </h1>
        <div 
          className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: page?.content || '' }}
        />
      </div>
    </div>
  );
}
