import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const timeline = [
  { year: '2022', title: 'Founded', desc: 'Lal Ded Tour & Travels began in Srinagar with a vision to share Kashmir\'s beauty through thoughtful, local-first travel experiences.' },
  { year: '2023', title: 'Growing Strong', desc: 'Expanded across major Kashmir destinations while building a dependable network of drivers, stays, and local guides.' },
  { year: '2024', title: 'Digital Leap', desc: 'Introduced online inquiries and customized trip planning to make booking more convenient for modern travellers.' },
  { year: '2025', title: 'Trusted Momentum', desc: 'Continued earning guest trust with personalized itineraries, responsive support, and a stronger presence across the valley.' },
];

const values = [
  { icon: '🌿', title: 'Sustainability', desc: 'We direct 80% of post-tax profits to community projects and eco-tourism initiatives.' },
  { icon: '🤝', title: 'Authenticity', desc: 'Local guides who share real stories, hidden gems, and cultural insights beyond the tourist lens.' },
  { icon: '🎯', title: 'Reliability', desc: 'Punctual service, transparent pricing, and round-the-clock support for every traveller.' },
  { icon: '❤️', title: 'Passion', desc: 'We don\'t just show you Kashmir — we share it. Every tour is a labour of love.' },
];

const storyHighlights = [
  { icon: '🧭', title: 'Tailor-made itineraries', desc: 'Trips shaped around your pace, season, and budget.' },
  { icon: '🏡', title: 'Local-first hospitality', desc: 'Trusted stays, drivers, and hosts across the valley.' },
  { icon: '🛡️', title: 'On-ground support', desc: 'Real people in Srinagar ready to help before and during your trip.' },
];

const promisePoints = [
  'Transparent planning from the first conversation',
  'Comfort-focused transport and stays',
  'Experiences designed for families, couples, and groups',
];

