import React from "react";
import { Link } from "react-router-dom";
import "./PaymentResult.css";

const PendingPage = () => (
  <div className="payment-result pending">
    <h2>⌛ Pago pendiente</h2>
    <p>Tu pago está siendo verificado. Te notificaremos cuando se confirme.</p>
    <Link to="/" className="btn">Volver a la tienda</Link>
  </div>
);

export default PendingPage;
