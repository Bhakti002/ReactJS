// src/components/SimpleReservationList.jsx
import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { getUserReservations, cancelReservation } from '../firebase/userData';
import { FaEye, FaTrash, FaCalendar } from 'react-icons/fa';

const SimpleReservationList = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load user's reservations
  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    const user = auth.currentUser;
    
    if (!user) {
      setError('Please login to view reservations');
      setLoading(false);
      return;
    }

    const result = await getUserReservations(user.uid);
    
    if (result.success) {
      setReservations(result.data);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleCancel = async (reservationId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      setLoading(true);
      const result = await cancelReservation(reservationId);
      
      if (result.success) {
        // Reload reservations
        await loadReservations();
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'confirmed': return 'success';
      case 'cancelled': return 'danger';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
        <p className="mt-3">Loading your reservations...</p>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">
            <FaCalendar className="me-2" />
            My Bookings
          </h3>
          <Button 
            variant="light" 
            size="sm"
            onClick={() => navigate('/book')}
          >
            Book New Room
          </Button>
        </Card.Header>
        
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          {reservations.length === 0 ? (
            <div className="text-center py-5">
              <h5>No reservations yet</h5>
              <p className="text-muted">Book your first stay to see it here!</p>
              <Button 
                variant="primary"
                onClick={() => navigate('/book')}
              >
                Book Now
              </Button>
            </div>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Room</th>
                  <th>Dates</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id}>
                    <td>
                      <small className="text-muted">{res.id.substring(0, 8)}...</small>
                    </td>
                    <td>{res.roomName}</td>
                    <td>
                      {new Date(res.checkIn).toLocaleDateString()} - 
                      {new Date(res.checkOut).toLocaleDateString()}
                    </td>
                    <td>${res.totalPrice}</td>
                    <td>
                      <Badge bg={getStatusColor(res.status)}>
                        {res.status}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => navigate(`/booking/${res.id}`)}
                        >
                          <FaEye />
                        </Button>
                        {res.status === 'confirmed' && (
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleCancel(res.id)}
                          >
                            <FaTrash />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SimpleReservationList;