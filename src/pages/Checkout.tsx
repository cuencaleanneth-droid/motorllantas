import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { initMercadoPago } from '@mercadopago/sdk-react';
import './Checkout.css';

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

  // ✅ Inicializa Mercado Pago (con tu PUBLIC_KEY)
  initMercadoPago(import.meta.env.VITE_PUBLIC_KEY, { locale: 'es-CO' });

  const handlePay = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/payments/create_preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Compra en MiTienda',
          quantity: 1,
          price: total,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error('No se recibió init_point:', data);
        alert('Error al iniciar el pago');
      }
    } catch (error) {
      console.error('❌ Error al conectar con el servidor:', error);
      alert('Error al procesar el pago');
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        {/* 🧾 FORMULARIO DE FACTURACIÓN */}
        <div className="billing-details">
          <h3>Detalles de facturación</h3>
          <form noValidate className="checkout-form">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre {renderError('firstName')}</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <label>Apellidos {renderError('lastName')}</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} onBlur={handleBlur} />
              </div>
            </div>

            <div className="form-group">
              <label>Dirección {renderError('address1')}</label>
              <input name="address1" value={formData.address1} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ciudad {renderError('city')}</label>
                <input name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur} />
              </div>
              <div className="form-group">
                <label>Departamento {renderError('department')}</label>
                <select name="department" value={formData.department} onChange={handleChange} onBlur={handleBlur}>
                  <option value="">Seleccione...</option>
                  {colombianDepartments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Teléfono {renderError('phone')}</label>
              <input name="phone" value={formData.phone} onChange={handleChange} onBlur={handleBlur} />
            </div>

            <div className="form-group">
              <label>Email {renderError('email')}</label>
              <input name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} />
            </div>
          </form>
        </div>

        {/* 🛒 RESUMEN DEL PEDIDO */}
        <div className="order-summary">
          <h3>Tu pedido</h3>
          <div className="order-review">
            {cartItems.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <button onClick={() => removeFromCart(item.id)}>×</button>
                  <img src={item.image} alt={item.name} />
                  <span>{item.name} × {item.quantity}</span>
                </div>
                <span>COP ${(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}

            <div className="order-total">
              <p>Subtotal: <strong>COP ${subtotal.toLocaleString()}</strong></p>
              <p>Envío: <strong>COP ${shipping.toLocaleString()}</strong></p>
              <p>Total: <strong>COP ${total.toLocaleString()}</strong></p>
            </div>

            <button className="pay-button" onClick={handlePay}>
              Ir a pagar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
