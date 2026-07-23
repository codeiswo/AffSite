'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Moon, Sun, ShoppingBag } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getThemeArchetype } from '@/lib/theme';
import siteSettings from "@/config/site-settings.json";

const defaultNavigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Categories',
    href: '/products',
    children: [
      { name: "Women's Clothing", href: '/products?category=womens-clothing' },
      { name: "Men's Clothing", href: '/products?category=mens-clothing' },
      { name: 'Shoes & Sneakers', href: '/products?category=shoes-sneakers' },
      { name: 'Bags & Accessories', href: '/products?category=bags-accessories' },
      { name: 'Beauty & Skincare', href: '/products?category=beauty-skincare' },
      { name: 'Jewelry & Watches', href: '/products?category=jewelry-watches' },
    ],
  },
  {
    name: 'Featured Brands',
    href: '/products',
    children: [
      { name: 'Burberry', href: '/products?brand=Burberry' },
      { name: "Levi's", href: "/products?brand=Levi's" },
      { name: 'ZARA', href: '/products?brand=ZARA' },
      { name: 'Nike', href: '/products?brand=Nike' },
      { name: 'Sony', href: '/products?brand=Sony' },
      { name: 'Roborock', href: '/products?brand=Roborock' },
    ],
  },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar({ settings = {} }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dynamicNav, setDynamicNav] = useState(defaultNavigation);

  const pathname = usePathname();
  const theme = settings.site_theme || settings.theme || 'default';
  const archetype = getThemeArchetype(theme);
  const isLightTheme = archetype === 'minimalist';
  const showScrolledStyle = isScrolled || pathname !== '/' || isLightTheme;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);

    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    async function loadCategoriesForMenu() {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        if (data && data.success && Array.isArray(data.categories) && data.categories.length > 0) {
          const allCats = data.categories;
          const parentCats = allCats.filter(c => c && !c.parent_id);

          const categoryChildren = parentCats.map(parent => {
            const subCats = allCats.filter(c => c && c.parent_id === parent.id);
            if (subCats.length > 0) {
              return {
                name: parent.name || 'Category',
                href: `/products?category=${parent.slug || ''}`,
                subItems: subCats.map(sub => ({
                  name: sub.name || 'Subcategory',
                  href: `/products?category=${sub.slug || ''}`
                }))
              };
            }
            return {
              name: parent.name || 'Category',
              href: `/products?category=${parent.slug || ''}`
            };
          });

          const updatedNav = [...defaultNavigation];
          const catIndex = updatedNav.findIndex(n => n && n.name === 'Categories');
          if (catIndex !== -1) {
            updatedNav[catIndex] = {
              ...updatedNav[catIndex],
              children: categoryChildren
            };
          }
          setDynamicNav(updatedNav);
        }
      } catch (_) {}
    }

    loadCategoriesForMenu();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  let navigationItems = dynamicNav;
  if (settings.navigation_menu) {
    try {
      const parsed = JSON.parse(settings.navigation_menu);
      if (Array.isArray(parsed) && parsed.length > 0) {
        navigationItems = parsed;
      }
    } catch (_) {}
  }

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showScrolledStyle
          ? 'glass shadow-lg shadow-primary/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" id="navbar-logo">
            {settings.site_logo ? (
              <img
                src={settings.site_logo}
                alt={settings.site_name || siteSettings.siteName || 'Logo'}
                className="h-10 md:h-12 w-auto object-contain"
              />
            ) : (
              <>
                <div className="w-10 h-10 rounded-xl bg-hero-gradient flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow duration-300">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold font-heading tracking-tight transition-colors duration-300 ${
                  showScrolledStyle ? 'text-primary dark:text-accent-400' : 'text-white'
                }`}>
                  {settings.site_name || siteSettings.siteName || 'AffSite Deals'}
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item, idx) => {
              const itemName = item?.name || `Item-${idx}`;
              const itemHref = item?.href || '#';
              const navId = `nav-${String(itemName).toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

              return (
                <div
                  key={itemName + idx}
                  className="relative group"
                  onMouseEnter={() => item?.children && setOpenDropdown(itemName)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={itemHref}
                    id={navId}
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      showScrolledStyle
                        ? 'text-gray-700 hover:text-primary hover:bg-primary-50 dark:text-gray-300 dark:hover:text-accent dark:hover:bg-accent/10'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {itemName}
                    {item?.children && <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />}
                  </Link>

                  {/* Dropdown with Sub-menus (包含二级菜单) */}
                  {item?.children && openDropdown === itemName && (
                    <div className="absolute top-full left-0 pt-2 w-72 animate-fade-in-down z-50">
                      <div className="glass rounded-2xl shadow-2xl p-2 border border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
                        {item.children.map((child, cIdx) => {
                          const childName = child?.name || `Sub-${cIdx}`;
                          const childHref = child?.href || '#';
                          return (
                            <div key={childName + cIdx} className="group/sub relative">
                              <Link
                                href={childHref}
                                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                              >
                                <span>{childName}</span>
                                {child?.subItems && child.subItems.length > 0 && (
                                  <span className="text-xs text-gray-400 font-mono">›</span>
                                )}
                              </Link>

                              {/* Sub-menu (二级子菜单) */}
                              {child?.subItems && child.subItems.length > 0 && (
                                <div className="hidden group-hover/sub:block absolute left-full top-0 ml-1.5 w-64 glass rounded-2xl shadow-2xl p-2 border border-white/20 dark:border-white/10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-50">
                                  {child.subItems.map((sub, sIdx) => {
                                    const subName = sub?.name || `SubSub-${sIdx}`;
                                    const subHref = sub?.href || '#';
                                    return (
                                      <Link
                                        key={subName + sIdx}
                                        href={subHref}
                                        className="block px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                      >
                                        └ {subName}
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDark}
              id="dark-mode-toggle"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 ${
                showScrolledStyle
                  ? 'text-gray-600 hover:text-primary hover:bg-gray-100 dark:text-gray-400 dark:hover:text-accent dark:hover:bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              id="mobile-menu-toggle"
              className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                showScrolledStyle
                  ? 'text-gray-600 hover:text-primary dark:text-gray-400'
                  : 'text-white/80 hover:text-white'
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden glass border-t border-white/10 animate-fade-in-down">
          <div className="container-custom py-4 space-y-1">
            {navigationItems.map((item, idx) => {
              const itemName = item?.name || `Nav-${idx}`;
              const itemHref = item?.href || '#';
              return (
                <div key={itemName + idx}>
                  <Link
                    href={itemHref}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-accent/10 font-medium"
                  >
                    {itemName}
                  </Link>
                  {item?.children && (
                    <div className="pl-6 space-y-1">
                      {item.children.map((child, cIdx) => {
                        const childName = child?.name || `Child-${cIdx}`;
                        const childHref = child?.href || '#';
                        return (
                          <div key={childName + cIdx}>
                            <Link
                              href={childHref}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-300 hover:text-indigo-600 font-semibold"
                            >
                              {childName}
                            </Link>
                            {child?.subItems && (
                              <div className="pl-4 space-y-1 border-l border-indigo-100 dark:border-indigo-900 ml-2">
                                {child.subItems.map((sub, sIdx) => {
                                  const subName = sub?.name || `Sub-${sIdx}`;
                                  const subHref = sub?.href || '#';
                                  return (
                                    <Link
                                      key={subName + sIdx}
                                      href={subHref}
                                      onClick={() => setIsMobileMenuOpen(false)}
                                      className="block px-3 py-1.5 rounded-lg text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-500"
                                    >
                                      └ {subName}
                                    </Link>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
