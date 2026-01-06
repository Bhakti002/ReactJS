// src/components/RoomDetails.jsx
import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBed, FaUserFriends, FaStar } from 'react-icons/fa';

const RoomDetails = ({ room }) => {
  return (
    <Card className="h-100 shadow-sm border-0 room-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={room.imageUrl || 'https://via.placeholder.com/400x250?text=No+Image+Available'} 
          alt={room.name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <Badge 
          bg={room.available ? 'success' : 'danger'} 
          className="position-absolute top-0 end-0 m-3"
        >
          {room.available ? 'Available' : 'Booked'}
        </Badge>
      </div>
      
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="card-title mb-0">{room.name}</h5>
          <div className="text-warning">
            <FaStar /> <small className="text-muted">4.8</small>
          </div>
        </div>
        
        <Card.Text className="text-muted flex-grow-1">
          {room.description && room.description.length > 100 
            ? `${room.description.substring(0, 100)}...` 
            : room.description}
        </Card.Text>
        
        <div className="d-flex gap-3 mb-3 text-muted">
          <div className="d-flex align-items-center">
            <FaBed className="me-1" />
            <small>{room.type}</small>
          </div>
          <div className="d-flex align-items-center">
            <FaUserFriends className="me-1" />
            <small>{room.capacity} Guests</small>
          </div>
        </div>
        
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <div>
            <span className="fs-4 fw-bold text-primary">${room.price}</span>
            <small className="text-muted"> / night</small>
          </div>
          <Button 
            as={Link} 
            to="/reserve" 
            variant={room.available ? 'primary' : 'secondary'} 
            disabled={!room.available}
          >
            {room.available ? 'Book Now' : 'Not Available'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default RoomDetails;
