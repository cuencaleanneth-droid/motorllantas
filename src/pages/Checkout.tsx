import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';
import sistecreditoLogo from '../assets/img/sistecredito.png';
import boldLogo from '../assets/img/pagasegurobold.png';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    address1: '',
    address2: '',
    city: '',
    department: '',
    postcode: '',
    phone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [paymentMethod, setPaymentMethod] = useState('transfer');

  const colombianDepartments = [
    'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá',
    'Casanare', 'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Guainía', 'Guaviare',
    'Huila', 'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío',
    'Risaralda', 'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
  ];

  const validateField = (name: string, value: string) => {
    let hasError = false;
    const requiredFields = ['firstName', 'lastName', 'address1', 'city', 'department', 'phone', 'email'];

    if (requiredFields.includes(name) && !value.trim()) {
        hasError = true;
    }

    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        hasError = true;
    }

    setErrors(prev => ({ ...prev, [name]: hasError }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const renderError = (fieldName: string) => {
    if (touched[fieldName] && errors[fieldName]) {
        return <span className="error-asterisk">*</span>;
    }
    return null;
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="billing-details">
          <h3>Detalles de facturación</h3>
          <form noValidate>
            <div className="form-row">
              <div className="form-group half-width">
                <label>Nombre:{renderError('firstName')}</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group half-width">
                <label>Apellidos:{renderError('lastName')}</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} />
              </div>
            </div>
            <div className="form-group">
              <label>Nombre de la empresa (opcional):</label>
              <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>País / Región:</label>
              <p><strong>Colombia</strong></p>
            </div>
            <div className="form-group">
              <label>Dirección de la calle:{renderError('address1')}</label>
              <input type="text" name="address1" placeholder="Número de la casa y nombre de la calle" value={formData.address1} onChange={handleChange} onBlur={handleBlur} />
              <input type="text" name="address2" placeholder="Apartamento, habitación, etc. (opcional)" value={formData.address2} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Localidad / Ciudad:{renderError('city')}</label>
              <input type="text" name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} />
            </div>
            <div className="form-group">
              <label>Departamento:{renderError('department')}</label>
              <select name="department" value={formData.department} onChange={handleChange} onBlur={handleBlur}>
                <option value="">Elige una opción...</option>
                {colombianDepartments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Código postal (opcional):</label>
              <input type="text" name="postcode" value={formData.postcode} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Teléfono:{renderError('phone')}</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
            </div>
            <div className="form-group">
              <label>Dirección de correo electrónico:{renderError('email')}</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
            </div>
            <div className="form-group-checkbox">
              <input type="checkbox" id="different-address" />
              <label htmlFor="different-address">¿Enviar a una dirección diferente?</label>
            </div>
            <div className="form-group">
              <label>Notas del pedido (opcional):</label>
              <textarea name="orderNotes" placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."></textarea>
            </div>

            <div className="payment-section-left">
              <h3>Payment Information</h3>
              <div className="payment-option-left">
                <input 
                  type="radio" 
                  id="transfer" 
                  name="paymentMethod" 
                  value="transfer" 
                  checked={paymentMethod === 'transfer'}
                  onChange={() => setPaymentMethod('transfer')}
                />
                <label htmlFor="transfer">Transferencia bancaria directa</label>
                {paymentMethod === 'transfer' && (
                  <div className="payment-info-box">
                    <p>Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.</p>
                  </div>
                )}
              </div>

              <div className="payment-option-left">
                <input 
                  type="radio" 
                  id="bold" 
                  name="paymentMethod" 
                  value="bold" 
                  checked={paymentMethod === 'bold'}
                  onChange={() => setPaymentMethod('bold')}
                />
                <label htmlFor="bold">Paga en línea con Bold</label>
                <img src={boldLogo} alt="Pago Seguro Bold" className="payment-logos-bold" />
              </div>

              <div className="payment-option-left">
                <input 
                  type="radio" 
                  id="sistecredito" 
                  name="paymentMethod" 
                  value="sistecredito" 
                  checked={paymentMethod === 'sistecredito'}
                  onChange={() => setPaymentMethod('sistecredito')}
                />
                <label htmlFor="sistecredito">Sistecredito</label>
                <img src={sistecreditoLogo} alt="Sistecredito" className="payment-logo-sistecredito" />
              </div>

              <div className="privacy-policy-text">
                  <p>Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <strong>política de privacidad</strong>.</p>
              </div>

              <button type="submit" className="place-order-button-red">Realizar El Pedido</button>
            </div>
          </form>
        </div>

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
                <span className="product-total">COP ${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
            <div className="order-totals">
                <div className="total-row">
                    <span>Subtotal</span>
                    <span>COP ${subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                    <span>Envío</span>
                    <span>COP ${shipping.toLocaleString()}</span>
                </div>
                <div className="total-row grand-total">
                    <span>Total</span>
                    <span>COP ${total.toLocaleString()}</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
