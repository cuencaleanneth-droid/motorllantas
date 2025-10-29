import React from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="billing-details">
          <h2>Detalles de facturación</h2>
          <form>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre *</label>
                <input type="text" />
              </div>
              <div className="form-group">
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
              <input type="text" value="Colombia" disabled />
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
        <div className="order-summary">
          <h2>Tu pedido</h2>
          <div className="cart-summary">
            <div className="summary-row product-header">
              <span>PRODUCTO</span>
              <span>SUBTOTAL</span>
            </div>
            {cartItems.map(item => (
              <div className="summary-row" key={item.id}>
                <span>{item.name} × {item.quantity}</span>
                <span>CO ${ (item.price * item.quantity).toLocaleString() }</span>
              </div>
            ))}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>CO ${subtotal.toLocaleString()}</span>
            </div>
            <div className="summary-row">
              <span>Envío</span>
              <span>CO ${shipping.toLocaleString()}</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>CO ${total.toLocaleString()}</span>
            </div>
          </div>
          <div className="payment-info">
            <div className="payment-option">
              <input type="radio" name="payment" id="bank-transfer" checked readOnly/>
              <label htmlFor="bank-transfer">Transferencia bancaria directa</label>
              <p>Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.</p>
            </div>
            <div className="payment-option">
              <input type="radio" name="payment" id="bold" />
              <label htmlFor="bold">Pago en línea con Bold</label>
            </div>
            <div className="payment-option">
              <input type="radio" name="payment" id="sistecredito" />
              <label htmlFor="sistecredito">Sistecredito</label>
            </div>
            <p className="privacy-policy">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our política de privacidad.
            </p>
            <button className="checkout-button">REALIZAR EL PEDIDO</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
