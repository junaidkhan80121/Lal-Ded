import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Packages.css';

const allPackages = [
  {
    id: 1,
    name: 'Gulmarg Meadows',
    image: '/assets/gulmarg.png',
    duration: '3 Days / 2 Nights',
    price: '₹12,999',
    category: 'adventure',
    rating: 4.9,
    popular: true,
    highlights: ['Gondola cable car ride', 'Ski slopes & snow activities', 'Strawberry Valley visit', 'Alpine meadow trekking'],
  },
  {
    id: 2,
    name: 'Sonamarg Golden Valley',
    image: '/assets/sonamarg.png',
    duration: '4 Days / 3 Nights',
    price: '₹15,999',
    category: 'adventure',
    rating: 4.8,
    popular: true,
    highlights: ['Thajiwas Glacier trek', 'Zero Point excursion', 'River rafting experience', 'Camping under the stars'],
  },
  {
    id: 3,
    name: 'Pahalgam Riverside',
    image: '/assets/pahalgam.png',
    duration: '5 Days / 4 Nights',
    price: '₹18,999',
    category: 'premium',
    rating: 4.9,
    popular: false,
    highlights: ['Betaab Valley exploration', 'Lidder River fishing', 'Aru Valley horseback ride', 'Chandanwari snow point'],
  },
  {
    id: 4,
    name: 'Dal Lake Houseboat',
    image: '/assets/dal-lake.png',
    duration: '2 Days / 1 Night',
    price: '₹8,999',
    category: 'leisure',
    rating: 4.7,
    popular: true,
    highlights: ['Luxury houseboat stay', 'Shikara sunrise ride', 'Floating market visit', 'Mughal Gardens tour'],
  },
  {
    id: 5,
    name: 'Yusmarg Alpine Escape',
    image: '/assets/yusmarg.png',
    duration: '3 Days / 2 Nights',
    price: '₹11,999',
    category: 'leisure',
    rating: 4.6,
    popular: false,
    highlights: ['Doodh Ganga river walk', 'Pine forest meditation', 'Horse riding to Sang Safed', 'Bird watching trails'],
  },
  {
    id: 6,
    name: 'Doodhpathri Meadows',
    image: '/assets/doodhpathri.png',
    duration: '2 Days / 1 Night',
    price: '₹9,999',
    category: 'leisure',
    rating: 4.5,
    popular: false,
    highlights: ['Rolling meadow picnics', 'Milky stream walks', 'Photography paradise tour', 'Local shepherd encounters'],
  },
];

const categories = [
  { key: 'all', label: 'All Packages' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'leisure', label: 'Leisure' },
  { key: 'premium', label: 'Premium' },
];

export default function Packages() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filtered, setFiltered] = useState(allPackages);

  useEffect(() => {
    if (activeFilter === 'all') {
      setFiltered(allPackages);
    } else {
      setFiltered(allPackages.filter((p) => p.category === activeFilter));
    }
  }, [activeFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="packages-page" id="packages-page">
      {/* Hero */}
      <section className="packages-hero" id="packages-hero">
        <div className="packages-hero__bg">
          <img src="/assets/hero-kashmir.png" alt="Kashmir" className="packages-hero__bg-img" />
          <div className="packages-hero__overlay" />
        </div>
        <div className="packages-hero__content container">
          <span className="section-label animate-fade-in-up delay-1">✦ Tour Packages</span>
          <h1 className="packages-hero__title heading-display animate-fade-in-up delay-2">
            Explore Our <span className="hero__title-accent">Kashmir Packages</span>
          </h1>
          <p className="packages-hero__subtitle animate-fade-in-up delay-3">
            From snow-capped Gulmarg to the serene Dal Lake — find the perfect journey for your Kashmir dream.
          </p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="packages-main reveal" id="packages-grid-section">
        <div className="container">
          <div className="packages-filters" id="packages-filters">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`packages-filter-btn ${activeFilter === cat.key ? 'packages-filter-btn--active' : ''}`}
                onClick={() => setActiveFilter(cat.key)}
                id={`filter-${cat.key}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="packages-grid">
            {filtered.map((pkg, i) => (
              <div className="pkg-card-full glass-card" key={pkg.id} style={{ animationDelay: `${i * 0.1}s` }} id={`package-${pkg.id}`}>
                <div className="pkg-card-full__image-wrap">
                  <img src={pkg.image} alt={pkg.name} className="pkg-card-full__image" />
                  {pkg.popular && <span className="pkg-card-full__badge">⭐ Popular</span>}
                  <div className="pkg-card-full__rating">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-saffron)" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    {pkg.rating}
                  </div>
                </div>
                <div className="pkg-card-full__body">
                  <div className="pkg-card-full__top">
                    <h3 className="pkg-card-full__title">{pkg.name}</h3>
                    <span className="pkg-card-full__duration">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {pkg.duration}
                    </span>
                  </div>
                  <ul className="pkg-card-full__highlights">
                    {pkg.highlights.map((h, j) => (
                      <li key={j} className="pkg-card-full__highlight">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="pkg-card-full__footer">
                    <Link to="/contact" className="btn btn-primary btn-sm">Book Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="packages-empty">
              <p>No packages found in this category. Try a different filter!</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
