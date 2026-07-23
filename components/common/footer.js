'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Facebook, Twitter, Instagram, Youtube, ArrowRight, Tag } from 'lucide-react';
import siteSettings from "@/config/site-settings.json";

const defaultCategories = [
  { name: "Women's Clothing", href: '/products?category=womens-clothing' },
  { name: "Men's Clothing", href: '/products?category=mens-clothing' },
  { name: 'Shoes & Sneakers', href: '/products?category=shoes-sneakers' },
  { name: 'Bags & Accessories', href: '/products?category=bags-accessories' },
  { name: 'Beauty & Skincare', href: '/products?category=beauty-skincare' },
  { name: 'Jewelry & Watches', href: '/products?category=jewelry-watches' },
  { name: 'All Brand Deals', href: '/products' },
];

export default function Footer({ settings = {}, categories: passedCategories }) {
  const currentYear = new Date().getFullYear();
  const [categoriesList, setCategoriesList] = useState(defaultCategories);

  useEffect(() => {
    if (Array.isArray(passedCategories) && passedCategories.length > 0) {
      const formatted = passedCategories.map(c => ({
        name: c.name,
        href: `/products?category=${c.slug}`
      }));
      setCategoriesList([...formatted, { name: 'All Brand Deals', href: '/products' }]);
    } else {
      async function loadCats() {
        try {
          const res = await fetch('/api/categories');
          const data = await res.json();
          if (data.success && Array.isArray(data.categories) && data.categories.length > 0) {
            const formatted = data.categories.slice(0, 6).map(c => ({
              name: c.name,
              href: `/products?category=${c.slug}`
            }));
            setCategoriesList([...formatted, { name: 'All Brand Deals', href: '/products' }]);
          }
        } catch (_) {}
      }
      loadCats();
    }
  }, [passedCategories]);

  const footerLinks = {
    brands: [
      { name: 'Nike Deals & Discounts', href: '/products?brand=Nike' },
      { name: 'ZARA Promo Coupons', href: '/products?brand=ZARA' },
      { name: 'adidas Official Outlet', href: '/products?brand=adidas' },
      { name: 'Burberry Luxury Sales', href: '/products?brand=Burberry' },
      { name: "Levi's Denim Discounts", href: "/products?brand=Levi's" },
      { name: 'Sony Electronics Deals', href: '/products?brand=Sony' },
    ],
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Privacy Policy', href: '/page/privacy-policy' },
      { name: 'Terms of Service', href: '/page/terms-of-service' },
    ],
  };

  const contactEmail = settings.site_email || `info@${siteSettings.domain || 'affsite.com'}`;

  return (
    <footer id="site-footer" className="bg-gray-950 text-gray-300">
      {/* Top Call to Action Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 border-t border-b border-indigo-500/20 py-12">
        <div className="container-custom text-center max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/30">
            <Tag className="w-3.5 h-3.5" /> Exclusive Partner Discounts
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Ready to Save Big on Top Global Brands?
          </h2>
          <p className="text-indigo-200/80 text-base max-w-xl mx-auto mb-8">
            Explore 10,000+ verified coupons, brand promo codes, and direct store deal links. Updated daily by deal editors.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-950 font-bold text-base hover:bg-slate-100 transition-all duration-300 hover:shadow-glow"
            >
              Find Partner Deals <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-custom pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              {settings.site_logo ? (
                <img
                  src={settings.site_logo}
                  alt={settings.site_name || 'Logo'}
                  className="h-10 w-auto object-contain"
                />
              ) : (
                <>
                  <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold font-heading text-white tracking-tight">
                    {settings.site_name || 'AffSite Deals'}
                  </span>
                </>
              )}
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Curated brand deals, promo codes, and discounts across Fashion, Electronics, Home & Services. Direct jump links to official brand stores.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-indigo-500/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-gray-400 hover:text-indigo-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Categories */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categoriesList.map((link, idx) => (
                <li key={(link?.name || '') + idx}>
                  <Link href={link?.href || '#'} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                    {link?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Brands */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Top Brands</h3>
            <ul className="space-y-2.5">
              {footerLinks.brands.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2.5 mb-6">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-indigo-400 transition-colors duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="space-y-3">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                <Mail className="w-4 h-4" />
                {contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-custom py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {currentYear} {settings.site_name || 'AffSite Deals'}. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Curated Multi-Category Brand Deals & Coupon Directory
          </p>
        </div>
      </div>
    </footer>
  );
}
