'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Truck, RefreshCw, HeartHandshake, ArrowRight, Star, CheckCircle2, SlidersHorizontal, Grid3X3, ChevronRight, Package, Plus, Minus, ShoppingCart, Tag, Percent, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '@/components/common/cart-context';
import Hero from '@/components/common/hero';
import BrandWall from '@/components/common/brand-wall';
import ProductCard from '@/components/common/product-card';
import { formatPrice } from '@/lib/utils';

// ============================================
// 1. HOMEPAGE
// ============================================
export function Homepage({ settings, featuredProducts }) {
  const [calcSpend, setCalcSpend] = useState(500);
  const [calcRate, setCalcRate] = useState(12); // 12%
  const [calcStore, setCalcStore] = useState('Nike');
  const [copiedCode, setCopiedCode] = useState('');

  const stores = [
    { name: 'Burberry', rate: 15, coupon: 'LUXURY15', desc: '15% Rebate + $50 Voucher' },
    { name: 'Nike', rate: 12, coupon: 'NIKE20', desc: '12% Rebate + $20 Off' },
    { name: 'ZARA', rate: 10, coupon: 'SUMMER10', desc: '10% Rebate + Free Shipping' },
    { name: 'Sony', rate: 8, coupon: 'TECH30', desc: '8% Rebate + $30 Off' },
    { name: "Levi's", rate: 14, coupon: 'DENIM14', desc: '14% Rebate + Extra 10%' },
  ];

  const estimatedRebate = Math.round(calcSpend * (calcRate / 100));

  const handleCopy = (code) => {
    setCopiedCode(code);
    navigator.clipboard.writeText(code);
    setTimeout(() => setCopiedCode(''), 2500);
  };

  return (
    <>
      <Hero settings={settings} />
      <BrandWall />

      {/* Category Pills Quick Bar */}
      <section className="py-6 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="container-custom">
          <div className="flex items-center justify-between gap-4 overflow-x-auto pb-2 scrollbar-none">
            {[
              { name: 'All Categories', href: '/products', icon: Grid3X3, count: '1,500+ Deals', active: true },
              { name: 'Apparel & Fashion (服装)', href: '/products?category=apparel', icon: ShoppingBag, count: '650+ Deals' },
              { name: 'Electronics & Tech (数码)', href: '/products?category=digital', icon: Sparkles, count: '320+ Deals' },
              { name: 'Home & Living (家居)', href: '/products?category=home', icon: Shield, count: '240+ Deals' },
              { name: 'Services & Software (服务)', href: '/products?category=services', icon: Tag, count: '180+ Deals' },
              { name: 'Beauty & Skincare (美妆)', href: '/products?category=beauty', icon: Percent, count: '150+ Deals' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl shrink-0 text-sm font-semibold transition-all duration-300 ${
                  cat.active
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-indigo-600'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${cat.active ? 'bg-white/20 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {cat.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-surface dark:bg-surface-dark">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              TRENDING CASHBACK DEALS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Featured Fashion & Brand Deals
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Handpicked apparel discounts, promo codes, and verified cashback offers from top global stores
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 btn-primary text-base px-8 py-4"
            >
              Explore All Deals & Coupons
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Rebate Savings Calculator */}
      <section className="section-padding bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-indigo-500 blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-purple-500 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-4 h-4" />
                INSTANT REBATE CALCULATOR
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white mb-4">
                Calculate Your Cashback Savings
              </h2>
              <p className="text-indigo-200 text-base max-w-xl mx-auto">
                See how much money you can save on your next shopping order with our partner merchants.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white/5 backdrop-blur-xl border border-white/15 p-8 sm:p-10 rounded-3xl shadow-2xl">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-indigo-200">1. Select Target Merchant Store</label>
                    <span className="text-xs font-bold text-amber-300">{calcRate}% Cash Rebate</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {stores.map((st) => (
                      <button
                        key={st.name}
                        onClick={() => {
                          setCalcStore(st.name);
                          setCalcRate(st.rate);
                        }}
                        className={`px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${
                          calcStore === st.name
                            ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg'
                            : 'bg-white/5 border-white/10 text-indigo-100 hover:bg-white/10'
                        }`}
                      >
                        <p className="font-bold text-sm">{st.name}</p>
                        <p className="text-[11px] text-indigo-200">{st.rate}% Rebate</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-semibold text-indigo-200">2. Estimated Shopping Spend Amount</label>
                    <span className="text-lg font-mono font-extrabold text-amber-300">${calcSpend}</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="2000"
                    step="50"
                    value={calcSpend}
                    onChange={(e) => setCalcSpend(Number(e.target.value))}
                    className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <div className="flex justify-between text-xs text-indigo-300 mt-1 font-mono">
                    <span>$50</span>
                    <span>$500</span>
                    <span>$1,000</span>
                    <span>$2,000</span>
                  </div>
                </div>
              </div>

              {/* Result Output Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-indigo-600 to-purple-700 p-8 rounded-2xl text-center space-y-4 shadow-xl border border-white/20">
                <p className="text-xs font-bold uppercase tracking-widest text-indigo-200">ESTIMATED CASHBACK RETURN</p>
                <div className="text-5xl sm:text-6xl font-extrabold text-amber-300 font-mono tracking-tight">
                  +${estimatedRebate}
                </div>
                <p className="text-xs text-white/90 leading-relaxed">
                  Earn <span className="font-bold text-amber-300">{calcRate}% cashback</span> on your <span className="font-bold text-white">${calcSpend}</span> order at <span className="font-bold text-white">{calcStore}</span>.
                </p>

                <div className="pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-sm shadow-lg hover:bg-amber-300 transition-colors"
                  >
                    Claim {calcStore} Rebate Deal
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              WHY AFFSITE DEALS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Maximizing Your Savings & Cashback
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Verified Promo Codes',
                desc: 'Tested daily by deal editors to ensure every coupon and promo code actually works at checkout.',
                color: 'text-primary dark:text-accent',
                bg: 'bg-primary-50 dark:bg-primary/10',
              },
              {
                icon: Percent,
                title: 'Instant Cashback Redirect',
                desc: 'Direct outbound link to official brand merchant stores with automatic rebate tracking.',
                color: 'text-accent-600 dark:text-accent-400',
                bg: 'bg-accent-50 dark:bg-accent/10',
              },
              {
                icon: Sparkles,
                title: '100% Free Access',
                desc: 'No hidden subscription fees or membership charges. Claim discounts freely anytime.',
                color: 'text-green-600 dark:text-green-400',
                bg: 'bg-green-50 dark:bg-green-500/10',
              },
              {
                icon: HeartHandshake,
                title: '1,500+ Partner Brands',
                desc: 'Official affiliate partnerships with Nike, ZARA, adidas, Burberry, Levi\'s & global retailers.',
                color: 'text-gold dark:text-gold-light',
                bg: 'bg-gold-light dark:bg-gold/10',
              },
            ].map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="group p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-750 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 hover:shadow-card transition-all duration-500"
              >
                <div className={`w-14 h-14 rounded-2xl ${bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-surface dark:bg-surface-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              SIMPLE 3-STEP PROCESS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              How to Earn Cashback & Save Money
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Browse & Select Deal',
                desc: 'Explore curated promo offers by category, merchant store, or fashion brand.',
              },
              {
                step: '02',
                title: 'Click Outbound Link',
                desc: 'Click "Get Deal" to jump directly to the official merchant site with active cashback tracking.',
              },
              {
                step: '03',
                title: 'Shop & Claim Rebate',
                desc: 'Complete your purchase at merchant store and receive instant cash back & promo savings.',
              },
            ].map(({ step, title, desc }, i) => (
              <div key={step} className="text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-hero-gradient text-white mb-6 group-hover:shadow-glow-lg transition-shadow duration-500">
                  <span className="text-2xl font-heading font-bold">{step}</span>
                  {i < 2 && (
                    <div className="hidden md:block absolute -right-[calc(50%+2rem)] top-1/2 w-16 border-t-2 border-dashed border-accent/30" />
                  )}
                </div>
                <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
              SHOPPER REVIEWS
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              Loved by 100,000+ Smart Shoppers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                location: 'Fashion Enthusiast',
                text: 'Found a 40% off promo code plus 8% cashback for Burberry coat order. Saved over $120 instantly!',
                rating: 5,
              },
              {
                name: 'James K.',
                location: 'Daily Shopper',
                text: 'The outbound rebate links work flawlessly. I always check AffSite Deals before buying Nike or Levi\'s gear.',
                rating: 5,
              },
              {
                name: 'Linda W.',
                location: 'Boutique Fan',
                text: 'Super clean site with zero annoying popups. Just click and jump straight to the brand store discount page.',
                rating: 5,
              },
            ].map(({ name, location, text, rating }) => (
              <div key={name} className="card-premium p-8 rounded-2xl">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-hero-gradient flex items-center justify-center text-white font-bold text-sm">
                    {name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{name}</p>
                    <p className="text-xs text-gray-400">{location}</p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 py-20 text-center">
        <div className="container-custom relative z-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 max-w-3xl mx-auto">
            Ready to Maximize Your Savings?
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto mb-10">
            Join 100,000+ smart shoppers earning instant cashback and claiming exclusive brand coupons today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-indigo-950 font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Explore Deals Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// ============================================
// 2. PRODUCT LIST PAGE
// ============================================
export function ProductListPage({ products, categories, brands, selectedCategory, selectedBrand, onFilterChange }) {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <Link href="/" className="hover:text-accent">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Deals Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white">
            {selectedCategory || selectedBrand ? `${selectedCategory || selectedBrand} Deals` : 'All Cashback & Promo Deals'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-base max-w-2xl">
            Browse verified coupons, cashback offers, and brand promo links across top categories.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="w-full lg:w-64 shrink-0">
            <div className="card-premium p-6 rounded-2xl sticky top-28 space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <h3 className="font-heading font-bold text-gray-900 dark:text-white text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-accent" />
                  Filter Deals
                </h3>
                {(selectedCategory || selectedBrand) && (
                  <button
                    onClick={() => onFilterChange({ category: '', brand: '' })}
                    className="text-xs text-rose-500 hover:underline font-semibold"
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Categories</h4>
                <div className="space-y-1">
                  <button
                    onClick={() => onFilterChange({ category: '', brand: selectedBrand })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      !selectedCategory
                        ? 'bg-accent/10 text-accent font-bold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onFilterChange({ category: cat, brand: selectedBrand })}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors capitalize ${
                        selectedCategory === cat
                          ? 'bg-accent/10 text-accent font-bold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brands Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Brands</h4>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  <button
                    onClick={() => onFilterChange({ category: selectedCategory, brand: '' })}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                      !selectedBrand
                        ? 'bg-accent/10 text-accent font-bold'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    All Brands
                  </button>
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => onFilterChange({ category: selectedCategory, brand: b })}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                        selectedBrand === b
                          ? 'bg-accent/10 text-accent font-bold'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Products Grid */}
          <main className="flex-1">
            {/* Controls Bar */}
            <div className="flex items-center justify-between mb-6 bg-white dark:bg-gray-900 p-4 rounded-2xl border border-gray-100 dark:border-gray-800">
              <span className="text-sm text-gray-500 font-medium">
                Showing <strong className="text-gray-900 dark:text-white">{products.length}</strong> verified deals
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="card-premium p-12 text-center rounded-2xl">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Deals Found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or category selection.</p>
                <button
                  onClick={() => onFilterChange({ category: '', brand: '' })}
                  className="btn-primary text-sm px-6 py-2.5"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
                {products.map((product, i) => (
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
// 3. PRODUCT DETAIL PAGE (Affiliate Redirect)
// ============================================
export function ProductDetailPage({ product, relatedProducts }) {
  const [selectedImage, setSelectedImage] = useState(product.image_url);
  const gallery = Array.isArray(product.gallery) ? product.gallery : (typeof product.gallery === 'string' ? JSON.parse(product.gallery || '[]') : []);
  const allImages = [product.image_url, ...gallery].filter(Boolean);
  const features = Array.isArray(product.features) ? product.features : (typeof product.features === 'string' ? JSON.parse(product.features || '[]') : []);

  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-accent">Deals</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-gray-900 dark:text-white truncate max-w-xs">{product.title}</span>
        </div>

        {/* Product main section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8 flex items-center justify-center relative overflow-hidden shadow-card">
              {discount > 0 && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-md z-10">
                  {discount}% OFF
                </div>
              )}
              <img
                src={selectedImage || product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl border-2 p-2 bg-white dark:bg-gray-900 shrink-0 transition-all ${
                      selectedImage === img ? 'border-accent shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info & Affiliate Action */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider w-fit mb-3">
              <Tag className="w-3.5 h-3.5" /> Brand: {product.brand || 'Official Merchant'}
            </div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {formatPrice(product.price)}
              </span>
              {product.compare_price && (
                <span className="text-lg text-gray-400 line-through">
                  {formatPrice(product.compare_price)}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2.5 py-1 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold">
                  Save {formatPrice(product.compare_price - product.price)}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Outbound Link CTA Button */}
            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 mb-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 uppercase tracking-wider">
                  Partner Merchant Outbound Offer
                </span>
                <span className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-500/10 px-2.5 py-0.5 rounded-full">
                  Verified Cashback Active
                </span>
              </div>
              <a
                href={affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Claim Coupon & Earn Cashback at Merchant Store
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                🔒 You will be redirected safely to official partner website in a new window.
              </p>
            </div>

            {/* Features */}
            {features.length > 0 && (
              <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">
                  Deal Highlights & Specs
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// 4. SINGLE CMS PAGE
// ============================================
export function SinglePage({ page }) {
  return (
    <div className="pt-28 pb-20 bg-surface dark:bg-surface-dark min-h-screen">
      <div className="container-custom max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white mb-8">
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
