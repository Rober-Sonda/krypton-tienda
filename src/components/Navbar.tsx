import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Sun, Moon, LogOut, User } from 'lucide-react';
import { useNavigation } from '../context/NavigationContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
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

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    if (currentView !== 'home') {
      navigateTo('home');
      setTimeout(() => {
        document.getElementById(hash.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
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
          <a href="#instalaciones" onClick={(e) => handleHashLink(e, '#instalaciones')}>Instalaciones</a>
          <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('store'); setMobileMenuOpen(false); }} className={currentView === 'store' ? 'active' : ''}>Catálogo</a>
          <a href="#custom" onClick={(e) => handleHashLink(e, '#custom')}>Personalizados</a>

        </nav>

        <div className="nav-actions">
          <button className="nav-action-btn theme-toggle-btn" onClick={toggleTheme} title="Cambiar tema">
            {theme === 'dark' ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          
          {currentUser ? (
             <div className="profile-menu-wrapper">
               <button className="nav-action-btn profile-btn" onClick={() => setProfileMenuOpen(!profileMenuOpen)} title={`Perfil de ${currentUser.displayName}`}>
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt="Avatar" className="user-avatar" />
                ) : (
                  <User size={22} />
                )}
               </button>
               {profileMenuOpen && (
                 <div className="profile-dropdown glass-panel">
                   <div className="dropdown-header">
                     <p className="dropdown-name">{currentUser.displayName}</p>
                     <p className="dropdown-email">{currentUser.email}</p>
                   </div>
                   <button className="dropdown-logout" onClick={() => { logout(); setProfileMenuOpen(false); }}>
                     <LogOut size={16} /> Cerrar Sesión
                   </button>
                 </div>
               )}
             </div>
          ) : (
             <button className="nav-action-btn profile-btn" onClick={loginWithGoogle} title="Iniciar sesión para comprar">
              <User size={22} />
             </button>
          )}

          <button className="nav-action-btn cart-toggle-btn" onClick={() => setIsCartOpen(true)} title="Ver carrito">
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
