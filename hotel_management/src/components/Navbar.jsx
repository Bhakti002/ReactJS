// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FaHotel, FaUser, FaSignOutAlt, FaCalendarCheck, FaBed } from 'react-icons/fa';

const CustomNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Navbar expand="lg" sticky="top" className="navbar shadow-sm">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="d-flex align-items-center">
            <FaHotel className="text-gold me-2" size={28} />
            <span className="text-white fw-bold fs-3 text-uppercase" style={{ letterSpacing: '2px' }}>
              Luxury <span className="text-gold">Hotel</span>
            </span>
          </Navbar.Brand>
        </LinkContainer>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="border-0 bg-gold" />
        
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto align-items-center">
            <LinkContainer to="/">
              <Nav.Link className="mx-2 text-uppercase small">Home</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/rooms">
              <Nav.Link className="mx-2 text-uppercase small">Suites</Nav.Link>
            </LinkContainer>
            
            {isAuthenticated ? (
              <>
                <LinkContainer to="/reservations">
                  <Nav.Link className="mx-2 text-uppercase small">My Stays</Nav.Link>
                </LinkContainer>
                
                <NavDropdown 
                  title={
                    <span className="text-gold mx-2 text-uppercase small fw-bold">
                      <FaUser className="me-1" />
                      {user?.displayName || 'Account'}
                    </span>
                  } 
                  id="user-dropdown"
                  align="end"
                  className="mx-2"
                >
                  <NavDropdown.Item disabled className="text-muted small py-2">
                    {user?.email}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout} className="text-danger small py-2">
                    <FaSignOutAlt className="me-2" /> Sign Out
                  </NavDropdown.Item>
                </NavDropdown>

                <LinkContainer to="/reserve">
                  <Button variant="primary" size="sm" className="ms-3 px-4 py-2 text-uppercase fw-bold small">
                    Book Now
                  </Button>
                </LinkContainer>
              </>
            ) : (
              <div className="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0">
                <LinkContainer to="/login">
                  <Nav.Link className="mx-2 text-uppercase small">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Button variant="primary" size="sm" className="ms-2 px-4 py-2 text-uppercase fw-bold small">
                    Join Now
                  </Button>
                </LinkContainer>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
