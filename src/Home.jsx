import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import './Home.css';

const featuredPackages = [
  {
    id: 1,
    name: 'Gulmarg Meadows',
    image: '/assets/gulmarg.png',
    duration: '3 Days / 2 Nights',
    price: '₹12,999',
    tag: 'Popular',
    desc: 'Ski slopes, gondola rides & pristine meadows',
  },
  {
    id: 2,
    name: 'Sonamarg Golden Valley',
    image: '/assets/sonamarg.png',
    duration: '4 Days / 3 Nights',
    price: '₹15,999',
    tag: 'Trending',
    desc: 'Thajiwas glacier, golden meadows & river trails',
  },
  {
    id: 3,
    name: 'Dal Lake Houseboat',
    image: '/assets/dal-lake.png',
    duration: '2 Days / 1 Night',
    price: '₹8,999',
    tag: 'Best Value',
    desc: 'Shikara rides, floating gardens & houseboat stay',
  },
];

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
      </svg>
    ),
    title: 'Multi-Day Tours',
    desc: 'Explore Kashmir via shared or private multi-day tours covering Gulmarg, Sonamarg, Pahalgam and more.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
      </svg>
    ),
    title: 'Day Excursions',
    desc: 'Short, immersive Srinagar tours and outskirts trips — from a few hours to a full day of adventure.',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    title: 'Custom Packages',
    desc: 'Corporate tours, school trips, filming support, vehicle hire & emergency assistance — all tailored for you.',
  },
];

const stats = [
  { value: 50, suffix: '+', label: 'Local Destinations' },
  { value: 20, suffix: '+', label: 'Foreign Destinations' },
  { value: 2500, suffix: '+', label: 'Happy Travellers' },
  { value: 19, suffix: '', label: 'Years of Trust' },
];

