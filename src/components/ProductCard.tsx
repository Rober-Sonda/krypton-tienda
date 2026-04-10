import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';

interface ProductCardProps {
  title: string;
  image: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, image, price }) => {
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
          <button className="add-to-cart-btn">
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
