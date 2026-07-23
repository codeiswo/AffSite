'use client';

const brands = [
  { name: 'Nike', color: '#111111' },
  { name: 'ZARA', color: '#000000' },
  { name: 'adidas', color: '#000000' },
  { name: 'Gucci', color: '#1B365D' },
  { name: 'Burberry', color: '#000000' },
  { name: "Levi's", color: '#C41230' },
  { name: 'H&M', color: '#E50010' },
  { name: 'Uniqlo', color: '#FF0000' },
  { name: 'Prada', color: '#000000' },
  { name: 'Chanel', color: '#000000' },
  { name: 'PUMA', color: '#000000' },
  { name: 'Under Armour', color: '#1D1D1D' },
];

export default function BrandWall() {
  // Double the brands for seamless infinite scroll
  const allBrands = [...brands, ...brands];

  return (
    <section id="brand-wall" className="section-padding bg-white dark:bg-gray-900 overflow-hidden border-b border-gray-100 dark:border-gray-800">
      <div className="container-custom mb-12 text-center">
        <p className="text-sm font-semibold text-accent uppercase tracking-widest mb-3">
          OFFICIAL PARTNER MERCHANTS
        </p>
        <h2 className="text-3xl sm:text-4xl font-heading font-bold text-gray-900 dark:text-white">
          Explore Official Deals Across 1,500+ Top Brands
        </h2>
      </div>

      {/* Scrolling brand track */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white dark:from-gray-900 to-transparent z-10" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white dark:from-gray-900 to-transparent z-10" />

        <div className="flex animate-scroll hover:[animation-play-state:paused]">
          {allBrands.map((brand, i) => (
            <div
              key={`${brand.name}-${i}`}
              className="flex-shrink-0 mx-4 group"
            >
              <div className="w-44 h-24 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center px-6 group-hover:border-accent/30 group-hover:bg-accent/5 dark:group-hover:bg-accent/5 transition-all duration-300 group-hover:shadow-glow">
                <span
                  className="text-xl font-heading font-bold tracking-tight opacity-50 group-hover:opacity-100 transition-opacity duration-300 text-gray-800 dark:text-gray-200"
                >
                  {brand.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
