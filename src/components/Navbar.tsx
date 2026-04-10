import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Menu, X, Sun, Moon, LogIn, LogOut } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentView, navigateTo } = useNavigation();
  const { currentUser, loginWithGoogle, logout } = useAuth();
  const { items, setIsCartOpen } = useCart();

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
        <a href="/" className="logo" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>
          <img src="/logo1.jpg" alt="Krypton Logo" className="logo-img" />
          <span className="logo-text">KRYPTON</span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('home'); setMobileMenuOpen(false); }} className={currentView === 'home' ? 'active' : ''}>Inicio</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('store'); setMobileMenuOpen(false); }} className={currentView === 'store' ? 'active' : ''}>Catálogo</a>
          <a href="#custom" onClick={() => setMobileMenuOpen(false)}>Personalizados</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn search-btn desktop-only" onClick={() => navigateTo('store')}>
            <Search size={22} />
          </button>

          <button className="theme-toggle-btn cart-btn" onClick={toggleTheme} aria-label="Cambiar tema">
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          {currentUser ? (
             <button className="icon-btn profile-btn desktop-only" onClick={logout} title="Cerrar sesión">
              <LogOut size={22} />
             </button>
          ) : (
             <button className="icon-btn profile-btn desktop-only" onClick={loginWithGoogle} title="Iniciar sesión">
              <LogIn size={22} />
             </button>
          )}

          <button className="icon-btn cart-btn" onClick={() => setIsCartOpen(true)}>
            <ShoppingCart size={22} />
            <span className="cart-badge">{items.length}</span>
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
