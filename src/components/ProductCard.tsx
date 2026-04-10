import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { useCart } from '../context/CartContext.tsx';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  title: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, title, image, price }) => {
  const { currentUser, loginWithGoogle } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Debes iniciar sesión con Google para añadir productos al carrito.");
      loginWithGoogle();
      return;
    }
    addToCart({ id, title, image, price });
  };
  return (
    <div className="product-card glass-panel protected-media">
      <div className="product-image-container">
        {/* Usamos un div superpuesto transparente para evitar el arrastre y click derecho incluso en dispositivos móviles */}
        <div className="glass-shield"></div>
        <img 
          src={image} 
          alt={title} 
          className="product-image no-drag"
          draggable="false"
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="product-overlay">
          <button className="add-to-cart-btn" onClick={handleAddToCart}>
            <ShoppingCart size={20} />
            <span>Añadir</span>
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{title}</h3>
        <p className="product-price">{price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
