import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const getInitialTheme = (): 'light' | 'dark' => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('krypton-theme') as 'light' | 'dark' | null;
      if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        return savedTheme;
      }
    }
    return 'dark';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('krypton-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass-panel' : ''}`}>
      <div className="container nav-container">
        <a href="/" className="logo">
          <img src="/logo1.jpg" alt="Krypton Logo" className="logo-img" />
          <span className="logo-text">KRYPTON</span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#anime" onClick={() => setMobileMenuOpen(false)}>Anime</a>
          <a href="#retro" onClick={() => setMobileMenuOpen(false)}>Retro</a>
          <a href="#gym" onClick={() => setMobileMenuOpen(false)}>Gym</a>
          <a href="#simpsons" onClick={() => setMobileMenuOpen(false)}>Clásicos</a>
          <a href="#custom" onClick={() => setMobileMenuOpen(false)}>Personalizados</a>
        </nav>

        <div className="nav-actions">
          <button className="theme-toggle-btn cart-btn" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <button className="cart-btn">
            <ShoppingCart size={24} />
            <span className="cart-badge">0</span>
          </button>
          
          <button className="mobile-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
