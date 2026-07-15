import React from 'react';
import { useApp } from '../context/AppContext';

const Blogs = () => {
  const { blogs } = useApp();

  return (
    <section className="section" style={{ paddingTop: '120px' }}>
      <h2 className="section-title">
        <span className="gradient-text">Latest</span> Articles
      </h2>

      {blogs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</p>
          <p>No blog posts published yet. Check back soon!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
          {blogs.map(blog => (
            <article key={blog.id} className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', cursor: 'pointer' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{blog.category}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'monospace' }}>{blog.date}</span>
              </div>
              <h3 style={{ fontSize: '1.6rem', lineHeight: '1.3' }}>{blog.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: '1.7' }}>{blog.summary}</p>
              <a href="#" style={{ color: 'var(--accent-tertiary)', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', width: 'fit-content' }}>
                Read Article <span>→</span>
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blogs;
