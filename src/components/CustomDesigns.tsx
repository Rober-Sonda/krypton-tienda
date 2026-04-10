import React, { useState, useRef } from 'react';
import { Upload, MessageCircle, RefreshCw, Palette } from 'lucide-react';
import './CustomDesigns.css';

const MOCKUPS = [
  { id: 'tshirt', name: 'Remera L', image: '/mockups/mockup-tshirt.png', overlayClass: 'overlay-tshirt' },
  { id: 'hoodie', name: 'Buzo', image: '/mockups/mockup-hoodie.png', overlayClass: 'overlay-hoodie' },
  { id: 'mug', name: 'Taza', image: '/mockups/mockup-mug.png', overlayClass: 'overlay-mug' },
  { id: 'hat', name: 'Gorra', image: '/mockups/mockup-hat.png', overlayClass: 'overlay-hat' },
  { id: 'thermal', name: 'Térmico', image: '/mockups/mockup-thermal.png', overlayClass: 'overlay-thermal' }
];

const COLORS = [
  { id: 'white', name: 'Blanco', value: '#ffffff' },
  { id: 'black', name: 'Negro Oscuro', value: '#333333' },
  { id: 'krypton', name: 'Verde Krypton', value: '#39FF14' },
  { id: 'red', name: 'Rojo Pasión', value: '#ff3333' },
  { id: 'blue', name: 'Azul Marino', value: '#3366ff' }
];

const CustomDesigns: React.FC = () => {
  const [activeMockup, setActiveMockup] = useState(MOCKUPS[0]);
  const [activeColor, setActiveColor] = useState(COLORS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const handleConsultar = () => {
    const message = `*NUEVA CONSULTA DE PERSONALIZACIÓN*\n\nHola Krypton! Acabo de probar el laboratorio interactivo en su web.\n\nMe gustaría sublimar mi diseño propio en el siguiente producto: *${activeMockup.name}* (Color seleccionado: ${activeColor.name}).\n\n¿Me pasan presupuesto? En un momento les envío la imagen que probé en la página.`;
    const whatsappUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="custom" className="custom-designs container">
      <div className="custom-header text-center">
        <h2 className="section-title">Laboratorio <span className="text-krypton">Personalizado</span></h2>
        <p className="custom-subtitle">Sube tu diseño, elige el producto y visualízalo en tiempo real.</p>
      </div>
      
      <div className="customizer-layout">
        <div className="customizer-controls glass-panel">
          <h3>1. Selecciona el Producto</h3>
          <div className="mockup-selector">
            {MOCKUPS.map(mockup => (
              <button 
                key={mockup.id}
                className={`mockup-btn ${activeMockup.id === mockup.id ? 'active' : ''}`}
                onClick={() => setActiveMockup(mockup)}
              >
                {mockup.name}
              </button>
            ))}
          </div>

          <h3>2. Elige el Color</h3>
          <div className="color-selector">
            {COLORS.map(color => (
              <button
                key={color.id}
                className={`color-btn ${activeColor.id === color.id ? 'active' : ''}`}
                style={{ backgroundColor: color.value }}
                onClick={() => setActiveColor(color)}
                title={color.name}
              />
            ))}
          </div>

          <h3>3. Sube tu Diseño</h3>
          <div className="upload-section">
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleImageUpload}
            />
            {uploadedImage ? (
              <div className="upload-success">
                <img src={uploadedImage} alt="Tu diseño" className="thumbnail" />
                <button className="icon-btn refresh-btn" onClick={() => setUploadedImage(null)} title="Quitar diseño">
                  <RefreshCw size={20} />
                </button>
              </div>
            ) : (
              <button className="neon-btn upload-btn" onClick={() => fileInputRef.current?.click()}>
                <Upload size={20} /> Elegir PNG/JPG
              </button>
            )}
            <p className="upload-hint">Formatos recomendados con fondo transparente o blanco.</p>
          </div>

          <div className="customizer-checkout">
            <h3>4. Pide Cotización</h3>
            <button className="neon-btn whatsapp-btn" onClick={handleConsultar} disabled={!uploadedImage}>
              <MessageCircle size={20} /> Consultar Presupuesto
            </button>
            {!uploadedImage && <p className="warning-text">Sube una imagen para habilitar la consulta.</p>}
          </div>
        </div>

        <div className="customizer-preview glass-panel protected-media">
          <div className="mockup-canvas" style={{ backgroundColor: activeColor.value }}>
            <img 
              src={activeMockup.image} 
              alt="Blank Product" 
              className="mockup-base no-drag" 
              draggable="false" 
              style={activeColor.id !== 'white' ? { mixBlendMode: 'multiply' } : {}}
            />
            
            {uploadedImage && (
              <div className={`mockup-overlay ${activeMockup.overlayClass}`}>
                <img src={uploadedImage} alt="Tu diseño superpuesto" className="user-design no-drag" draggable="false" />
              </div>
            )}
            
            {!uploadedImage && (
              <div className="empty-canvas-msg">
                <Palette size={40} opacity={0.3} />
                <span>Tu diseño aparecerá aquí</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomDesigns;
