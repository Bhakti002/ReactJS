// src/components/ReservationList.jsx
import React, { useEffect } from 'react';
import { Container, Table, Badge, Button, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, cancelReservation, deleteReservation } from '../redux/slices/reservationSlice';
import { FaCalendarAlt, FaHistory, FaMapMarkerAlt, FaBed, FaTimes, FaTrash } from 'react-icons/fa';

const ReservationList = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reservations, loading, error } = useSelector((state) => state.reservations);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchReservations(user.uid));
    }
  }, [dispatch, user]);

  const handleCancel = (reservationId, roomId) => {
    if (window.confirm('Are you sure you want to cancel this reservation?')) {
      dispatch(cancelReservation({ reservationId, roomId }));
    }
  };

  const handleDelete = (reservationId, roomId) => {
    if (window.confirm('Are you sure you want to delete this reservation? This will remove the record entirely.')) {
      dispatch(deleteReservation({ reservationId, roomId }));
    }
  };

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your reservations...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Error loading reservations: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2 className="d-flex align-items-center">
            <FaHistory className="me-2 text-primary" />
            My Reservations
          </h2>
          <p className="text-muted">Manage and view your booking history</p>
        </Col>
      </Row>

      {reservations.length === 0 ? (
        <Card className="text-center p-5 shadow-sm border-0">
          <Card.Body>
            <FaCalendarAlt size={50} className="text-muted mb-3" />
            <h4>No Reservations Found</h4>
            <p className="text-muted">You haven't made any reservations yet.</p>
            <Button href="/rooms" variant="primary" className="mt-2">
              Browse Rooms
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <Table hover className="bg-white mb-0">
            <thead className="bg-light">
              <tr>
                <th>Room</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total Price</th>
                <th>Status</th>
                <th>Booked On</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((res) => (
                <tr key={res.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      {res.roomDetails?.imageUrl && (
                        <img 
                          src={res.roomDetails.imageUrl} 
                          alt={res.roomDetails.name} 
                          className="rounded me-2" 
                          style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        <div className="fw-bold">{res.roomDetails?.name || 'N/A'}</div>
                        <small className="text-muted">{res.roomDetails?.type}</small>
                      </div>
                    </div>
                  </td>
                  <td>{res.checkIn}</td>
                  <td>{res.checkOut}</td>
                  <td className="fw-bold text-primary">${res.totalPrice}</td>
                  <td>
                    <Badge bg={res.status === 'confirmed' ? 'success' : res.status === 'cancelled' ? 'danger' : 'secondary'}>
                      {res.status}
                    </Badge>
                  </td>
                  <td>
                    <small className="text-muted">
                      {res.createdAt 
                        ? new Date(res.createdAt).toLocaleDateString()
                        : 'N/A'}
                    </small>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {res.status === 'confirmed' && (
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleCancel(res.id, res.roomId)}
                          title="Cancel Reservation"
                        >
                          <FaTimes className="me-1" /> Cancel
                        </Button>
                      )}
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleDelete(res.id, res.roomId)}
                        title="Remove Reservation"
                      >
                        <FaTrash className="me-1" /> Remove
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default ReservationList;
