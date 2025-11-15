import './Footer.css';
import motorllantasLogo from '../assets/img/motorllantas.png';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img src={motorllantasLogo} alt="Motor Llantas" className="footer-logo-img" />
      </div>
      <div className="footer-contact">
        <p>Contáctanos:</p>
        <div className="footer-social-icons">
          <a href="https://wa.link/7gfrd9" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a> 
        </div>
      </div>
      <div className="footer-social">
        <p>Síguenos en nuestras redes:</p>
        <div className="footer-social-icons">
          <a href="https://www.facebook.com/share/1DjvbkBZzx/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer"><FaFacebook /></a> 
          <a href="https://www.instagram.com/motorllantas.com_?igsh=cnR6NHBvMTVhazE0" target="_blank" rel="noopener noreferrer"><FaInstagram /></a> 
          <a href="https://www.tiktok.com/@motorllantas.com_?_r=1&_t=ZS-91P86eG2DA2" target="_blank" rel="noopener noreferrer"><FaTiktok /></a> 
          <a href="https://youtube.com/@motorllantas?si=edIXnMRim1QJJYq1" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;