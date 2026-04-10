import React from 'react';
import { Palette, PenTool, Mail } from 'lucide-react';
import './CustomDesigns.css';

const CustomDesigns: React.FC = () => {
  return (
    <section id="custom" className="custom-designs container">
      <div className="custom-header">
        <h2 className="section-title">Diseños <span className="text-krypton">Personalizados</span></h2>
        <p className="custom-subtitle">No te conformes con lo de siempre. Crea algo único que te represente.</p>
      </div>
      
      <div className="custom-grid">
        <div className="custom-card glass-panel">
          <Palette className="custom-icon" size={48} />
          <h3>Cualquier Temática</h3>
          <p>Dinos qué franquicia, anime o personaje tienes en mente. Si puedes imaginarlo, podemos estamparlo.</p>
        </div>
        
        <div className="custom-card glass-panel">
          <PenTool className="custom-icon" size={48} />
          <h3>Sublimados y DTF</h3>
          <p>Utilizamos las mejores técnicas de impresión del mercado para garantizar durabilidad y colores neón vibrantes.</p>
        </div>
        
        <div className="custom-card glass-panel cta-card">
          <Mail className="custom-icon" size={48} />
          <h3>¿Tienes una idea?</h3>
          <p>Escríbenos ahora mismo para cotizar tu prenda personalizada. Nos encantan los desafíos.</p>
          <button className="neon-btn">Cotizar Diseño</button>
        </div>
      </div>
    </section>
  );
};

export default CustomDesigns;
