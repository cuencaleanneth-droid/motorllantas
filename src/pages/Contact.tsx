import './Contact.css';
import { useState } from "react";
import { FaPhone, FaClock, FaGlobe, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error al enviar");

      setStatus("✅ Mensaje enviado con éxito");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("❌ Error al enviar mensaje. Intenta nuevamente.");
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Ponte en contacto</h2>
        <p>Especialistas en llantas para todo tipo de vehículos.</p>
        <p className="address-info"><FaMapMarkerAlt /> Cll. 33 #64 – 198 Conquistadores</p>
        <div className="contact-details">
          <p><FaPhone /> +57 312 299 10 84</p>
          <p><FaClock /> Lunes – Viernes 8:00 am a 5:00 pm</p>
          <p>Sábado 8:00 am a 1:00 pm</p>
          <p><FaGlobe /> www.motorllantas.com</p>
          <p><FaEnvelope /> info@motorllantas.com</p>
        </div>
        <div className="social-icons">
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaYoutube /></a>
          <a href="#"><FaWhatsapp /></a>
        </div>
      </div>

      <div className="contact-form-container">
        <h2>Escríbenos</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Su Nombre: </label>
            <input type="text" id="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Su E-mail: </label>
            <input type="email" id="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto: </label>
            <input type="text" id="subject" value={form.subject} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Su Mensaje: </label>
            <textarea id="message" rows={5} value={form.message} onChange={handleChange}></textarea>
          </div>
          <button type="submit" className="submit-btn">Enviar</button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
