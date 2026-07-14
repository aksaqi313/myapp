import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './context/ThemeContext';

// Layout
import Header from './components/Header';

// Auth
import AdminLogin from './components/AdminLogin';
import UserLogin from './components/UserLogin';

// User pages
import Home from './user/Home';
import About from './user/About';
import Projects from './user/Projects';
import Blogs from './user/Blogs';
import Services from './user/Services';
import Contact from './user/Contact';

// Admin pages
import AdminDashboard from './admin/AdminDashboard';
import AdminAbout from './admin/AdminAbout';
import AdminProjects from './admin/AdminProjects';
import AdminBlogs from './admin/AdminBlogs';
import AdminServices from './admin/AdminServices';
import AdminMessages from './admin/AdminMessages';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
        <div className="app-container">
          <Header scrolled={scrolled} />

          <Routes>
            {/* ── User Pages ── */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />

            {/* ── Auth ── */}
            <Route path="/user-login" element={<UserLogin />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* ── Admin Pages ── */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/about"     element={<AdminAbout />} />
            <Route path="/admin/projects"  element={<AdminProjects />} />
            <Route path="/admin/blogs"     element={<AdminBlogs />} />
            <Route path="/admin/services"  element={<AdminServices />} />
            <Route path="/admin/messages"  element={<AdminMessages />} />
          </Routes>

          <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--glass-border)', marginTop: '4rem' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              © {new Date().getFullYear()} Azhar Khan. Built with React.
            </p>
          </footer>
        </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
