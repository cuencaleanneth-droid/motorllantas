import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./PaymentResult.css";

const SuccessPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const paymentId = query.get("payment_id");

  return (
    <div className="payment-result success">
      <h2>✅ ¡Pago exitoso!</h2>
      <p>Tu transacción fue procesada correctamente.</p>
      {paymentId && <p>ID de pago: <strong>{paymentId}</strong></p>}
      <Link to="/" className="btn">Volver a la tienda</Link>
    </div>
  );
};

export default SuccessPage;
