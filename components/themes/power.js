'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, Star, CheckCircle2, ChevronRight, Package, ShoppingBag, 
  Zap, ShieldCheck, BatteryCharging, Sun, Shield, Award, HelpCircle, ChevronDown, 
  Cpu, Flame, ExternalLink, RefreshCw, ThumbsUp, MessageSquare, Mail, X, Plus,
  Check, Volume2, ShieldAlert, Clock
} from 'lucide-react';
import BrandWall from '@/components/common/brand-wall';
import { formatPrice } from '@/lib/utils';
import { ProductDetailPage as ClassicProductDetailPage, SinglePage as ClassicSinglePage } from './classic';

// ============================================
// 1. PRODUCT CARD (Exact Jackery Card Styling)
// ============================================
function PowerProductCard({ product }) {
  const discount = product.compare_price ? Math.round((1 - product.price / product.compare_price) * 100) : 0;
  const affiliateUrl = product.affiliate_link || '#';

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-200/80 bg-white shadow-xs ring-1 ring-stone-900/[0.02] transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-orange-500/50">
      <div className="relative h-80 overflow-hidden bg-white flex items-center justify-center border-b border-stone-100 p-4">
        {discount > 0 && (
          <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-md">
            {discount}% OFF
          </span>
        )}
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&auto=format&fit=crop&q=80'}
          alt={product.title}
          className="h-full w-full object-contain object-center transition duration-500 will-change-transform group-hover:scale-110"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-600 mb-1.5 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 fill-orange-500" />
          {product.brand || 'POWER GENERATOR'}
        </span>

        <h3 className="flex-1 font-heading text-base font-bold leading-snug text-stone-900 group-hover:text-orange-600 transition-colors">
          <Link href={`/product/${product.slug}`}>{product.title}</Link>
        </h3>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-extrabold font-mono text-stone-950">{formatPrice(product.price)}</span>
          {product.compare_price > 0 && (
            <span className="text-xs text-stone-400 line-through font-mono">{formatPrice(product.compare_price)}</span>
          )}
        </div>

        <a
          href={affiliateUrl}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-600 transition hover:text-orange-700 hover:gap-3 group-hover:translate-x-1"
        >
          <span>Shop on Store</span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

// ============================================
// 2. HOMEPAGE (Exact Match to Jackery Website Layout & Design)
// ============================================
export function Homepage({ settings = {}, featuredProducts = [] }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(true);
  const siteDesc = settings.site_tagline || 'Jackery Portable Power Station: Power Anywhere';

  const defaultProducts = [
    { id: 1, title: 'Jackery Explorer 240D', slug: 'jackery-explorer-240d', price: 219.99, compare_price: 299.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' },
    { id: 2, title: 'Jackery Explorer 500 v2', slug: 'jackery-explorer-500-v2', price: 499.99, compare_price: 599.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' },
    { id: 3, title: 'Jackery Explorer 1000 v2', slug: 'jackery-explorer-1000-v2', price: 799.99, compare_price: 999.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' },
    { id: 4, title: 'Jackery Explorer 2000 v2', slug: 'jackery-explorer-2000-v2', price: 1499.99, compare_price: 1899.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' },
    { id: 5, title: 'Jackery Solar Generator 1000 v2', slug: 'jackery-solar-generator-1000-v2', price: 1299.99, compare_price: 1599.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' },
    { id: 6, title: 'Jackery HomePower 3600 Plus', slug: 'jackery-homepower-3600-plus', price: 2799.99, compare_price: 3499.99, brand: 'Jackery', image_url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&auto=format&fit=crop&q=80', affiliate_link: 'https://www.amazon.com' }
  ];

  const displayProducts = featuredProducts.length > 0 ? featuredProducts : defaultProducts;

  const benefits = [
    {
      title: 'LiFePO4 Long Life',
      desc: 'We build every pack with automotive-grade LiFePO4 cells rated for 3,000+ cycles. That translates to a decade of dependable service, even with daily use, without the thermal risks of older lithium chemistries.',
      icon: BatteryCharging
    },
    {
      title: 'Fast Solar Recharge',
      desc: 'Pair any Jackery portable power station with our SolarSaga panels and capture up to 1,400W of solar input. Top off silently in a few hours of sunlight, no fuel and no fumes required.',
      icon: Sun
    },
    {
      title: 'Pure Sine Wave Output',
      desc: 'Our inverters deliver clean pure sine wave AC, safe for CPAP machines, laptops, refrigerators, and medical devices. You get grid-quality electricity wherever you set the unit down.',
      icon: Zap
    },
    {
      title: 'Emergency Super Charging',
      desc: 'Plug into any wall outlet and reach 80% in as little as 60 minutes with our Emergency Super Charging mode. When weather turns, you are ready to roll out the door in under an hour.',
      icon: Clock
    },
    {
      title: 'Quiet Operation',
      desc: 'Smart thermal management keeps our units below 30dB in standard mode — quieter than a library. No roar, no exhaust, no neighbors knocking. Run it inside the tent, RV, or living room.',
      icon: Volume2
    },
    {
      title: 'Five-Year Warranty',
      desc: 'Every Jackery unit ships with a full five-year warranty and U.S.-based support. We stand behind what we build, and our team answers the phone when you need help getting back up and running.',
      icon: ShieldCheck
    }
  ];

  const testimonials = [
    {
      quote: '"Compared to the bulky generator I hauled around for six years, the Explorer 1000 v2 feels like magic. Silent, half the weight, and it recharges before my morning coffee finishes brewing."',
      author: 'Corinne Ashford',
      role: 'Farmers market vendor',
      avatar: 'C'
    },
    {
      quote: '"Honestly, my old power box gave up after two seasons of tailgating, so I finally treated myself to the Explorer 500 v2. Grill lights, speakers, mini fridge — everything hums along without a hiccup."',
      author: 'Devon Marchetti',
      role: 'Tailgate host',
      avatar: 'D'
    },
    {
      quote: '"What convinced me to retire my aging battery pack was watching a friend run her whole craft booth off a Jackery portable power station. Ordered the Explorer 240D that night and never looked back."',
      author: 'Priya Sundaram',
      role: 'Jewelry maker',
      avatar: 'P'
    },
    {
      quote: '"Within a week of retiring our decade-old backup box, the HomePower 3600 Plus proved its worth during a nasty ice storm. A Jackery portable power station this capable makes winter feel a lot less scary."',
      author: 'Malcolm Fitzhugh',
      role: 'Rural resident',
      avatar: 'M'
    }
  ];

  const faqs = [
    {
      q: 'What can a Jackery portable power station run?',
      a: 'Capacity determines runtime, and our lineup spans roughly 100Wh to 3,000Wh+. A mid-range Explorer comfortably runs a full-size refrigerator for 10+ hours, a CPAP for two to three nights, or a coffee maker, laptops, and lights through a long weekend. Check the wattage label on your device and divide the unit\'s watt-hour rating by that number for an estimated runtime. Our display also shows live input and output so you always know where you stand.'
    },
    {
      q: 'How long does the battery last over time?',
      a: 'Every Jackery portable power station ships with LiFePO4 cells rated for 3,000 or more full charge cycles before reaching 70% of original capacity. In real-world terms, that is roughly ten years of weekly use. LiFePO4 chemistry is also far more thermally stable than older lithium-ion packs, so the unit handles hot garages, cold trailers, and frequent fast-charging without meaningful degradation.'
    },
    {
      q: 'Can I recharge from solar panels?',
      a: 'Yes. Every Jackery model accepts solar input through the included MPPT controller, and pairing with our SolarSaga foldable panels creates a complete solar generator. Larger units accept up to 1,400W of solar input for fast, fuel-free recharging. Panels connect with a single weatherproof cable and unfold in under a minute. Place them in direct sun, tilt toward the sky, and the power station handles the rest automatically.'
    },
    {
      q: 'Is it safe to use indoors?',
      a: 'Absolutely. Unlike gas generators, our units produce zero emissions and operate well under 30dB in standard mode. You can safely run a Jackery portable power station inside your home, tent, RV, or office without any ventilation concerns. Our ChargeShield BMS monitors 62 protection points in real time, automatically shutting down for overload, short-circuit, or temperature events before any damage occurs.'
    },
    {
      q: 'How fast does it recharge from a wall outlet?',
      a: 'Most current Explorer models reach 80% in about 60 minutes using our Emergency Super Charging mode, and a full charge in roughly 90 minutes. Standard mode takes longer but extends cell life if you are not in a rush. You can adjust charging speed in the companion app to balance convenience and longevity, and the unit remembers your preference between sessions.'
    },
    {
      q: 'What warranty and support do you offer?',
      a: 'Every Jackery unit purchased through our official channels includes a five-year warranty covering the battery, inverter, and electronics. Registration takes one minute on our site and activates coverage automatically. Our U.S.-based support team is available by phone, chat, and email seven days a week to help with setup, troubleshooting, and replacement parts whenever you need us.'
    }
  ];

  return (
    <div className="min-h-full overflow-x-hidden bg-stone-50 font-sans text-stone-800 antialiased">
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-stone-950 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <picture>
          <img
            src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
            alt="Jackery Portable Power Station: Power Anywhere"
            className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-30"
          />
        </picture>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-stone-950/80 via-stone-950/70 to-stone-900/60" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:py-20 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300 backdrop-blur-sm mb-4">
            <Star className="h-3.5 w-3.5 fill-orange-400" />
            Engineered to Perform
          </span>

          <h1 className="mt-3 font-heading text-4xl font-black tracking-tight text-white drop-shadow-2xl sm:text-6xl lg:text-7xl lg:leading-[1.05] max-w-5xl">
            {modTitle(settings, siteDesc)}
          </h1>

          <div className="mx-auto mt-5 flex justify-center">
            <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600 shadow-lg shadow-orange-600/50" />
          </div>

          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base sm:text-lg leading-relaxed text-stone-100/95 font-medium">
            <p>
              Welcome to the official home of the Jackery portable power station. Every unit we build pairs LiFePO4 cell chemistry with intelligent battery management, delivering clean, quiet energy for campsites, road trips, job sites, and whole-home backup when the grid blinks out.
            </p>
            <p>
              From the compact Explorer 100 Plus to our flagship solar generators, our lineup is engineered for rapid recharging, all-weather durability, and effortless setup. This is the Jackery experience: premium power that travels with you and is built to last for years.
            </p>
          </div>

          <div className="mx-auto mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/products"
              className="group relative inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-9 py-4 text-base font-black text-white shadow-2xl shadow-orange-600/50 transition-all duration-300 hover:shadow-orange-500/60 hover:scale-105 active:scale-95 tracking-tight uppercase"
            >
              <span>Learn More</span>
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-white/10 px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:border-white/50 hover:bg-white/15 backdrop-blur-md tracking-tight"
            >
              <span>Read Overview</span>
              <ChevronDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </div>

          <div className="mx-auto mt-12 flex justify-center opacity-75 hover:opacity-100 transition-opacity duration-300">
            <a href="#about" className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors">
              <span className="text-xs font-bold uppercase tracking-widest">Scroll to explore</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= ABOUT STORY SECTION ================= */}
      <section id="about" className="border-t border-stone-200/60 bg-white py-16 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-3 lg:gap-16 items-start">
            {/* Left Sticky Image */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-32 relative overflow-hidden rounded-3xl bg-stone-100 border border-stone-200 shadow-2xl aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80"
                  alt="Jackery Power Technology Story"
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 right-4 rounded-2xl border-2 border-white bg-gradient-to-br from-orange-500 to-orange-600 p-4 shadow-xl text-white flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 shrink-0">
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm">Premium</p>
                    <p className="text-white/80 text-xs">Quality assured</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Rich Content */}
            <div className="lg:col-span-2 space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
                <Star className="h-3.5 w-3.5 text-orange-600 fill-orange-600" />
                About
              </span>
              <h2 className="text-3xl sm:text-5xl font-heading font-black text-stone-950 tracking-tight">
                The Jackery Power Technology Story
              </h2>
              <div className="h-1.5 w-20 rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-amber-600 shadow-lg shadow-orange-600/30" />

              <div className="mt-8 text-base sm:text-lg leading-relaxed text-stone-600 space-y-6 font-medium">
                <p>
                  For over a decade, we have focused on a single mission: making clean, portable energy accessible to every household and adventurer. The Jackery portable power station is the result of that focus — a precision-engineered energy hub that turns sunlight and wall outlets into reliable AC, DC, and USB power wherever life takes you.
                </p>
                <p>
                  At the core of every Jackery portable power station sits an automotive-grade LiFePO4 battery rated for 3,000+ charge cycles to 70% capacity. That means a full decade of weekend trips, emergency backups, and daily workshop use without meaningful degradation. Our proprietary ChargeShield BMS monitors voltage, current, and temperature across 62 protection points, keeping the pack cool, balanced, and safe.
                </p>

                <h3 className="text-2xl font-heading font-bold text-stone-950 pt-4">Designed Around Real Use</h3>
                <p>
                  We obsess over the details that matter when the lights go out. Pure sine wave inverters protect sensitive electronics like CPAP machines and laptops. Aircraft-grade aluminum handles fold flush. App control over Wi-Fi and Bluetooth lets you monitor watt-hours remaining, schedule charging, and switch between quiet and turbo modes from your phone.
                </p>
                <p>
                  Pair any Jackery portable power station with our foldable SolarSaga panels and you have a complete solar generator. Recharge from 0 to 80% in as little as 60 minutes using our Emergency Super Charging mode, or top off silently from the sun while you hike, fish, or work remotely.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PRODUCTS GRID ================= */}
      <section className="border-t border-stone-200/60 bg-stone-100/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700 mb-3">
                <Zap className="h-3.5 w-3.5 text-orange-600 fill-orange-600" />
                Featured
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-black tracking-tight text-stone-950">
                Featured Jackery Portable Power Station
              </h2>
            </div>
            <Link href="/products" className="text-base font-bold text-orange-600 hover:text-orange-700 flex items-center gap-2 transition-colors uppercase tracking-wider">
              <span>View all</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map((p) => (
              <PowerProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ================= THE JACKERY ADVANTAGE (BENEFITS) ================= */}
      <section className="border-t border-stone-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
              <ShieldCheck className="h-3.5 w-3.5 text-orange-600" />
              Why Choose Us
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-stone-950 text-center">
            The Jackery Advantage
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-center text-stone-600 font-medium">
            Everything you need to make an informed decision.
          </p>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, idx) => {
              const IconComponent = b.icon;
              return (
                <div key={idx} className="group rounded-2xl border border-stone-200/80 bg-gradient-to-br from-white to-stone-50 p-8 shadow-xs ring-1 ring-stone-900/[0.05] transition duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600 ring-1 ring-orange-200/70 group-hover:shadow-md transition duration-300">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 font-heading text-lg font-bold text-stone-900">{b.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone-600 font-medium">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="border-t border-stone-200/60 bg-gradient-to-b from-stone-50/80 to-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
              <Star className="h-3.5 w-3.5 text-orange-600 fill-orange-600" />
              Loved By Users
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-stone-950 text-center">
            Why Owners Upgrade To Jackery
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t, idx) => (
              <blockquote key={idx} className="group flex h-full flex-col rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs ring-1 ring-stone-900/[0.05] transition duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="mb-4 flex gap-1 text-orange-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-500" />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-stone-700 font-medium">{t.quote}</p>
                <footer className="mt-6 flex items-center gap-3 border-t border-stone-100 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-orange-50 font-heading text-sm font-bold text-orange-700 ring-1 ring-orange-200/50">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-heading text-xs font-bold text-stone-900">{t.author}</p>
                    <p className="text-[11px] text-stone-500 font-medium">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FAQ SECTION ================= */}
      <section id="faq" className="border-t border-stone-200/60 bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-700">
              <HelpCircle className="h-3.5 w-3.5 text-orange-600" />
              Questions?
            </span>
          </div>
          <h2 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-stone-950 text-center">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base text-stone-600 font-medium">
            Find answers to common questions about our products and services.
          </p>

          <div className="mx-auto mt-12 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-stone-200/80 bg-gradient-to-br from-white to-stone-50 shadow-xs ring-1 ring-stone-900/[0.05] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex cursor-pointer select-none items-center justify-between gap-4 px-8 py-5 font-heading text-base font-bold text-stone-900 text-left hover:text-orange-600 transition duration-200"
                >
                  <span>{faq.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-500 transition duration-300 ${openFaq === idx ? 'bg-orange-100 text-orange-600 rotate-45' : ''}`}>
                    <Plus className="h-5 w-5" />
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="border-t border-stone-100 px-8 pb-6 pt-5 text-sm leading-relaxed text-stone-600 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA BANNER ================= */}
      <section className="relative isolate overflow-hidden bg-stone-950 py-24 sm:py-32">
        <img
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1600&auto=format&fit=crop&q=80"
          alt="CTA Background"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center opacity-25 brightness-110"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-stone-950/90 via-stone-950/80 to-stone-950/90" />
        <div className="absolute -top-40 -right-40 -z-10 h-80 w-80 bg-orange-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 -z-10 h-80 w-80 bg-amber-500/20 rounded-full blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 text-center">
          <div className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-200 backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 fill-orange-300" />
              Limited Time Offer
            </span>
          </div>

          <h2 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white drop-shadow-2xl leading-tight">
            Ready to find your perfect match?
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-stone-100 font-medium leading-relaxed">
            Explore the full Jackery Portable Power Station: Power Anywhere lineup and choose with confidence. Compare features, read expert insights, and make an informed decision.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="group relative inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-10 text-base font-black text-white shadow-2xl shadow-orange-600/50 transition-all duration-300 hover:shadow-orange-500/60 hover:scale-105 active:scale-95 uppercase tracking-tight"
            >
              <span>Shop Now</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="#about"
              className="group inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors px-8 py-4 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm font-bold text-base"
            >
              <span>Learn More</span>
              <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* ================= FLOATING STICKY AFFILIATE BAR ================= */}
      {showStickyBar && (
        <aside className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-11/12 max-w-lg bg-stone-900/95 border border-stone-800 text-white rounded-full px-5 py-2.5 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-slide-up">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
              <Zap className="w-4 h-4 fill-orange-400" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400 truncate">Editor's Pick · Featured</p>
              <p className="text-xs font-bold text-stone-100 truncate">Jackery Explorer 1000 v2</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.amazon.com"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 text-white text-xs font-black uppercase tracking-wider hover:scale-105 transition-all flex items-center gap-1"
            >
              <span>See on Store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setShowStickyBar(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}

function modTitle(settings, defaultText) {
  return settings.hero_title || defaultText;
}

// ============================================
// 3. PRODUCT LIST PAGE (Exact Power Catalog)
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
    <div className="pt-28 pb-20 bg-stone-100/60 min-h-screen font-sans">
      <div className="container-custom max-w-6xl">
        <div className="mb-10 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1 text-xs font-extrabold uppercase tracking-widest text-orange-700 mb-2">
            <Zap className="w-3.5 h-3.5 text-orange-600 fill-orange-600" />
            Official Lineup
          </span>
          <h1 className="text-3xl sm:text-5xl font-heading font-black text-stone-950 tracking-tight">
            Jackery Portable Power Station Lineup
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-stone-200 shadow-xs mb-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => (
            <PowerProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductDetailPage(props) {
  return <ClassicProductDetailPage {...props} />;
}

export function SinglePage(props) {
  return <ClassicSinglePage {...props} />;
}
