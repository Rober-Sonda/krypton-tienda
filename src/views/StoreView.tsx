import React, { useState } from 'react';
import { productsData } from '../data/products.ts';
import type { Product } from '../data/products.ts';
import ProductCard from '../components/ProductCard.tsx';
import './StoreView.css';

const categories = [
  { id: 'all',  name: 'Todos los productos' },
  { id: 'argentina', name: 'La Escaloneta ⭐⭐⭐' },
  { id: 'anime', name: 'Anime Clásico & Actual' },
  { id: 'gym', name: 'Anime Gym & Fitness' },
  { id: 'retro', name: 'Videojuegos Clásicos' },
  { id: 'simpsons', name: 'Simpsons & 90s' }
];

const StoreView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredProducts = activeCategory === 'all' 
    ? productsData 
    : productsData.filter((p: Product) => p.category === activeCategory);

  return (
    <div className="store-view-container fade-in">
      <div className="store-header">
        <h1 className="hero-title text-center" style={{fontSize: '3rem'}}>
          <span className="text-light">Catálogo </span>
          <span className="text-krypton">KRYPTON</span>
        </h1>
      </div>
      
      <div className="store-layout">
        <aside className="store-sidebar glass-panel">
          <h3>Categorías</h3>
          <ul className="category-list">
            {categories.map(cat => (
              <li key={cat.id}>
                <button 
                  className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        
        <div className="store-products">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreView;
