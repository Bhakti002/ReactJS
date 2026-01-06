// src/components/RoomList.jsx
import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRooms } from '../redux/slices/roomSlice';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaArrowRight, FaStar, FaWifi, FaTv, FaSnowflake } from 'react-icons/fa';

const RoomList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, loading, error } = useSelector((state) => state.rooms);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-gold">Discovering luxury for you...</p>
      </Container>
    );
  }

  // Function to get amenity icon
  const getAmenityIcon = (amenity) => {
    switch(amenity.toLowerCase()) {
      case 'wifi': return <FaWifi className="me-1" />;
      case 'tv': return <FaTv className="me-1" />;
      case 'ac': return <FaSnowflake className="me-1" />;
      default: return null;
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Page Header */}
      <div className="bg-luxury-dark text-white py-5 mb-5 shadow">
        <Container className="text-center py-4">
          <h6 className="text-gold text-uppercase fw-bold mb-3 animate-fade-in" style={{ letterSpacing: '4px' }}>Accommodation</h6>
          <h1 className="display-4 fw-bold animate-fade-in" style={{ animationDelay: '0.2s' }}>Luxury Suites & Rooms</h1>
          <div className="mx-auto mt-3" style={{ width: '60px', height: '2px', background: 'var(--primary-color)' }}></div>
        </Container>
      </div>

      <Container className="pb-5">
        {error && (
          <Alert variant="info" className="border-0 shadow-sm mb-4 bg-white text-center">
            <span className="text-gold fw-bold">Note:</span> Showing featured collection.
          </Alert>
        )}

        {/* Rooms Grid */}
        <Row className="g-4">
          {rooms.map((room, index) => (
            <Col key={room.id} xs={12} md={6} lg={4} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <Card className="card-hover h-100">
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <Card.Img 
                    variant="top" 
                    src={room.imageUrl} 
                    className="room-image"
                    alt={room.name}
                  />
                  <div className="position-absolute top-0 end-0 m-3">
                    {room.available ? (
                      <span className="badge bg-luxury-dark text-gold px-3 py-2 border border-gold" style={{ borderRadius: '0' }}>
                        AVAILABLE
                      </span>
                    ) : (
                      <span className="badge bg-danger px-3 py-2" style={{ borderRadius: '0' }}>
                        BOOKED
                      </span>
                    )}
                  </div>
                </div>
                
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Card.Title className="fw-bold fs-4 mb-0">{room.name}</Card.Title>
                    <div className="d-flex align-items-center text-gold">
                      <FaStar className="me-1" />
                      <span className="fw-bold">{room.rating || 4.8}</span>
                    </div>
                  </div>
                  
                  <Card.Text className="text-muted mb-4 small">
                    {room.description}
                  </Card.Text>
                  
                  <div className="mb-4 bg-light p-3">
                    <div className="d-flex justify-content-between mb-2 small fw-bold">
                      <span className="text-uppercase text-muted" style={{ letterSpacing: '1px' }}>{room.type}</span>
                      <span className="text-muted">{room.size || '450 sq ft'}</span>
                    </div>
                    
                    <div className="d-flex flex-wrap gap-2 mt-2">
                      {room.amenities.slice(0, 3).map((amenity, idx) => (
                        <span key={idx} className="small text-muted d-flex align-items-center me-2">
                          {getAmenityIcon(amenity)}
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 border-top">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <span className="text-muted small">Price per night</span>
                        <h4 className="text-gold fw-bold mb-0">${room.price}</h4>
                      </div>
                      <Button 
                        variant={room.available ? "primary" : "secondary"}
                        className="px-4"
                        onClick={() => navigate('/reserve', { state: { roomId: room.id } })}
                        disabled={!room.available}
                      >
                        {room.available ? 'BOOK NOW' : 'NOT AVAILABLE'}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Call to Action */}
        <div className="section-padding mt-5 bg-luxury-dark text-white text-center rounded shadow-lg overflow-hidden position-relative">
          <div className="position-relative z-index-1">
            <h2 className="display-5 fw-bold mb-3">Custom Experience?</h2>
            <p className="lead mb-4 text-white-50">
              For group bookings or special event arrangements, contact our concierge.
            </p>
            <Button 
              variant="outline-primary" 
              size="lg"
              className="px-5 border-2"
              onClick={() => navigate('/reserve')}
            >
              MAKE AN INQUIRY
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default RoomList;
