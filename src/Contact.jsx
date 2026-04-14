import { useState, useEffect, useRef } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import './Contact.css';

const quickActions = [
  { icon: '📞', label: 'Call Now', sublabel: '7006267930', action: 'tel:+917006267930', color: '#25D366' },
  { icon: '💬', label: 'WhatsApp', sublabel: 'Chat with us', action: 'https://wa.me/917006267930', color: '#25D366' },
  { icon: '📧', label: 'Email', sublabel: 'Send inquiry', action: 'mailto:ahsanamin1994@gmail.com', color: '#EA4335' },
];

const officeImages = [
  '/assets/hero-kashmir.png',
  '/assets/gulmarg.png',
  '/assets/sonamarg.png',
];

export default function Contact() {
  const whatsappUrl = 'https://wa.me/917006267930';
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

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
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const hero = heroRef.current;
    if (hero) hero.addEventListener('mousemove', handleMouseMove);
    return () => { if (hero) hero.removeEventListener('mousemove', handleMouseMove); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % officeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8000/queries',
        { fname, lname, email, phone, query: desc },
        { headers: { secret: import.meta.env.VITE_SECRET } }
      );
      console.log(response.data);
      setSubmitted(true);
      setFName(''); setLName(''); setEmail(''); setPhone(''); setDesc('');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <main className="contact-page" id="contact-page">
      {/* Hero */}
      <section className="contact-hero" ref={heroRef}>
        <div 
          className="contact-hero__parallax-bg"
          style={{ transform: `translate(${mousePos.x * 0.02}%, ${mousePos.y * 0.02}%)` }}
        >
          <img src="/assets/contact-bg.jpg" alt="Kashmir" className="contact-hero__bg-img" />
        </div>
        <div className="contact-hero__overlay" />
        
        <div className="contact-hero__floating">
          <span className="contact-hero__float contact-hero__float--1">✉️</span>
          <span className="contact-hero__float contact-hero__float--2">📍</span>
          <span className="contact-hero__float contact-hero__float--3">📞</span>
        </div>

        <div className="contact-hero__content container">
          <div className="contact-hero__badge animate-fade-in-up delay-1">
            <span>📬</span> We'd Love to Hear From You
          </div>
          <h1 className="contact-hero__title heading-display animate-fade-in-up delay-2">
            Let's Plan Your<br />
            <span className="contact-hero__title-accent">Dream Journey</span>
          </h1>
          <p className="contact-hero__subtitle animate-fade-in-up delay-3">
            Have a question or ready to book? Our Kashmir experts are here to help.
          </p>

          <div className="contact-hero__quick-actions animate-fade-in-up delay-4">
            {quickActions.map((action, i) => (
              <a
                key={i}
                href={action.action}
                className="contact-hero__action"
                target={action.action.startsWith('http') ? '_blank' : '_self'}
                rel={action.action.startsWith('http') ? 'noopener noreferrer' : ''}
                style={{ '--action-color': action.color }}
              >
                <span className="contact-hero__action-icon">{action.icon}</span>
                <span className="contact-hero__action-label">{action.label}</span>
                <span className="contact-hero__action-sublabel">{action.sublabel}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="contact-hero__scroll">
          <span>Scroll to connect</span>
          <div className="contact-hero__scroll-line" />
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-main reveal" id="contact-main">
        <div className="container">
          <div className="contact-grid">
            {/* Left — Info */}
            <div className="contact-info">
              <span className="section-label">✦ Get in Touch</span>
              <h2 className="contact-info__title">
                Start Your <span className="contact-info__title-accent">Kashmir Adventure</span>
              </h2>
              <p className="contact-info__desc">
                Whether you have a quick question, need personalized travel advice, or want to
                start crafting your itinerary — we're here to help.
              </p>

              <div className="contact-info__cards">
                <a href="mailto:ahsanamin1994@gmail.com" className="contact-info__card">
                  <div className="contact-info__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="contact-info__card-content">
                    <h4>Email Us</h4>
                    <p>AhsanAmin1994@gmail.com</p>
                  </div>
                  <span className="contact-info__card-arrow">→</span>
                </a>

                <a href="tel:+917006267930" className="contact-info__card">
                  <div className="contact-info__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="contact-info__card-content">
                    <h4>Call Us</h4>
                    <p>+91 7006267930</p>
                  </div>
                  <span className="contact-info__card-arrow">→</span>
                </a>

                <div className="contact-info__card">
                  <div className="contact-info__card-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="contact-info__card-content">
                    <h4>Visit Us</h4>
                    <p>Bhagwanpora, Noorbagh<br/>Near Hospital Road<br/>Srinagar, J&K — 190001</p>
                  </div>
                  <span className="contact-info__card-arrow">→</span>
                </div>
              </div>

              <div className="contact-info__support">
                <div className="contact-info__support-item">
                  <span className="contact-info__support-icon">🕐</span>
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Always here for you</p>
                  </div>
                </div>
                <div className="contact-info__support-item">
                  <span className="contact-info__support-icon">⚡</span>
                  <div>
                    <h4>Quick Response</h4>
                    <p>Within 2 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrap">
              <div className="contact-form__image-slideshow">
                {officeImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Office"
                    className={`contact-form__slide ${i === activeImage ? 'contact-form__slide--active' : ''}`}
                  />
                ))}
                <div className="contact-form__slideshow-dots">
                  {officeImages.map((_, i) => (
                    <button
                      key={i}
                      className={`contact-form__dot ${i === activeImage ? 'contact-form__dot--active' : ''}`}
                      onClick={() => setActiveImage(i)}
                    />
                  ))}
                </div>
              </div>

              <div className="contact-form__inner">
                <h3 className="contact-form__title">Send us a Message</h3>
                <p className="contact-form__subtitle">Fill out and we'll get back to you shortly.</p>

                {submitted && (
                  <div className="contact-form__success">
                    <span>✅</span> Thank you! Your message has been sent successfully.
                  </div>
                )}

                <form onSubmit={handleForm} className="contact-form">
                  <div className="contact-form__row">
                    <TextField
                      label="First Name"
                      size="small"
                      required
                      fullWidth
                      value={fname}
                      onChange={(e) => setFName(e.target.value)}
                    />
                    <TextField
                      label="Last Name"
                      size="small"
                      fullWidth
                      value={lname}
                      onChange={(e) => setLName(e.target.value)}
                    />
                  </div>
                  <TextField
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <TextField
                    label="Phone Number"
                    type="tel"
                    size="small"
                    required
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <TextField
                    label="How can we help?"
                    multiline
                    rows={4}
                    size="small"
                    required
                    fullWidth
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <button type="submit" className="btn btn-primary contact-form__submit">
                    Send Message
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map reveal" id="contact-map">
        <div className="container">
          <div className="contact-map__header">
            <span className="section-label">✦ Find Us</span>
            <h2 className="contact-map__title">Our Location in Srinagar</h2>
          </div>
          <div className="contact-map__wrap">
            <iframe
              className="contact-map__iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.598390383595!2d74.77057207486054!3d34.10542741492173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e19b996ef3bb6b%3A0xf48e1bff2e9d4dd!2sNoorbagh%20location!5e0!3m2!1sen!2sin!4v1740635509212!5m2!1sen!2sin"
              title="Lal Ded office location"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <a href={whatsappUrl} className="whatsapp-fab" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
