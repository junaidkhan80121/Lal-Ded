import { useState, useEffect, useRef } from 'react';
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
  {
    id: 7,
    name: 'Srinagar Heritage Tour',
    image: '/assets/hero-kashmir.png',
    duration: '3 Days / 2 Nights',
    price: '₹10,999',
    category: 'leisure',
    rating: 4.7,
    popular: false,
    highlights: ['Mughal Gardens (Shalimar & Nishat)', 'Old City walking tour', 'Shankaracharya Temple', 'Local handicraft shopping'],
  },
  {
    id: 8,
    name: 'Gurez Valley Expedition',
    image: '/assets/sonamarg.png',
    duration: '5 Days / 4 Nights',
    price: '₹22,999',
    category: 'adventure',
    rating: 4.9,
    popular: true,
    highlights: ['Rishu Valley trek', 'Habba Khatoon Village', 'Border area exploration', 'Traditional Dard heritage experience'],
  },
  {
    id: 9,
    name: 'Katra Vaishno Devi Pilgrimage',
    image: '/assets/pahalgam.png',
    duration: '3 Days / 2 Nights',
    price: '₹14,999',
    category: 'pilgrimage',
    rating: 4.8,
    popular: true,
    highlights: ['Vaishno Devi Darshan', 'Baba Bhairon Temple', 'Ardhkuwari Cave', 'Sant Nagar Bazaar'],
  },
  {
    id: 10,
    name: 'Mughal Gardens Escape',
    image: '/assets/dal-lake.png',
    duration: '2 Days / 1 Night',
    price: '₹7,999',
    category: 'leisure',
    rating: 4.6,
    popular: false,
    highlights: ['Shalimar Bagh', 'Nishat Bagh', 'Pari Mahal visit', 'Evening shikara ride'],
  },
  {
    id: 11,
    name: 'Aru Valley Retreat',
    image: '/assets/yusmarg.png',
    duration: '3 Days / 2 Nights',
    price: '₹13,999',
    category: 'premium',
    rating: 4.7,
    popular: false,
    highlights: ['Aru Valley camping', 'Tullian Lake trek', 'Lidder River picnic', 'Local shepherd village visit'],
  },
  {
    id: 12,
    name: 'Shopian Fruit Valley',
    image: '/assets/doodhpathri.png',
    duration: '2 Days / 1 Night',
    price: '₹8,499',
    category: 'leisure',
    rating: 4.5,
    popular: false,
    highlights: ['Apple orchard tour', 'Saffron fields visit', 'River Dusso (Duss)' , 'Local cuisine experience'],
  },
];

const categories = [
  { key: 'all', label: 'All Packages' },
  { key: 'adventure', label: 'Adventure' },
  { key: 'leisure', label: 'Leisure' },
  { key: 'premium', label: 'Premium' },
  { key: 'pilgrimage', label: 'Pilgrimage' },
];

const packagePerks = [
  { icon: '🚗', title: 'Private transfers', desc: 'Comfortable local transport planned around your itinerary.' },
  { icon: '🏨', title: 'Trusted stays', desc: 'Handpicked hotels and houseboats with dependable service.' },
  { icon: '🗺️', title: 'Flexible planning', desc: 'Choose from curated routes or request a custom trip.' },
];

export default function Packages() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [filtered, setFiltered] = useState(allPackages);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main className="packages-page" id="packages-page">
      {/* Hero */}
      <section className="packages-hero" id="packages-hero" ref={heroRef}>
        <div
          className="packages-hero__parallax-bg"
          style={{ transform: `translate(${mousePos.x * 0.02}%, ${mousePos.y * 0.02}%)` }}
        >
          <img src="/assets/travel-bg.jpg" alt="Kashmir" className="packages-hero__bg-img" />
        </div>
        <div className="packages-hero__overlay" />
        <div className="packages-hero__floating">
          <span className="packages-hero__float packages-hero__float--1">🧳</span>
          <span className="packages-hero__float packages-hero__float--2">🏔️</span>
          <span className="packages-hero__float packages-hero__float--3">❄️</span>
        </div>
        <div className="packages-hero__content container">
          <div className="packages-hero__badge animate-fade-in-up delay-1">
            <span>✦</span> Curated Kashmir Journeys
          </div>
          <h1 className="packages-hero__title heading-display animate-fade-in-up delay-2">
            Find the <span className="packages-hero__title-accent">Right Package</span><br />
            for Your Kashmir Escape
          </h1>
          <p className="packages-hero__subtitle animate-fade-in-up delay-3">
            From quick scenic getaways to longer adventure circuits, explore thoughtfully designed
            trips with trusted stays, local guidance, and easy planning.
          </p>
          <div className="packages-hero__actions animate-fade-in-up delay-4">
            <a href="#packages-grid-section" className="btn btn-primary">Explore Packages</a>
            <Link to="/contact" className="btn btn-outline">Request Custom Plan</Link>
          </div>
          <div className="packages-hero__stats animate-fade-in-up delay-5">
            {[
              { value: '12', label: 'Curated Packages' },
              { value: '4', label: 'Travel Styles' },
              { value: '24/7', label: 'Trip Support' },
            ].map((stat) => (
              <div className="packages-hero__stat" key={stat.label}>
                <span className="packages-hero__stat-value">{stat.value}</span>
                <span className="packages-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="packages-hero__scroll">
          <span>Scroll to choose</span>
          <div className="packages-hero__scroll-line" />
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="packages-main reveal" id="packages-grid-section">
        <div className="container">
          <div className="packages-intro">
            <div className="packages-intro__copy">
              <span className="section-label">✦ Travel Made Easy</span>
              <h2 className="section-title">Packages designed with the same polish as the rest of your journey.</h2>
              <p className="section-subtitle">
                Filter by travel style, compare highlights, and book the one that fits your pace best.
              </p>
            </div>
            <div className="packages-intro__perks">
              {packagePerks.map((perk) => (
                <div className="packages-intro__perk glass-card" key={perk.title}>
                  <span className="packages-intro__perk-icon">{perk.icon}</span>
                  <div>
                    <h3>{perk.title}</h3>
                    <p>{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

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
                    <div>
                      <span className="pkg-card-full__category">{pkg.category}</span>
                      <h3 className="pkg-card-full__title">{pkg.name}</h3>
                    </div>
                    <div className="pkg-card-full__meta">
                      <span className="pkg-card-full__duration">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {pkg.duration}
                      </span>
                    </div>
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
                    <p className="pkg-card-full__footer-copy">Need changes? We can customize this itinerary for dates, stays, and pace.</p>
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