export default function About() {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.15 }
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
    <main className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero" ref={heroRef}>
        <div
          className="about-hero__parallax-bg"
          style={{ transform: `translate(${mousePos.x * 0.02}%, ${mousePos.y * 0.02}%)` }}
        >
          <img src="/assets/about-bg.jpg" alt="Kashmir landscape" className="about-hero__bg-img" />
        </div>
        <div className="about-hero__overlay" />
        <div className="about-hero__floating">
          <span className="about-hero__float about-hero__float--1">🌿</span>
          <span className="about-hero__float about-hero__float--2">🏔️</span>
          <span className="about-hero__float about-hero__float--3">✨</span>
        </div>
        <div className="about-hero__content container">
          <div className="about-hero__badge animate-fade-in-up delay-1">
            <span>✦</span> Rooted in Kashmir Since 2022
          </div>
          <h1 className="about-hero__title heading-display animate-fade-in-up delay-2">
            Travel Stories Built<br />
            Around <span className="about-hero__title-accent">People, Place, and Care</span>
          </h1>
          <p className="about-hero__subtitle animate-fade-in-up delay-3">
            Lal Ded Tour & Travels creates warm, well-planned Kashmir journeys with local insight,
            dependable service, and the kind of welcome that turns a trip into a memory.
          </p>
          <div className="about-hero__stats animate-fade-in-up delay-4">
            {[
              { value: '2500+', label: 'Travellers Hosted' },
              { value: '2022', label: 'Founded' },
              { value: '4.9★', label: 'Guest Rating' },
            ].map((stat) => (
              <div className="about-hero__stat" key={stat.label}>
                <span className="about-hero__stat-value">{stat.value}</span>
                <span className="about-hero__stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="about-hero__scroll">
          <span>Scroll to discover</span>
          <div className="about-hero__scroll-line" />
        </div>
      </section>

      {/* Story */}
      <section className="about-story reveal" id="about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__text">
              <span className="section-label">✦ Who We Are</span>
              <h2 className="section-title">Your Trusted Partner<br />in Kashmir Travel</h2>
              <div className="section-divider" />
              <p className="about-story__para">
                At Lal Ded Tour & Travels, we are dedicated to making your travel experiences smooth,
                memorable, and enjoyable. Based in Srinagar, Jammu & Kashmir, we specialize in providing
                personalized travel solutions, whether you're exploring the scenic beauty of Kashmir or
                planning trips to other destinations.
              </p>
              <p className="about-story__para">
                With a focus on customer satisfaction, reliability, and local expertise, our team ensures
                that every journey is comfortable and hassle-free. From transportation and accommodation
                bookings to guided tours and travel assistance, we are here to cater to all your travel needs.
              </p>
              <p className="about-story__para">
                Whether you're planning a family vacation, a honeymoon getaway, or a group tour,
                Lal Ded Tour & Travels is your trusted travel partner. Let us help you discover
                the charm and beauty of incredible destinations with ease and comfort.
              </p>
              <div className="about-story__promises">
                {promisePoints.map((point) => (
                  <div className="about-story__promise" key={point}>
                    <span className="about-story__promise-icon">✓</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-story__visual">
              <div className="about-story__image-card glass-card">
                <img src="/assets/sonamarg.png" alt="Kashmir beauty" className="about-story__image" />
              </div>
              <div className="about-story__stat-card glass-card">
                <span className="about-story__stat-value">2022</span>
                <span className="about-story__stat-label">Founded in Srinagar</span>
              </div>
              <div className="about-story__highlights">
                {storyHighlights.map((item) => (
                  <div className="about-story__highlight glass-card" key={item.title}>
                    <span className="about-story__highlight-icon">{item.icon}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="about-timeline reveal" id="about-timeline">
        <div className="container">
          <div className="about-timeline__header">
            <span className="section-label">✦ Our Journey</span>
            <h2 className="section-title">Milestones Along<br />The Way</h2>
            <p className="section-subtitle">
              A local travel company shaped by consistency, community ties, and a long love for the valley.
            </p>
          </div>
          <div className="about-timeline__list">
            {timeline.map((item, i) => (
              <div className="about-timeline__item" key={i} id={`timeline-${i}`}>
                <div className="about-timeline__marker">
                  <span className="about-timeline__year">{item.year}</span>
                  <div className="about-timeline__dot" />
                </div>
                <div className="about-timeline__content glass-card">
                  <h3 className="about-timeline__title">{item.title}</h3>
                  <p className="about-timeline__desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values reveal" id="about-values">
        <div className="container">
          <div className="about-values__header">
            <span className="section-label">✦ What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              The standards we hold ourselves to every time we plan, host, and support a journey.
            </p>
          </div>
          <div className="about-values__grid grid grid-4">
            {values.map((v, i) => (
              <div className="about-values__card glass-card" key={i} id={`value-${i}`}>
                <span className="about-values__icon">{v.icon}</span>
                <h3 className="about-values__title">{v.title}</h3>
                <p className="about-values__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="about-stats reveal" id="about-stats">
        <div className="container">
          <div className="about-stats__bar glass-card">
            {[
              { value: '2500+', label: 'Happy Travellers' },
              { value: '50+', label: 'Destinations' },
              { value: '2022', label: 'Founded' },
              { value: '4.9★', label: 'Google Rating' },
            ].map((s, i) => (
              <div className="about-stats__item" key={i}>
                <span className="about-stats__value">{s.value}</span>
                <span className="about-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
          <div className="about-cta glass-card">
            <div>
              <span className="section-label">✦ Ready to Travel</span>
              <h2 className="about-cta__title">Let us design a Kashmir itinerary that feels personal.</h2>
              <p className="about-cta__desc">
                Tell us your dates, travel style, and must-see places. We&apos;ll turn that into a thoughtful plan.
              </p>
            </div>
            <div className="about-cta__actions">
              <Link to="/contact" className="btn btn-primary">Plan My Trip</Link>
              <Link to="/packages" className="btn btn-secondary">Browse Packages</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
