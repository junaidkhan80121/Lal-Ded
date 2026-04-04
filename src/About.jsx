import { useEffect } from 'react';
import './About.css';

const timeline = [
  { year: '2005', title: 'Founded', desc: 'Lal Ded Tour & Travels was born in the heart of Srinagar with a vision to share Kashmir\'s beauty with the world.' },
  { year: '2010', title: 'Growing Strong', desc: 'Expanded to cover all major Kashmir destinations, building a trusted network of local guides and partners.' },
  { year: '2018', title: 'Digital Leap', desc: 'Launched online booking and customized tour planning, making it easier than ever to plan a Kashmir trip.' },
  { year: '2025', title: 'Beyond Kashmir', desc: 'Now offering international partnerships and corporate travel solutions while staying rooted in community tourism.' },
];

const values = [
  { icon: '🌿', title: 'Sustainability', desc: 'We direct 80% of post-tax profits to community projects and eco-tourism initiatives.' },
  { icon: '🤝', title: 'Authenticity', desc: 'Local guides who share real stories, hidden gems, and cultural insights beyond the tourist lens.' },
  { icon: '🎯', title: 'Reliability', desc: 'Punctual service, transparent pricing, and round-the-clock support for every traveller.' },
  { icon: '❤️', title: 'Passion', desc: 'We don\'t just show you Kashmir — we share it. Every tour is a labour of love.' },
];

export default function About() {
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

  return (
    <main className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero" id="about-hero">
        <div className="about-hero__bg">
          <img src="/assets/hero-kashmir.png" alt="Kashmir landscape" className="about-hero__bg-img" />
          <div className="about-hero__overlay" />
        </div>
        <div className="about-hero__content container">
          <span className="section-label animate-fade-in-up delay-1">✦ Our Story</span>
          <h1 className="about-hero__title heading-display animate-fade-in-up delay-2">
            About <span className="hero__title-accent">Lal Ded</span>
          </h1>
          <p className="about-hero__subtitle animate-fade-in-up delay-3">
            A journey that started with a love for Kashmir and a commitment to responsible tourism.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story reveal" id="about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__text">
              <span className="section-label">✦ Who We Are</span>
              <h2 className="section-title">Your Trusted Partner<br/>in Kashmir Travel</h2>
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
            </div>
            <div className="about-story__visual">
              <div className="about-story__image-card glass-card">
                <img src="/assets/sonamarg.png" alt="Kashmir beauty" className="about-story__image" />
              </div>
              <div className="about-story__stat-card glass-card">
                <span className="about-story__stat-value">19+</span>
                <span className="about-story__stat-label">Years of Excellence</span>
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
            <h2 className="section-title">Milestones Along<br/>The Way</h2>
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
              { value: '19+', label: 'Years Active' },
              { value: '4.9★', label: 'Google Rating' },
            ].map((s, i) => (
              <div className="about-stats__item" key={i}>
                <span className="about-stats__value">{s.value}</span>
                <span className="about-stats__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
