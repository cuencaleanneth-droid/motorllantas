import './Contact.css';
import { FaPhone, FaClock, FaGlobe, FaEnvelope, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
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
          <a href="https://www.facebook.com/share/1DjvbkBZzx/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebook /></a> 
          <a href="https://www.instagram.com/motorllantas.com_?igsh=cnR6NHBvMTVhazE0" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          <a href="https://youtube.com/@motorllantas?si=edIXnMRim1QJJYq1" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
          <a href="https://wa.link/7gfrd9" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a> 
        </div>
      </div>
      <div className="contact-form-container">
        <h2>Escríbenos</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Su Nombre: </label>
            <input type="text" id="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Su E-mail: </label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto: </label>
            <input type="text" id="subject" />
          </div>
          <div className="form-group">
            <label htmlFor="message">Su Mensaje: </label>
            <textarea id="message" rows={5}></textarea>
          </div>
          <button type="submit" className="submit-btn">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
