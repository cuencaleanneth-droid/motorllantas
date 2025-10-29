import './ShoppingCart.css';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 20000;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shopping-cart">
      <div className="cart-container">
        <div className="cart-items">
          <div className="cart-item-header">
            <span>PRODUCTO</span>
            <span>PRECIO</span>
            <span>CANTIDAD</span>
            <span>SUBTOTAL</span>
          </div>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="product-info">
                <button className="remove-item" onClick={() => removeFromCart(item.id)}>×</button>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <div className="price">CO ${item.price.toLocaleString()}</div>
              <div className="quantity">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="subtotal">CO ${ (item.price * item.quantity).toLocaleString() }</div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Total del carrito</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>CO ${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <div>
              <span>CO ${shipping.toLocaleString()}</span>
              <p>Las opciones de envío se actualizarán durante el pago.</p>
              <a href="#">Calcular envío</a>
            </div>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>CO ${total.toLocaleString()}</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>FINALIZAR COMPRA</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
