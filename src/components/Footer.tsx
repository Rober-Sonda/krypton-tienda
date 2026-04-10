import React from 'react';
import { MapPin, Phone, Mail, Share2, MessageCircle } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-top-gradient"></div>
      
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo1.jpg" alt="Krypton Logo" className="footer-logo-img" />
            <span className="footer-logo-text text-krypton">KRYPTON</span>
          </div>
          <p className="footer-slogan">Descubre tu gran debilidad.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Compartir"><Share2 size={22} /></a>
            <a href="#" className="social-link" aria-label="Chat"><MessageCircle size={22} /></a>
          </div>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-title">Categorías</h4>
          <ul className="footer-links">
            <li><a href="#anime">Anime</a></li>
            <li><a href="#retro">Videojuegos Clásicos</a></li>
            <li><a href="#gym">Gym & Fitness</a></li>
            <li><a href="#simpsons">Los Simpsons</a></li>
          </ul>
        </div>
        
        <div className="footer-links-group">
          <h4 className="footer-title">Contacto</h4>
          <ul className="footer-links contact-info">
            <li>
              <MapPin size={18} className="text-krypton" />
              <span>Av. Siempre Viva 123, Springfield</span>
            </li>
            <li>
              <Phone size={18} className="text-krypton" />
              <span>+54 9 11 1234-5678</span>
            </li>
            <li>
              <Mail size={18} className="text-krypton" />
              <span>contacto@krypton-tienda.com</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Krypton Tienda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
