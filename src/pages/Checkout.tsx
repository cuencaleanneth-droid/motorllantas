import React from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart(); // Agregamos removeFromCart
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  const colombianDepartments = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
    'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare',
    'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
    'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  return (
    <div className="checkout">
      <div className="checkout-container">
        {/* Columna de Detalles de Facturación */}
        <div className="billing-details">
          <h3>Detalles de facturación</h3>
          <form>
            <div className="form-row">
              <div className="form-group half-width">
                <label>Nombre *</label>
                <input type="text" />
              </div>
              <div className="form-group half-width">
                <label>Apellidos *</label>
                <input type="text" />
              </div>
            </div>
            <div className="form-group">
              <label>Nombre de la empresa (opcional)</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>País / Región *</label>
              <p><strong>Colombia</strong></p>
            </div>
            <div className="form-group">
              <label>Dirección de la calle *</label>
              <input type="text" placeholder="Número de la casa y nombre de la calle" />
              <input type="text" placeholder="Apartamento, habitación, etc. (opcional)" />
            </div>
            <div className="form-group">
              <label>Localidad / Ciudad *</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Departamento *</label>
              <select>
                <option>Elige una opción...</option>
                {colombianDepartments.map(department => (
                  <option key={department} value={department}>{department}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Código postal (opcional)</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Teléfono *</label>
              <input type="text" />
            </div>
            <div className="form-group">
              <label>Dirección de correo electrónico *</label>
              <input type="email" />
            </div>
            <div className="form-group-checkbox">
              <input type="checkbox" id="different-address" />
              <label htmlFor="different-address">¿Enviar a una dirección diferente?</label>
            </div>
            <div className="form-group">
              <label>Notas del pedido (opcional)</label>
              <textarea placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."></textarea>
            </div>
          </form>
        </div>

        {/* Columna del Pedido */}
        <div className="order-summary">
          <h3>Tu pedido</h3>
          <div className="order-review">
            <div className="order-item-header">
                <span>PRODUCTO</span>
                <span>SUBTOTAL</span>
            </div>
            {cartItems.map(item => (
              <div className="order-item" key={item.id}>
                <div className="product-details">
                  <button className="remove-button" onClick={() => removeFromCart(item.id)}>×</button>
                  <img src={item.image} alt={item.name} className="product-image" />
                  <span className="product-name">{item.name} × <strong>{item.quantity}</strong></span>
                </div>
                <span className="product-total">${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="order-totals">
                <div className="total-row">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                    <span>Envío</span>
                    <span>${shipping.toLocaleString()}</span>
                </div>
                <div className="total-row grand-total">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                </div>
            </div>
          </div>
          {/* Payment info can go here, styled separately */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
