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
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="shopping-cart">
      <div className="cart-container">
        <div className="cart-items">
          {isCartEmpty ? (
            <p className="empty-cart-message">Tu carrito de compras está vacío.</p>
          ) : (
            <>
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
                  <div className="price">COP ${item.price.toLocaleString()}</div>
                  <div className="quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="subtotal">COP ${(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </>
          )}
        </div>
        <div className="cart-summary">
          <h2>Total del carrito</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>COP ${subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Envío</span>
            <span className="shipping-price">COP ${shipping.toLocaleString()}</span>
          </div>
          <p className="shipping-note">Las opciones de envío se actualizarán durante el pago.</p>
          <div className="summary-row total">
            <span>Total</span>
            <span>COP ${total.toLocaleString()}</span>
          </div>
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={isCartEmpty}
          >
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
