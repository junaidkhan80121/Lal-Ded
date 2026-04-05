import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import './Home.css';

const featuredPackages = [
  {
    id: 1,
    name: 'Gulmarg Meadows',
    image: '/assets/gulmarg.png',
    duration: '7 Days',
    location: 'Gulmarg',
    price: '₹12,999',
    rating: '4.9',
    tag: 'Popular',
    desc: 'Ski slopes, gondola rides & pristine meadows',
  },
  {
    id: 2,
    name: 'Sonamarg Golden',
    image: '/assets/sonamarg.png',
    duration: '4 Days',
    location: 'Sonamarg',
    price: '₹15,999',
    rating: '4.8',
    tag: 'Trending',
    desc: 'Thajiwas glacier, golden meadows',
  },
  {
    id: 3,
    name: 'Dal Lake Houseboat',
    image: '/assets/dal-lake.png',
    duration: '2 Days',
    location: 'Srinagar',
    price: '₹8,999',
    rating: '5.0',
    tag: 'Best Value',
    desc: 'Shikara rides & houseboat stay',
  },
];

const categories = [
  { icon: '🗻', label: 'Mountains' },
  { icon: '🏖️', label: 'Lakes' },
  { icon: '🌲', label: 'Forests' },
  { icon: '🏛️', label: 'Heritage' },
  { icon: '⛷️', label: 'Adventure' },
];

const stats = [
  { value: 50, suffix: '+', label: 'Destinations' },
  { value: 2500, suffix: '+', label: 'Travellers' },
  { value: 19, suffix: '', label: 'Years Trust' },
];

export default function Home() {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="home" id="home-page">
      {/* ── Hero Section ── */}
      <section className="hero" ref={heroRef}>
        <div className="hero__bg">
          <img src="/assets/hero-kashmir.png" alt="Kashmir valley" className="hero__bg-img" />
          <div className="hero__overlay" />
        </div>

        <div className="hero__content container">
          <h1 className="hero__title heading-display animate-fade-in-up delay-1">
            Find Your Next <br />
            <span className="hero__title-accent">Adventure</span>
          </h1>

          <div className="hero__search animate-fade-in-up delay-2">
            <span className="hero__search-icon">🔍</span>
            <input
              className="hero__search-input"
              placeholder="Search destinations..."
              type="text"
            />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="categories reveal">
        <div className="container">
          <div className="categories__header">
            <h2 className="categories__title">Categories</h2>
            <span className="categories__view-all">View All</span>
          </div>

          <div className="categories__scroll">
            {categories.map((cat, i) => (
              <div
                key={i}
                className={`categories__item ${i === 0 ? 'categories__item--active' : ''}`}
              >
                <div className={`categories__icon ${i === 0 ? 'categories__icon--active' : ''}`}>
                  {cat.icon}
                </div>
                <span className="categories__label">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Packages (Bento Grid) ── */}
      <section className="featured reveal">
        <div className="container">
          <h2 className="featured__title">Featured Expeditions</h2>

          <div className="featured__grid">
            {/* Large Card */}
            <Link to="/packages" className="featured__card featured__card--large">
              <div className="featured__card-image">
                <img src={featuredPackages[0].image} alt={featuredPackages[0].name} />
                <div className="featured__card-rating">
                  ★ {featuredPackages[0].rating}
                </div>
              </div>
              <div className="featured__card-content">
                <div className="featured__card-header">
                  <h3>{featuredPackages[0].name}</h3>
                </div>
                <div className="featured__card-meta">
                  <span>🕐 {featuredPackages[0].duration}</span>
                  <span>📍 {featuredPackages[0].location}</span>
                </div>
              </div>
            </Link>

            {/* Small Card 1 */}
            <Link to="/packages" className="featured__card">
              <div className="featured__card-image featured__card-image--small">
                <img src={featuredPackages[1].image} alt={featuredPackages[1].name} />
                <div className="featured__card-rating featured__card-rating--small">
                  ★ {featuredPackages[1].rating}
                </div>
              </div>
              <div className="featured__card-content featured__card-content--small">
                <h3>{featuredPackages[1].name}</h3>
                <div className="featured__card-footer">
                  <span>{featuredPackages[1].duration}</span>
                </div>
              </div>
            </Link>

            {/* Small Card 2 */}
            <Link to="/packages" className="featured__card">
              <div className="featured__card-image featured__card-image--small">
                <img src={featuredPackages[2].image} alt={featuredPackages[2].name} />
                <div className="featured__card-rating featured__card-rating--small">
                  ★ {featuredPackages[2].rating}
                </div>
              </div>
              <div className="featured__card-content featured__card-content--small">
                <h3>{featuredPackages[2].name}</h3>
                <div className="featured__card-footer">
                  <span>{featuredPackages[2].duration}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Curated Story ── */}
      <section className="story reveal">
        <div className="container">
          <div className="story__card">
            <div className="story__content">
              <span className="story__label">Travelogue Issue #04</span>
              <h2 className="story__title">
                The Soul of the <br />Great Himalayas
              </h2>
              <p className="story__desc">
                Explore the untamed wilderness of Kashmir through our lens. 
                An editorial journey into the heart of the mountains.
              </p>
              <button className="story__btn">Read Article</button>
            </div>
            <div className="story__glow" />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats reveal">
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <div className="stats__item" key={i}>
                <span className="stats__value">
                  <CountUp duration={2.5} end={stat.value} enableScrollSpy scrollSpyOnce />
                  {stat.suffix}
                </span>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta reveal">
        <div className="cta__bg">
          <img src="/assets/travel-bg-2.jpg" alt="Kashmir" className="cta__bg-img" />
          <div className="cta__overlay" />
        </div>
        <div className="container cta__content">
          <h2 className="cta__title heading-display">
            Want a Custom <br />Kashmir Adventure?
          </h2>
          <p className="cta__desc">
            Let us handle the logistics while you enjoy the journey.
          </p>
          <div className="cta__actions">
            <Link to="/contact" className="btn btn-primary">
              Plan Your Trip
            </Link>
            <Link to="/packages" className="btn btn-secondary">
              Browse Packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}