import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import VehicleSelector from './components/VehicleSelector';
import TireSearch from './components/TireSearch';
import InfoSection from './components/InfoSection';
import SecureSection from './components/SecureSection';
import motorllantasLogo from './assets/img/motorllantas.png';
import compraIcon from './assets/img/compra.png';
import ProductCarousel from './components/ProductCarousel';
import ShippingInfo from './components/ShippingInfo';
import Map from './components/Map';
import Motorpost from './components/Motorpost';
import PaymentMethods from './components/PaymentMethods';
import Offers from './pages/Offers';
import Tires from './pages/Tires';
import Contact from './pages/Contact';
import Installation from './pages/Installation';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import { useCart } from './context/CartContext';

const Home = () => (
  <>
    <main>
      <div className="search-container">
        <VehicleSelector />
        <TireSearch />
      </div>
      <h1 className="main-title">¡Busca rápido tus llantas!</h1>
    </main>
    <InfoSection />
    <SecureSection />
    <ProductCarousel />
    <ShippingInfo />
    <Map />
    <Motorpost />
    <PaymentMethods />
  </>
);

function App() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/">
            <img src={motorllantasLogo} className="App-logo" alt="logo" />
          </Link>
          <nav>
            <NavLink to="/" end>INICIO</NavLink>
            <NavLink to="/tires">LLANTAS</NavLink>
            <NavLink to="/offers">OFERTAS</NavLink>
            <NavLink to="/installation">INSTALACIÓN</NavLink>
            <NavLink to="/contact">CONTACTO</NavLink>
          </nav>
          <div className="header-icons">
            <Link to="/cart" className="cart-icon">
              <img src={compraIcon} alt="compra" />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </Link>
          </div>
        </header>
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/tires" element={<Tires />} />
            <Route path="/installation" element={<Installation />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
