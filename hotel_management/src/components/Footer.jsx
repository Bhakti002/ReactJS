// src/components/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt, FaHotel } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-luxury-dark text-white mt-auto pt-5 pb-4">
      <Container>
        <Row className="mb-5">
          <Col lg={4} className="mb-4">
            <div className="d-flex align-items-center mb-4">
              <FaHotel className="text-gold me-2" size={24} />
              <h3 className="mb-0 text-uppercase fw-bold" style={{ letterSpacing: '2px' }}>
                Luxury <span className="text-gold">Hotel</span>
              </h3>
            </div>
            <p className="text-white-50 lh-lg" style={{ maxWidth: '350px' }}>
              Experience world-class hospitality and luxury accommodations 
              at our premier hotel. Every moment is designed to be extraordinary.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="btn btn-outline-gold rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}><FaFacebook size={18} /></a>
              <a href="#" className="btn btn-outline-gold rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}><FaTwitter size={18} /></a>
              <a href="#" className="btn btn-outline-gold rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}><FaInstagram size={18} /></a>
            </div>
          </Col>
          
          <Col lg={4} className="mb-4">
            <h5 className="text-gold text-uppercase fw-bold mb-4" style={{ letterSpacing: '2px' }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <Link to="/" className="text-white-50 text-decoration-none hover-gold transition-smooth">Our Story</Link>
              </li>
              <li className="mb-3">
                <Link to="/rooms" className="text-white-50 text-decoration-none hover-gold transition-smooth">Luxury Suites</Link>
              </li>
              <li className="mb-3">
                <Link to="/reservations" className="text-white-50 text-decoration-none hover-gold transition-smooth">My Bookings</Link>
              </li>
              <li className="mb-3">
                <Link to="/reserve" className="text-white-50 text-decoration-none hover-gold transition-smooth">Reservation</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={4} className="mb-4">
            <h5 className="text-gold text-uppercase fw-bold mb-4" style={{ letterSpacing: '2px' }}>Concierge</h5>
            <ul className="list-unstyled">
              <li className="mb-3 d-flex align-items-start">
                <FaMapMarkerAlt className="text-gold me-3 mt-1" />
                <span className="text-white-50">123 Luxury Avenue, Elegance District,<br />Paris, France</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaPhone className="text-gold me-3" />
                <span className="text-white-50">+91 91732 28497</span>
              </li>
              <li className="mb-3 d-flex align-items-center">
                <FaEnvelope className="text-gold me-3" />
                <span className="text-white-50">bhaktibhavsar@gmail.com</span>
              </li>
            </ul>
          </Col>
        </Row>
        
        <div className="pt-4 border-top border-secondary">
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
              <p className="mb-0 text-white-50 small">
                &copy; {new Date().getFullYear()} Luxury Hotel. Defined by Excellence.
              </p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="small text-white-50">
                <a href="#" className="text-decoration-none text-white-50 me-3">Privacy Policy</a>
                <a href="#" className="text-decoration-none text-white-50">Terms of Service</a>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <style>{`
        .hover-gold:hover { color: var(--primary-color) !important; padding-left: 10px; }
        .btn-outline-gold { color: var(--primary-color); border-color: var(--primary-color); transition: all 0.3s; }
        .btn-outline-gold:hover { background: var(--primary-color); color: white; }
        .transition-smooth { transition: all 0.3s ease; }
      `}</style>
    </footer>
  );
};

export default Footer;