export default function Home() {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

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
      {/* ── Hero ── */}
      <section className="hero" ref={heroRef} id="hero-section">
        <div className="hero__bg">
          <img src="/assets/hero-kashmir.png" alt="Kashmir valley" className="hero__bg-img" />
          <div className="hero__overlay" />
        </div>

        {/* Floating decorative shapes */}
        <div className="hero__shape hero__shape--1" />
        <div className="hero__shape hero__shape--2" />
        <div className="hero__shape hero__shape--3" />

        <div className="hero__content container">
          <span className="section-label animate-fade-in-up delay-1">✦ Welcome to Paradise</span>
          <h1 className="hero__title heading-display animate-fade-in-up delay-2">
            Discover the<br />
            <span className="hero__title-accent">Magic of Kashmir</span>
          </h1>
          <p className="hero__subtitle animate-fade-in-up delay-3">
            Embark on a journey through snow-capped mountains, emerald valleys,
            and serene lakes. Let us craft your perfect Kashmir adventure.
          </p>
          <div className="hero__actions animate-fade-in-up delay-4">
            <Link to="/packages" className="btn btn-primary" id="hero-explore-btn">
              Explore Packages
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/contact" className="btn btn-outline" id="hero-contact-btn">
              Plan Your Trip
            </Link>
          </div>

          <div className="hero__badges animate-fade-in-up delay-5">
            <div className="hero__badge">
              <span className="hero__badge-value">4.9★</span>
              <span className="hero__badge-label">Google Rating</span>
            </div>
            <div className="hero__badge-divider" />
            <div className="hero__badge">
              <span className="hero__badge-value">2500+</span>
              <span className="hero__badge-label">Happy Travellers</span>
            </div>
            <div className="hero__badge-divider" />
            <div className="hero__badge">
              <span className="hero__badge-value">19 Yrs</span>
              <span className="hero__badge-label">of Trust</span>
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint animate-fade-in delay-6">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-dot" />
          </div>
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* ── Featured Packages ── */}
      <section className="featured reveal" id="featured-section">
        <div className="container">
          <div className="featured__header">
            <div>
              <span className="section-label">✦ Featured Packages</span>
              <h2 className="section-title">Handpicked Kashmir<br/>Experiences</h2>
            </div>
            <Link to="/packages" className="btn btn-outline btn-sm featured__view-all" id="featured-view-all">
              View All Packages
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>

          <div className="featured__grid">
            {featuredPackages.map((pkg, i) => (
              <Link to="/packages" key={pkg.id} className="pkg-card glass-card" style={{ animationDelay: `${i * 0.15}s` }} id={`featured-pkg-${pkg.id}`}>
                <div className="pkg-card__image-wrap">
                  <img src={pkg.image} alt={pkg.name} className="pkg-card__image" />
                  <span className="pkg-card__tag">{pkg.tag}</span>
                </div>
                <div className="pkg-card__body">
                  <h3 className="pkg-card__title">{pkg.name}</h3>
                  <p className="pkg-card__desc">{pkg.desc}</p>
                  <div className="pkg-card__footer">
                    <span className="pkg-card__duration">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {pkg.duration}
                    </span>
                    <span className="pkg-card__price">{pkg.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats reveal" ref={statsRef} id="stats-section">
        <div className="stats__glow" />
        <div className="container">
          <div className="stats__grid">
            {stats.map((stat, i) => (
              <div className="stats__item" key={i} id={`stat-${i}`}>
                <span className="stats__value">
                  <CountUp duration={2.5} end={stat.value} enableScrollSpy scrollSpyOnce />{stat.suffix}
                </span>
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="why reveal" id="why-section">
        <div className="container">
          <div className="why__header">
            <span className="section-label">✦ Why Choose Us</span>
            <h2 className="section-title">Leading Responsible<br/>Tourism Since 2005</h2>
            <p className="section-subtitle">
              We direct 80% of our post-tax profits from all tours to fund community projects —
              a model recognized with awards for sustainable tourism across India.
            </p>
          </div>
          <div className="why__features grid grid-3">
            {[
              { icon: '🛡️', title: 'Safety First', desc: 'Experienced guides, insured vehicles, and 24/7 on-ground support for worry-free travel.' },
              { icon: '🎯', title: 'Tailored Itineraries', desc: 'Every trip is customized to your preferences, pace, and budget — no cookie-cutter tours.' },
              { icon: '💚', title: 'Eco-Friendly', desc: 'We practice sustainable tourism ensuring nature\'s beauty is preserved for future generations.' },
              { icon: '⭐', title: 'Local Expertise', desc: 'Our guides are Kashmir locals who share authentic stories, hidden gems, and cultural insights.' },
              { icon: '💰', title: 'Best Value', desc: 'Premium experiences at fair prices. No hidden costs — transparent pricing every time.' },
              { icon: '🏔️', title: 'Offbeat Routes', desc: 'Discover untouched meadows, secret trails, and destinations beyond the usual tourist circuit.' },
            ].map((f, i) => (
              <div className="why__card glass-card" key={i} id={`why-card-${i}`}>
                <span className="why__card-icon">{f.icon}</span>
                <h3 className="why__card-title">{f.title}</h3>
                <p className="why__card-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="services reveal" id="services-section">
        <div className="container">
          <div className="services__header">
            <span className="section-label">✦ What We Do</span>
            <h2 className="section-title">Tailored Solutions for<br/>Every Traveller</h2>
          </div>
          <div className="services__grid grid grid-3">
            {services.map((s, i) => (
              <div className="services__card glass-card" key={i} id={`service-card-${i}`}>
                <div className="services__card-icon">{s.icon}</div>
                <h3 className="services__card-title">{s.title}</h3>
                <p className="services__card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="cta-banner reveal" id="cta-section">
        <div className="cta-banner__bg">
          <img src="/assets/travel-bg-2.jpg" alt="Kashmir landscape" className="cta-banner__bg-img" />
          <div className="cta-banner__overlay" />
        </div>
        <div className="container cta-banner__content">
          <span className="section-label">✦ Create Your Own Tour</span>
          <h2 className="cta-banner__title heading-display">
            Want a Custom<br/>Kashmir Adventure?
          </h2>
          <p className="cta-banner__desc">
            Let us handle the logistics while you enjoy the journey.
            Transport, hotels, excursions — all crafted around your dream itinerary.
          </p>
          <div className="cta-banner__actions">
            <Link to="/contact" className="btn btn-primary" id="cta-plan-btn">
              Plan Your Trip
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
            <Link to="/packages" className="btn btn-outline" id="cta-browse-btn">Browse Packages</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
