'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Tag, Sparkles, Percent, ShoppingBag } from 'lucide-react';
import { getThemeConfig } from '@/lib/theme';

export default function Hero({ settings = {} }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;

      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const themeConfig = getThemeConfig(settings.site_theme || 'default');
  const heroDesc = settings.hero_description || themeConfig.heroSubtitle;
  const btnText = settings.hero_button_text || 'Explore Brand Deals';
  const btnUrl = settings.hero_button_url || '/products';
  const badgeText = themeConfig.badge || '🔥 Up to 70% Off Verified Store Deals';

  const renderTitle = () => {
    if (settings.hero_title) {
      const match = settings.hero_title.match(/(.*)\[accent\](.*)\[\/accent\](.*)/);
      if (match) {
        return (
          <>
            {match[1]}
            <span className="relative inline-block">
              <span className="relative z-10">{match[2]}</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/30 rounded-full" />
            </span>
            {match[3]}
          </>
        );
      }
      return settings.hero_title;
    }
    
    return themeConfig.heroTitle;
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark" />

      {/* Floating deal particles / glow Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 pointer-events-none"
            style={{
              width: `${180 + i * 70}px`,
              height: `${180 + i * 70}px`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)',
              left: `${8 + i * 16}%`,
              top: `${15 + (i % 3) * 25}%`,
              animation: `waterWave ${7 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(99, 102, 241, 0.35) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(244, 63, 94, 0.2) 0%, transparent 40%)',
          transform: 'translate(var(--mouse-x), var(--mouse-y))',
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-16 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm mb-8 animate-fade-in shadow-lg">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span className="font-semibold tracking-wide">{badgeText}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight mb-6 animate-fade-in-up tracking-tight">
            {renderTitle()}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up font-normal" style={{ animationDelay: '0.15s' }}>
            {heroDesc}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href={btnUrl}
              id="hero-shop-now"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-white text-indigo-900 font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-slate-50 transition-all duration-300 hover:-translate-y-1"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-600" />
              {btnText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              id="hero-learn-more"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
            >
              Why {settings.site_name || 'AffSite Deals'}?
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            {[
              { icon: ShieldCheck, label: 'Verified Promo Codes', desc: 'Tested & updated daily' },
              { icon: Percent, label: 'Instant Store Link', desc: 'Direct merchant checkout' },
              { icon: Tag, label: '100% Free Access', desc: 'No hidden subscription fees' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3.5 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 hover:bg-white/20 transition-all duration-300 shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-amber-300" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold text-sm">{label}</p>
                  <p className="text-white/70 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 38C672 46 768 62 864 68C960 74 1056 70 1152 62C1248 54 1344 42 1392 36L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            className="fill-surface dark:fill-surface-dark"
          />
        </svg>
      </div>
    </section>
  );
}
