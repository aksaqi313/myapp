import React from 'react';
import { useApp } from '../context/AppContext';

const About = () => {
  const { about } = useApp();

  const skills = about.skills
    ? about.skills.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <section id="about" className="section" style={{ paddingTop: '120px' }}>
      <h2 className="section-title">
        <span className="gradient-text">About</span> Me
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>

        {/* ── Text side ── */}
        <div>
          {/* Name + title */}
          {(about.name || about.title) && (
            <div style={{ marginBottom: '1.5rem' }}>
              {about.name && (
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem', color: 'var(--text-primary)' }}>
                  {about.name}
                </h3>
              )}
              {about.title && (
                <p style={{ color: 'var(--accent-primary)', fontWeight: 600, fontSize: '1rem' }}>
                  {about.title}
                </p>
              )}
            </div>
          )}

          {/* Meta info */}
          {(about.location || about.email) && (
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {about.location && (
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  📍 {about.location}
                </span>
              )}
              {about.email && (
                <a href={`mailto:${about.email}`} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem', textDecoration: 'none' }}>
                  ✉️ {about.email}
                </a>
              )}
            </div>
          )}

          {/* Bio paragraphs */}
          {about.bio1 && (
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {about.bio1}
            </p>
          )}
          {about.bio2 && (
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem', fontSize: '1.05rem', lineHeight: 1.8 }}>
              {about.bio2}
            </p>
          )}
          {about.bio3 && skills.length > 0 && (
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '1.05rem' }}>
              {about.bio3}
            </p>
          )}

          {/* Skills grid */}
          {skills.length > 0 && (
            <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(140px, 200px))', gap: '0.5rem 1rem', padding: 0 }}>
              {skills.map((skill, i) => (
                <li key={i} style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--accent-tertiary)', fontSize: '0.8rem' }}>▹</span> {skill}
                </li>
              ))}
            </ul>
          )}

          {/* Resume button */}
          {about.resumeUrl && (
            <div style={{ marginTop: '2rem' }}>
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ padding: '0.7rem 1.8rem', fontSize: '0.95rem' }}
              >
                📄 Download Resume
              </a>
            </div>
          )}
        </div>

        {/* ── Photo side ── */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
          <div className="glass-card" style={{ padding: '1rem', aspectRatio: '1/1', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {about.photo ? (
              <img
                src={about.photo}
                alt={about.name || 'Profile'}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block' }}
              />
            ) : (
              <div style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                borderRadius: '12px', opacity: 0.8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '6rem',
              }}>
                👤
              </div>
            )}
          </div>

          {/* Decorative corner badge */}
          <div style={{
            position: 'absolute', bottom: '-1rem', right: '-1rem',
            background: 'linear-gradient(135deg,var(--accent-primary),var(--accent-secondary))',
            borderRadius: '12px', padding: '0.75rem 1.1rem',
            fontSize: '0.8rem', fontWeight: 700, color: '#fff',
            boxShadow: '0 4px 20px rgba(99,102,241,0.4)',
          }}>
            Available for work ✓
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
