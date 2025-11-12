import React from "react";
import { Link } from "react-router-dom";
import "./PaymentResult.css";

const FailurePage = () => (
  <div className="payment-result failure">
    <h2>❌ Pago fallido</h2>
    <p>Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.</p>
    <Link to="/" className="btn">Volver al checkout</Link>
  </div>
);

export default FailurePage;
