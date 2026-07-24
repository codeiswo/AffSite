export function getThemeArchetype(theme) {
  switch (theme) {
    case 'nordic':
    case 'organic':
    case 'editorial':
    case 'home':
    case 'baby':
    case 'food':
    case 'minimalist':
      return 'minimalist';
    case 'cyberpunk':
    case 'futuristic':
    case 'bold':
    case 'digital':
    case 'auto':
    case 'services':
      return 'futuristic';
    case 'luxury':
    case 'jewelry':
    case 'beauty':
      return 'luxury';
    case 'power':
    case 'jackery':
    case 'energy':
    case 'outdoor':
      return 'power';
    case 'apparel':
    case 'sports':
    case 'default':
    case 'classic':
    default:
      return 'classic';
  }
}

export function getThemeConfig(theme) {
  switch (theme) {
    case 'power':
    case 'jackery':
    case 'energy':
    case 'outdoor':
      return {
        archetype: 'power',
        heroTitle: 'Jackery Portable Power Station & Solar Generator Directory',
        heroSubtitle: 'Engineered for performance — Explore compact Explorer units, solar generators & off-grid power solutions.',
        badge: '⚡ Official Power Station Store',
        defaultCategory: 'digital'
      };
    case 'home':
      return {
        archetype: 'minimalist',
        heroTitle: 'Curated Home & Living Store Deals Directory',
        heroSubtitle: 'Handpicked furniture, home decor, appliances & verified store coupons.',
        badge: '🛋️ Home & Living Store Deals',
        defaultCategory: 'home'
      };
    case 'digital':
    case 'futuristic':
    case 'cyberpunk':
      return {
        archetype: 'futuristic',
        heroTitle: 'High-Tech Electronics & Digital Deals Portal',
        heroSubtitle: 'Save on gadgets, ANC headphones, smart robotics & digital accessories.',
        badge: '💻 Tech & Digital Discounts',
        defaultCategory: 'digital'
      };
    case 'services':
      return {
        archetype: 'futuristic',
        heroTitle: 'Software & Cloud Services Coupon Directory',
        heroSubtitle: 'Exclusive savings on SaaS subscriptions, hosting, security & digital tools.',
        badge: '⚡ SaaS & Software Vouchers',
        defaultCategory: 'services'
      };
    case 'sports':
      return {
        archetype: 'classic',
        heroTitle: 'Outdoor Gear & Sports Equipment Deals',
        heroSubtitle: 'High-performance athletic apparel, fitness gear & outdoor equipment coupons.',
        badge: '🏃 Sports & Outdoors Deals',
        defaultCategory: 'sports'
      };
    case 'beauty':
      return {
        archetype: 'luxury',
        heroTitle: 'Luxury Skincare & Cosmetics Brand Directory',
        heroSubtitle: 'Verified promo codes and instant discounts on luxury beauty & cosmetics.',
        badge: '💄 Beauty & Skincare Offers',
        defaultCategory: 'beauty'
      };
    case 'baby':
      return {
        archetype: 'minimalist',
        heroTitle: 'Mother, Baby & Toys Coupon Directory',
        heroSubtitle: 'Save on baby apparel, toys, strollers, and nursery essentials.',
        badge: '🧸 Family & Baby Savings',
        defaultCategory: 'apparel'
      };
    case 'auto':
      return {
        archetype: 'futuristic',
        heroTitle: 'Automotive Accessories & Car Care Deals Portal',
        heroSubtitle: 'Top discounts on car electronics, detailing, parts & accessories.',
        badge: '🚗 Automotive Store Deals',
        defaultCategory: 'digital'
      };
    case 'jewelry':
      return {
        archetype: 'luxury',
        heroTitle: 'Haute Jewelry, Gold & Luxury Watches Directory',
        heroSubtitle: 'Exclusive boutique store links for watches, fine jewelry & gold.',
        badge: '✨ Boutique Luxury Offers',
        defaultCategory: 'apparel'
      };
    case 'food':
      return {
        archetype: 'minimalist',
        heroTitle: 'Gourmet Food, Groceries & Wine Savings',
        heroSubtitle: 'Direct store links and promo codes for organic groceries, meal kits & fine wine.',
        badge: '🍷 Gourmet & Grocery Vouchers',
        defaultCategory: 'home'
      };
    case 'apparel':
    case 'default':
    default:
      return {
        archetype: 'classic',
        heroTitle: 'Exclusive Fashion Brand Deals & Verified Promo Codes',
        heroSubtitle: 'Curated fashion discounts & exclusive coupons from top partner brand stores.',
        badge: '🔥 Verified Fashion Vouchers',
        defaultCategory: 'apparel'
      };
  }
}

