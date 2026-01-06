// src/components/ReservationForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { makeReservation, clearReservationError } from '../redux/slices/reservationSlice';
import { fetchRooms, clearFilters } from '../redux/slices/roomSlice';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt, FaUser, FaEnvelope, FaCheck } from 'react-icons/fa';

const ReservationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { rooms, loading: roomsLoading, error: roomsError } = useSelector((state) => state.rooms);
  const { loading: reservationLoading, error: reservationError } = useSelector((state) => state.reservations);
  
  const [formData, setFormData] = useState({
    roomId: '',
    guestName: '',
    guestEmail: '',
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 2)),
    specialRequests: ''
  });

  const [selectedRoom, setSelectedRoom] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    dispatch(clearReservationError());
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      dispatch(fetchRooms({ available: true }));
      setFormData(prev => ({
        ...prev,
        guestName: user?.displayName || '',
        guestEmail: user?.email || ''
      }));
    }
  }, [isAuthenticated, navigate, dispatch, user]);

  useEffect(() => {
    if (formData.roomId && formData.checkIn && formData.checkOut) {
      const room = rooms.find(r => r.id === formData.roomId);
      if (room) {
        setSelectedRoom(room);
        const nights = Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24));
        setTotalPrice(room.price * nights);
      }
    }
  }, [formData.roomId, formData.checkIn, formData.checkOut, rooms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name, date) => {
    setFormData(prev => ({ ...prev, [name]: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reservationData = {
      ...formData,
      totalPrice,
      checkIn: formData.checkIn.toISOString().split('T')[0],
      checkOut: formData.checkOut.toISOString().split('T')[0]
    };

    try {
      const result = await dispatch(makeReservation(reservationData));
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/reservations');
      }
    } catch (error) {
      console.error('Reservation failed:', error);
    }
  };

  const availableRooms = rooms.filter(room => room.available);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                <FaCalendarAlt className="me-2" />
                Make a Reservation
              </h3>
            </Card.Header>
            
            <Card.Body>
              {roomsError && <Alert variant="danger">{roomsError}</Alert>}
              {reservationError && <Alert variant="danger">{reservationError}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaUser className="me-1" /> Guest Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="guestName"
                        value={formData.guestName}
                        onChange={handleChange}
                        required
                        disabled={roomsLoading}
                      />
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <FaEnvelope className="me-1" /> Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="guestEmail"
                        value={formData.guestEmail}
                        onChange={handleChange}
                        required
                        disabled={roomsLoading}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-4">
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-in Date</Form.Label>
                      <div>
                        <DatePicker
                          selected={formData.checkIn}
                          onChange={(date) => handleDateChange('checkIn', date)}
                          minDate={new Date()}
                          className="form-control"
                          required
                          disabled={roomsLoading}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-out Date</Form.Label>
                      <div>
                        <DatePicker
                          selected={formData.checkOut}
                          onChange={(date) => handleDateChange('checkOut', date)}
                          minDate={formData.checkIn}
                          className="form-control"
                          required
                          disabled={roomsLoading}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Select Room</Form.Label>
                  <div className="position-relative">
                    <Form.Select
                      name="roomId"
                      value={formData.roomId}
                      onChange={handleChange}
                      required
                      disabled={roomsLoading}
                    >
                      <option value="">
                        {roomsLoading ? 'Loading rooms...' : 'Choose a room...'}
                      </option>
                      {availableRooms.map(room => (
                        <option key={room.id} value={room.id}>
                          {room.name} - ${room.price}/night
                        </option>
                      ))}
                    </Form.Select>
                    {roomsLoading && (
                      <div className="position-absolute top-50 end-0 translate-middle-y me-5">
                        <Spinner animation="border" size="sm" variant="primary" />
                      </div>
                    )}
                  </div>
                </Form.Group>

                {selectedRoom && (
                  <Card className="mb-4">
                    <Card.Body>
                      <h5>Selected Room Details</h5>
                      <Row>
                        <Col md={4}>
                          <img
                            src={selectedRoom.imageUrl}
                            alt={selectedRoom.name}
                            className="img-fluid rounded"
                          />
                        </Col>
                        <Col md={8}>
                          <h6>{selectedRoom.name}</h6>
                          <p className="text-muted">{selectedRoom.description}</p>
                          <p><strong>Amenities:</strong> {selectedRoom.amenities.join(', ')}</p>
                          <p><strong>Capacity:</strong> {selectedRoom.capacity} guests</p>
                          <p className="text-primary fs-5">
                            <strong>Total Price: ${totalPrice}</strong>
                            <small className="text-muted ms-2">
                              ({Math.ceil((formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24))} nights × ${selectedRoom.price}/night)
                            </small>
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                )}

                <Form.Group className="mb-4">
                  <Form.Label>Special Requests</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requirements or requests..."
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={reservationLoading}
                    className="d-flex align-items-center justify-content-center"
                  >
                    {reservationLoading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaCheck className="me-2" />
                        Confirm Reservation
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReservationForm;