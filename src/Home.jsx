import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import './Home.css';

const destinations = [
  { id: 1, name: 'Gulmarg', image: '/assets/gulmarg.png', desc: 'Ski slopes & gondola rides', price: '₹12,999', duration: '3 Days' },
  { id: 2, name: 'Sonamarg', image: '/assets/sonamarg.png', desc: 'Golden meadows & glaciers', price: '₹15,999', duration: '4 Days' },
  { id: 3, name: 'Pahalgam', image: '/assets/pahalgam.png', desc: 'Betaab Valley & rivers', price: '₹18,999', duration: '5 Days' },
  { id: 4, name: 'Dal Lake', image: '/assets/dal-lake.png', desc: 'Houseboats & shikara', price: '₹8,999', duration: '2 Days' },
];

const categories = [
  { icon: '🗻', label: 'Mountains', count: 12 },
  { icon: '🏔️', label: 'Adventure', count: 8 },
  { icon: '🏖️', label: 'Lakes', count: 6 },
  { icon: '🌲', label: 'Forests', count: 5 },
  { icon: '⛷️', label: 'Skiing', count: 4 },
  { icon: '🛶', label: 'Rafting', count: 3 },
];

const testimonials = [
  { id: 1, name: 'Priya Sharma', location: 'Mumbai', text: 'Absolutely magical experience! The houseboat stay on Dal Lake was a dream come true. Lal Ded made everything seamless.', rating: 5 },
  { id: 2, name: 'Rahul Verma', location: 'Delhi', text: 'The Gulmarg gondola ride was breathtaking. Professional guides and excellent accommodations throughout.', rating: 5 },
  { id: 3, name: 'Anita Patel', location: 'Bangalore', text: 'Best trip ever! Sonamarg in autumn was stunning. Thank you for the personalized itinerary.', rating: 5 },
];

const whyChooseUs = [
  { icon: '🏆', title: '19+ Years Experience', desc: 'Trusted by thousands since 2005' },
  { icon: '🌍', title: 'Local Expertise', desc: 'Born & raised in Srinagar' },
  { icon: '💰', title: 'Best Price Guarantee', desc: 'Competitive rates, no hidden costs' },
  { icon: '🎯', title: 'Custom Itineraries', desc: 'Tailored to your preferences' },
];

const searchSuggestions = ['Gulmarg', 'Pahalgam', 'Dal Lake', 'Sonamarg', 'Srinagar', 'Yusmarg', 'Doodhpathri', 'Aru Valley'];

