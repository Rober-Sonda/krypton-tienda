import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Save, LogOut } from 'lucide-react';
import './CompleteProfileModal.css';

const CompleteProfileModal: React.FC = () => {
  const { currentUser, showProfilePrompt, logout, refreshProfile } = useAuth();
  
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || '',
    phone: '',
    address: '',
    city: '',
    cp: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!showProfilePrompt || !currentUser) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.cp) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      await setDoc(doc(db, 'users', currentUser.uid), {
        ...formData
      });
      await refreshProfile();
    } catch (err) {
      console.error("Error guardando perfil:", err);
      alert("Hubo un error al guardar tu dirección. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-content glass-panel">
        <div className="profile-modal-header">
          <h2 className="neon-title text-center text-krypton" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Último Paso</h2>
          <p className="text-center text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Para poder enviarte tus pedidos a 1 solo click, necesitamos que agregues tu domicilio. ¡No tendrás que volver a hacerlo nunca más!
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="profile-modal-form">
          <div className="form-group">
            <label>Nombre y Apellido</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Como figura en tu DNI" />
          </div>
          
          <div className="form-group">
            <label>Teléfono (WhatsApp)</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Ej: 2317 123456" />
          </div>

          <div className="form-group">
            <label>Dirección Física</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Calle 123, Piso, Depto" />
          </div>
          
          <div className="form-row">
            <div className="form-group half">
              <label>Ciudad</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Ej: 9 de Julio" />
            </div>
            <div className="form-group half">
              <label>Código Postal</label>
              <input type="text" name="cp" value={formData.cp} onChange={handleChange} required placeholder="Ej: 6500" />
            </div>
          </div>

          <div className="profile-modal-actions">
            <button type="button" className="neon-btn secondary" onClick={logout} disabled={isSubmitting}>
              <LogOut size={18} /> Cancelar y Salir
            </button>
            <button type="submit" className="neon-btn primary" disabled={isSubmitting}>
              <Save size={18} /> {isSubmitting ? 'Guardando...' : 'Guardar y Continuar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfileModal;
