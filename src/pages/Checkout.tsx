import React, { useState } from 'react';
import './Checkout.css';
import { useCart } from '../context/CartContext';
import sistecreditoLogo from '../assets/img/sistecredito.png';
import metodosBoldLogo from '../assets/img/metodosbold.png';
import boldLogo from '../assets/img/Bold.png';
import compraProtegidaLogo from '../assets/img/pagasegurobold.png';

const Checkout = () => {
  const { cartItems, removeFromCart } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', companyName: '', address1: '', address2: '',
    city: '', department: '', postcode: '', phone: '', email: '',
  });

  const [sistecreditoData, setSistecreditoData] = useState({ documentType: 'Cedula de Ciudadania', documentNumber: '' });
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
    if (requiredFields.includes(name) && !value.trim()) hasError = true;
    if (name === 'email' && value && !/\S+@\S+\.\S+/.test(value)) hasError = true;
    setErrors(prev => ({ ...prev, [name]: hasError }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSistecreditoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSistecreditoData(prev => ({ ...prev, [name]: value }));
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
            {/* ... other fields ... */}
            <div className="form-group">
              <label>Notas del pedido (opcional):</label>
              <textarea name="orderNotes" placeholder="Notas sobre tu pedido, por ejemplo, notas especiales para la entrega."></textarea>
            </div>

            <div className="payment-section-left">
              <h3>Payment Information</h3>
              <div className="payment-option-left">
                <input type="radio" id="transfer" name="paymentMethod" value="transfer" checked={paymentMethod === 'transfer'} onChange={() => setPaymentMethod('transfer')} />
                <label htmlFor="transfer">Transferencia bancaria directa</label>
                {paymentMethod === 'transfer' && (
                  <div className="payment-info-box">
                    <p>Realiza tu pago directamente en nuestra cuenta bancaria. Por favor, usa el número del pedido como referencia de pago. Tu pedido no se procesará hasta que se haya recibido el importe en nuestra cuenta.</p>
                  </div>
                )}
              </div>

              <div className="payment-option-left">
                <input type="radio" id="bold" name="paymentMethod" value="bold" checked={paymentMethod === 'bold'} onChange={() => setPaymentMethod('bold')} />
                <label htmlFor="bold">Paga en línea con Bold</label>
                <img src={metodosBoldLogo} alt="Métodos de pago Bold" className="payment-logos-bold" />
                {paymentMethod === 'bold' && (
                  <div className="bold-info-dropdown">
                    <img src={boldLogo} alt="Bold Logo" className="bold-dropdown-logo" />
                    <p>Te llevaremos a la pasarela de pagos Bold para completar tu pago de forma fácil y segura</p>
                    <div className="compra-protegida-box">
                      <img src={compraProtegidaLogo} alt="Compra 100% protegida" className="compra-protegida-img" />
                    </div>
                  </div>
                )}
              </div>

              <div className="payment-option-left">
                <input type="radio" id="sistecredito" name="paymentMethod" value="sistecredito" checked={paymentMethod === 'sistecredito'} onChange={() => setPaymentMethod('sistecredito')} />
                <label htmlFor="sistecredito">Sistecredito</label>
                <img src={sistecreditoLogo} alt="Sistecredito" className="payment-logo-sistecredito" />
                {paymentMethod === 'sistecredito' && (
                  <div className="sistecredito-info-dropdown">
                    <div className="form-row">
                      <div className="form-group half-width">
                        <label>Tipo Documento <span className="error-asterisk">*</span></label>
                        <select name="documentType" value={sistecreditoData.documentType} onChange={handleSistecreditoChange}>
                          <option>Cedula de Ciudadania</option>
                          <option>Cedula de Extranjeria</option>
                        </select>
                      </div>
                      <div className="form-group half-width">
                        <label>Numero Documento <span className="error-asterisk">*</span></label>
                        <input type="text" name="documentNumber" value={sistecreditoData.documentNumber} onChange={handleSistecreditoChange} />
                      </div>
                    </div>
                  </div>
                )}
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
            {/* ... order summary content ... */}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
