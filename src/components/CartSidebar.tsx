import React from 'react';
import { useCart } from '../context/CartContext.tsx';
import { useAuth } from '../context/AuthContext.tsx';
import { X, Trash2, ShoppingBag, LogIn } from 'lucide-react';
import './CartSidebar.css';

const CartSidebar: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { currentUser, loginWithGoogle } = useAuth();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (!currentUser) {
      loginWithGoogle();
      return;
    }

    if (items.length === 0) return;

    let message = `*NUEVO PEDIDO KRYPTON TIENDA*\n\n`;
    message += `Hola, quiero encargar los siguientes diseños:\n\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.title} ($${item.price} c/u)\n`;
    });
    
    message += `\n*TOTAL: $${cartTotal.toFixed(2)}*\n\n`;
    message += `Mi email de registro es: ${currentUser.email}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappNumber = "5491100000000"; // REPLACE WITH ACTUAL NUMBER LATER
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2><ShoppingBag size={24} /> Tu Carrito</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {!currentUser && (
          <div className="cart-auth-warning">
            <p>Para armar tu pedido necesitas identificarte</p>
            <button className="neon-btn small-btn" onClick={loginWithGoogle}>
              <LogIn size={18} /> Iniciar con Google
            </button>
          </div>
        )}

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>El carrito está vacío. ¡Ve a la tienda a buscar algo épico!</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} className="cart-item-image no-drag" />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <p className="cart-item-price">{item.price}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button 
            className="neon-btn checkout-btn" 
            disabled={items.length === 0}
            onClick={handleCheckout}
          >
            {currentUser ? 'Finalizar Pedido por WhatsApp' : 'Inicia Sesión para Comprar'}
          </button>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