export default function Home() {
  const whatsappUrl = 'https://wa.me/917006267930';
  const heroRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filtered = searchSuggestions.filter(s =>
        s.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <main className="home" id="home-page">
      {/* ── Hero Section ── */}
      <section className="hero" ref={heroRef}>
        <div
          className="hero__parallax-bg"
          style={{
            transform: `translate(${mousePos.x * 0.02}%, ${mousePos.y * 0.02}%)`,
          }}
        >
          <img src="/assets/hero-kashmir.png" alt="Kashmir valley" className="hero__bg-img" />
        </div>
        <div className="hero__overlay" />

        <div className="hero__floating-elements">
          <div className="floating-element floating-element--1">🌸</div>
          <div className="floating-element floating-element--2">❄️</div>
          <div className="floating-element floating-element--3">🏔️</div>
        </div>

        <div className="hero__content container">
          <div className="hero__badge animate-fade-in-up delay-1">
            <span>✨</span> Discover Paradise on Earth
          </div>
          <h1 className="hero__title heading-display animate-fade-in-up delay-2">
            Your Dream <br />
            <span className="hero__title-accent">Kashmir Adventure</span> <br />
            Awaits
          </h1>
          <p className="hero__subtitle animate-fade-in-up delay-3">
            From snow-capped peaks to serene lakes — let us craft your perfect journey
          </p>

          <div className="hero__search-wrapper animate-fade-in-up delay-4">
            <div className="hero__search" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
              <span className="hero__search-icon">🔍</span>
              <input
                className="hero__search-input"
                placeholder="Where do you want to go?"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length > 0 && setShowSuggestions(true)}
              />
              <button className="hero__search-btn">
                <span>Search</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>

            {showSuggestions && (
              <div className="hero__suggestions">
                {filteredSuggestions.map((suggestion, i) => (
                  <button
                    key={i}
                    className="hero__suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <span className="hero__suggestion-icon">📍</span>
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hero__quick-stats animate-fade-in-up delay-5">
            <div className="hero__stat">
              <span className="hero__stat-value">50+</span>
              <span className="hero__stat-label">Destinations</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">2500+</span>
              <span className="hero__stat-label">Happy Travelers</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-value">4.9</span>
              <span className="hero__stat-label">Rating</span>
            </div>
          </div>
        </div>

        <div className="hero__scroll-indicator">
          <span>Scroll to explore</span>
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-wheel" />
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="categories reveal">
        <div className="container">
          <div className="categories__header">
            <div>
              <h2 className="categories__title">Explore by Category</h2>
              <p className="categories__subtitle">Find your perfect adventure type</p>
            </div>
            <Link to="/packages" className="categories__view-all">
              View All <span>→</span>
            </Link>
          </div>

          <div className="categories__grid">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="categories__card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="categories__icon">{cat.icon}</div>
                <div className="categories__info">
                  <span className="categories__label">{cat.label}</span>
                  <span className="categories__count">{cat.count} places</span>
                </div>
                <div className="categories__arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Destinations ── */}
      <section className="destinations reveal">
        <div className="container">
          <div className="destinations__header">
            <div>
              <span className="section-label">✦ Popular Destinations</span>
              <h2 className="destinations__title">Most Visited Places</h2>
            </div>
            <Link to="/packages" className="destinations__view-all">
              View All Packages
            </Link>
          </div>

          <div className="destinations__grid">
            {destinations.map((dest, i) => (
              <Link
                to="/packages"
                key={dest.id}
                className={`destinations__card ${i === 0 ? 'destinations__card--featured' : ''}`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="destinations__card-image">
                  <img src={dest.image} alt={dest.name} />
                  <div className="destinations__card-overlay" />
                </div>
                <div className="destinations__card-content">
                  <h3 className="destinations__card-title">{dest.name}</h3>
                  <p className="destinations__card-desc">{dest.desc}</p>
                  <div className="destinations__card-footer">
                    <span className="destinations__card-price">{dest.price}</span>
                    <span className="destinations__card-duration">{dest.duration}</span>
                  </div>
                </div>
                <div className="destinations__card-hover-content">
                  <button className="btn btn-primary btn-sm">Explore</button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="why-us reveal">
        <div className="container">
          <div className="why-us__header">
            <span className="section-label">✦ Why Choose Us</span>
            <h2 className="why-us__title">The Lal Ded Difference</h2>
          </div>

          <div className="why-us__grid">
            {whyChooseUs.map((item, i) => (
              <div
                key={i}
                className="why-us__card"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="why-us__icon">{item.icon}</div>
                <h3 className="why-us__card-title">{item.title}</h3>
                <p className="why-us__card-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="testimonials reveal">
        <div className="container">
          <div className="testimonials__header">
            <span className="section-label">✦ Testimonials</span>
            <h2 className="testimonials__title">What Travelers Say</h2>
          </div>

          <div className="testimonials__carousel">
            <div className="testimonials__card">
              <div className="testimonials__stars">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className="testimonials__text">
                "{testimonials[activeTestimonial].text}"
              </p>
              <div className="testimonials__author">
                <div className="testimonials__avatar">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div className="testimonials__author-info">
                  <span className="testimonials__name">{testimonials[activeTestimonial].name}</span>
                  <span className="testimonials__location">{testimonials[activeTestimonial].location}</span>
                </div>
              </div>
            </div>

            <div className="testimonials__dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`testimonials__dot ${i === activeTestimonial ? 'testimonials__dot--active' : ''}`}
                  onClick={() => setActiveTestimonial(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="stats reveal">
        <div className="container">
          <div className="stats__grid">
            {[
              { value: 50, suffix: '+', label: 'Destinations' },
              { value: 2500, suffix: '+', label: 'Travellers' },
              { value: 19, suffix: '', label: 'Years Trust' },
              { value: 98, suffix: '%', label: 'Satisfaction' },
            ].map((stat, i) => (
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

      {/* ── Newsletter ── */}
      <section className="newsletter reveal">
        <div className="container">
          <div className="newsletter__card">
            <div className="newsletter__content">
              <span className="newsletter__badge">📬 Exclusive Deals</span>
              <h2 className="newsletter__title">Get Special Offers</h2>
              <p className="newsletter__desc">Subscribe and be the first to know about exclusive Kashmir packages</p>
              <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter__input"
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </form>
            </div>
            <div className="newsletter__decoration">
              <div className="newsletter__circle newsletter__circle--1" />
              <div className="newsletter__circle newsletter__circle--2" />
              <div className="newsletter__circle newsletter__circle--3" />
            </div>
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
            Ready for Your <br />Kashmir Adventure?
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

      {/* ── WhatsApp FAB ── */}
      <a href={whatsappUrl} className="whatsapp-fab" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
