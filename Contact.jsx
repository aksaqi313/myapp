import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';

const Contact = () => {
  const { addMessage } = useApp();
  const [fields, setFields] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const timers = useRef([]);

  const update = (key) => (e) => setFields(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    timers.current.forEach(clearTimeout);
    setStatus('sending');

    const t1 = setTimeout(() => {
      addMessage(fields);
      setStatus('sent');
      setFields({ name: '', email: '', phone: '', message: '' });
    }, 1200);
    timers.current = [t1];
  };

  const disabled = status === 'sending';

  const inputStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--glass-border)',
    borderRadius: '8px',
    padding: '0.8rem 1rem',
    color: 'var(--text-primary)',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <section className="section flex-center" style={{ minHeight: '80vh', paddingTop: '120px' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '800px', padding: '2.5rem' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>Get In Touch</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>Fill out the form and I'll get back to you as soon as possible.</p>

        {status === 'sent' ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</p>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Message Sent!</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Thank you for reaching out. I'll get back to you shortly.</p>
            <button onClick={() => setStatus('idle')} className="btn btn-primary">Send Another</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Name</label>
                <input type="text" required disabled={disabled} value={fields.name} onChange={update('name')} placeholder="Azhar Khan" style={inputStyle}
                  onFocus={(e) => !disabled && (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email</label>
                <input type="email" required disabled={disabled} value={fields.email} onChange={update('email')} placeholder="you@example.com" style={inputStyle}
                  onFocus={(e) => !disabled && (e.target.style.borderColor = 'var(--accent-primary)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Contact Number</label>
              <input type="tel" disabled={disabled} value={fields.phone} onChange={update('phone')} placeholder="+1 (555) 000-0000" style={inputStyle}
                onFocus={(e) => !disabled && (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Message</label>
              <textarea required disabled={disabled} value={fields.message} onChange={update('message')} placeholder="What are you building?" rows={5}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => !disabled && (e.target.style.borderColor = 'var(--accent-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')} />
            </div>

            <button type="submit" disabled={disabled} className="btn btn-primary" style={{ opacity: disabled ? 0.7 : 1, cursor: disabled ? 'not-allowed' : 'pointer' }}>
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Contact;
