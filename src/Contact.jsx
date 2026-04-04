import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import './Contact.css';

export default function Contact() {
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [desc, setDesc] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    <main className="contact-page" id="contact-page">
      {/* Hero */}
      <section className="contact-hero" id="contact-hero">
        <div className="contact-hero__bg">
          <img src="/assets/contact-bg.jpg" alt="Kashmir" className="contact-hero__bg-img" />
          <div className="contact-hero__overlay" />
        </div>
        <div className="contact-hero__content container">
          <span className="section-label animate-fade-in-up delay-1">✦ Get in Touch</span>
          <h1 className="contact-hero__title heading-display animate-fade-in-up delay-2">
            Let's Plan Your<br /><span className="hero__title-accent">Dream Journey</span>
          </h1>
          <p className="contact-hero__subtitle animate-fade-in-up delay-3">
            Have a question or ready to book? We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content reveal" id="contact-content">
        <div className="container">
          <div className="contact-grid">
            {/* Left — Info */}
            <div className="contact-info">
              <span className="section-label">✦ Contact Information</span>
              <h2 className="section-title">Ready to Explore?<br/>Reach Out Today</h2>
              <p className="contact-info__desc">
                Whether you have a quick question, need personalized travel advice, or want to
                start crafting your itinerary — we're here to help.
              </p>

              <div className="contact-info__cards">
                <a href="mailto:ahsanamin1994@gmail.com" className="contact-info__card glass-card" id="contact-email-card">
                  <div className="contact-info__card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  </div>
                  <div>
                    <h4 className="contact-info__card-title">Email Us</h4>
                    <p className="contact-info__card-value">AhsanAmin1994@gmail.com</p>
                  </div>
                </a>

                <a href="tel:+917006267930" className="contact-info__card glass-card" id="contact-phone-card">
                  <div className="contact-info__card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  </div>
                  <div>
                    <h4 className="contact-info__card-title">Call Us</h4>
                    <p className="contact-info__card-value">+91 7006267930</p>
                  </div>
                </a>

                <div className="contact-info__card glass-card" id="contact-address-card">
                  <div className="contact-info__card-icon">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div>
                    <h4 className="contact-info__card-title">Visit Us</h4>
                    <p className="contact-info__card-value">Bhagwanpora, Noorbagh,<br/>Near Hospital Road,<br/>Srinagar, J&K — 190001</p>
                  </div>
                </div>
              </div>

              <div className="contact-info__support">
                <div className="contact-info__support-item">
                  <span className="contact-info__support-icon">🕐</span>
                  <div>
                    <h4>24/7 Support</h4>
                    <p>Our team is available around the clock for any queries.</p>
                  </div>
                </div>
                <div className="contact-info__support-item">
                  <span className="contact-info__support-icon">⚡</span>
                  <div>
                    <h4>Quick Response</h4>
                    <p>We respond to all inquiries within 2 hours.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="contact-form-wrap glass-card" id="contact-form-section">
              <h3 className="contact-form__title">
                Send us a Message
              </h3>
              <p className="contact-form__subtitle">Fill out the form and we'll get back to you shortly.</p>

              {submitted && (
                <div className="contact-form__success">
                  ✅ Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleForm} className="contact-form" id="contact-form">
                <div className="contact-form__row">
                  <TextField
                    label="First Name"
                    size="small"
                    required
                    fullWidth
                    value={fname}
                    onChange={(e) => setFName(e.target.value)}
                    id="input-fname"
                  />
                  <TextField
                    label="Last Name"
                    size="small"
                    fullWidth
                    value={lname}
                    onChange={(e) => setLName(e.target.value)}
                    id="input-lname"
                  />
                </div>
                <TextField
                  label="Email"
                  type="email"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="input-email"
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  size="small"
                  required
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="input-phone"
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
                  id="input-message"
                />
                <button type="submit" className="btn btn-primary contact-form__submit" id="contact-submit-btn">
                  Send Message
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map reveal" id="contact-map">
        <div className="container">
          <div className="contact-map__header">
            <span className="section-label">✦ Find Us</span>
            <h2 className="section-title">Our Location</h2>
          </div>
          <div className="contact-map__wrap glass-card">
            <iframe
              className="contact-map__iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3303.598390383595!2d74.77057207486054!3d34.10542741492173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e19b996ef3bb6b%3A0xf48e1bff2e9d4dd!2sNoorbagh%20location!5e0!3m2!1sen!2sin!4v1740635509212!5m2!1sen!2sin"
              title="Lal Ded office location"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
