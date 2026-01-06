// src/components/SimpleReservationForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { saveReservation, getAvailableRooms } from '../firebase/userData';
import { FaBed, FaCalendar, FaUser, FaDollarSign } from 'react-icons/fa';

const SimpleReservationForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    roomId: '',
    guestName: '',
    checkIn: '',
    checkOut: '',
    guests: '2'
  });

  // Load available rooms
  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setLoading(true);
    const result = await getAvailableRooms();
    if (result.success) {
      setRooms(result.data.filter(room => room.available));
    } else {
      setError('Failed to load rooms');
    }
    setLoading(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Get current user
    const user = auth.currentUser;
    if (!user) {
      setError('Please login first');
      setLoading(false);
      return;
    }

    // Get selected room
    const selectedRoom = rooms.find(room => room.id === formData.roomId);
    if (!selectedRoom) {
      setError('Please select a room');
      setLoading(false);
      return;
    }

    // Prepare user data
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: formData.guestName || user.displayName
    };

    // Save reservation
    const result = await saveReservation(userData, selectedRoom);
    
    if (result.success) {
      setSuccess(`Reservation successful! Your booking ID: ${result.id}`);
      // Clear form
      setFormData({
        roomId: '',
        guestName: '',
        checkIn: '',
        checkOut: '',
        guests: '2'
      });
      // Reload rooms
      loadRooms();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Container className="py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h3 className="mb-0">
                <FaCalendar className="me-2" />
                Book Your Stay
              </h3>
            </Card.Header>
            
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                {/* Guest Name */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaUser className="me-2" />
                    Guest Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="guestName"
                    value={formData.guestName}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                {/* Select Room */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    <FaBed className="me-2" />
                    Select Room
                  </Form.Label>
                  <Form.Select
                    name="roomId"
                    value={formData.roomId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Choose a room...</option>
                    {rooms.map(room => (
                      <option key={room.id} value={room.id}>
                        {room.name} - ${room.price}/night
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Dates */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Check-in Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group>
                      <Form.Label>Check-out Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                {/* Number of Guests */}
                <Form.Group className="mb-4">
                  <Form.Label>Number of Guests</Form.Label>
                  <Form.Select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  >
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                  </Form.Select>
                </Form.Group>

                {/* Submit Button */}
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" className="me-2" />
                        Booking...
                      </>
                    ) : (
                      <>
                        <FaDollarSign className="me-2" />
                        Book Now
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SimpleReservationForm;