// src/components/Home.jsx
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaWifi, FaTv, FaSnowflake, FaHotTub, FaSwimmingPool, FaUtensils } from 'react-icons/fa';

const Home = () => {
  const features = [
    { icon: <FaWifi />, title: "Free WiFi", desc: "High-speed internet access" },
    { icon: <FaTv />, title: "Smart TV", desc: "Entertainment in every room" },
    { icon: <FaSnowflake />, title: "AC", desc: "Climate control comfort" },
    { icon: <FaHotTub />, title: "Spa", desc: "Relaxing spa treatments" },
    { icon: <FaSwimmingPool />, title: "Pool", desc: "Infinity pool with view" },
    { icon: <FaUtensils />, title: "Restaurant", desc: "Fine dining experience" }
  ];

  const roomTypes = [
    {
      title: "Deluxe Suite",
      price: "$299/night",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      desc: "Luxurious suite with ocean view"
    },
    {
      title: "Executive Room",
      price: "$199/night",
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&q=80",
      desc: "Comfortable room for business"
    },
    {
      title: "Family Room",
      price: "$249/night",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      desc: "Spacious room for families"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={7} className="hero-content">
              <h6 className="text-gold text-uppercase fw-bold mb-3 animate-fade-in" style={{ letterSpacing: '4px' }}>
                Welcome to Excellence
              </h6>
              <h1 className="display-2 fw-bold text-white mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Experience Luxury <br /> Like Never Before
              </h1>
              <p className="lead text-white-50 mb-5 animate-fade-in" style={{ maxWidth: '600px', animationDelay: '0.4s' }}>
                Discover a world of elegance and comfort. From our designer suites to world-class dining, 
                every detail is crafted for your perfect stay.
              </p>
              <div className="d-flex gap-3 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <Button as={Link} to="/rooms" variant="primary" size="lg">
                  Explore Rooms <FaArrowRight className="ms-2" />
                </Button>
                <Button as={Link} to="/reserve" variant="outline-light" size="lg" className="px-4 border-2" style={{ borderRadius: '0' }}>
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <div className="section-padding bg-white">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h6 className="text-gold text-uppercase fw-bold mb-3" style={{ letterSpacing: '2px' }}>Amenities</h6>
              <h2 className="display-5 fw-bold mb-3">World Class Features</h2>
              <div className="mx-auto" style={{ width: '80px', height: '3px', background: 'var(--primary-color)' }}></div>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={4} lg={2} className="mb-4" key={index}>
                <div className="feature-icon text-center h-100 d-flex flex-column align-items-center">
                  <div className="mb-4 text-gold fs-1">{feature.icon}</div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted small mb-0">{feature.desc}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Room Types Section */}
      <div className="section-padding bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col lg={8} className="mx-auto">
              <h6 className="text-gold text-uppercase fw-bold mb-3" style={{ letterSpacing: '2px' }}>Luxury Stay</h6>
              <h2 className="display-5 fw-bold mb-3">Our Signature Suites</h2>
              <div className="mx-auto" style={{ width: '80px', height: '3px', background: 'var(--primary-color)' }}></div>
            </Col>
          </Row>
          <Row>
            {roomTypes.map((room, index) => (
              <Col lg={4} className="mb-4" key={index}>
                <Card className="card-hover h-100">
                  <Card.Img 
                    variant="top" 
                    src={room.image} 
                    className="room-image"
                  />
                  <Card.Body className="text-center p-4">
                    <Card.Title className="fw-bold fs-4 mb-3">{room.title}</Card.Title>
                    <Card.Text className="text-muted mb-4">{room.desc}</Card.Text>
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <h4 className="text-gold fw-bold mb-0">{room.price}</h4>
                      <Button as={Link} to="/rooms" variant="outline-primary" size="sm">
                        Details
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Call to Action */}
      <div className="section-padding bg-luxury-dark text-center">
        <Container>
          <h2 className="display-4 fw-bold mb-4">Ready to Begin Your Journey?</h2>
          <p className="lead mb-5 text-white-50">Book your stay today and enjoy up to 20% off on your first reservation.</p>
          <Button as={Link} to="/reserve" variant="primary" size="lg" className="px-5">
            Book My Stay Now
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Home;
