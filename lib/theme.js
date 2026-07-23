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
    case 'home':
      return {
        archetype: 'minimalist',
        heroTitle: 'Curated Home & Living Cashback Directory',
        heroSubtitle: 'Handpicked furniture, home decor, appliances & verified store coupons.',
        badge: '🛋️ Home & Living Rebates',
        defaultCategory: 'home'
      };
    case 'digital':
    case 'futuristic':
    case 'cyberpunk':
      return {
        archetype: 'futuristic',
        heroTitle: 'High-Tech Electronics & Digital Cashback Portal',
        heroSubtitle: 'Save on gadgets, ANC headphones, smart robotics & digital accessories.',
        badge: '💻 Tech & Digital Rebates',
        defaultCategory: 'digital'
      };
    case 'services':
      return {
        archetype: 'futuristic',
        heroTitle: 'Software & Cloud Services Coupon Directory',
        heroSubtitle: 'Exclusive rebates on SaaS subscriptions, hosting, security & digital tools.',
        badge: '⚡ SaaS & Software Deals',
        defaultCategory: 'services'
      };
    case 'sports':
      return {
        archetype: 'classic',
        heroTitle: 'Outdoor Gear & Sports Equipment Rebates',
        heroSubtitle: 'High-performance athletic apparel, fitness gear & outdoor equipment coupons.',
        badge: '🏃 Sports & Outdoors Deals',
        defaultCategory: 'sports'
      };
    case 'beauty':
      return {
        archetype: 'luxury',
        heroTitle: 'Luxury Skincare & Cosmetics Cashback Directory',
        heroSubtitle: 'Verified promo codes and instant rebates on luxury beauty & cosmetics.',
        badge: '💄 Beauty & Skincare Deals',
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
        heroTitle: 'Automotive Accessories & Car Care Cashback Portal',
        heroSubtitle: 'Top discounts on car electronics, detailing, parts & accessories.',
        badge: '🚗 Automotive Rebates',
        defaultCategory: 'digital'
      };
    case 'jewelry':
      return {
        archetype: 'luxury',
        heroTitle: 'Haute Jewelry, Gold & Luxury Watches Rebates',
        heroSubtitle: 'Exclusive boutique cashback links for watches, fine jewelry & gold.',
        badge: '✨ Boutique Luxury Rebates',
        defaultCategory: 'apparel'
      };
    case 'food':
      return {
        archetype: 'minimalist',
        heroTitle: 'Gourmet Food, Groceries & Wine Rebates',
        heroSubtitle: 'Direct cashback and promo codes for organic groceries, meal kits & fine wine.',
        badge: '🍷 Gourmet & Grocery Deals',
        defaultCategory: 'home'
      };
    case 'apparel':
    case 'default':
    default:
      return {
        archetype: 'classic',
        heroTitle: 'Exclusive Fashion Cashback Deals & Verified Promo Codes',
        heroSubtitle: 'Curated fashion cashback deals & exclusive coupons from top partner brands.',
        badge: '🔥 Verified Fashion Offers',
        defaultCategory: 'apparel'
      };
  }
}

