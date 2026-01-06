// src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, loginWithGoogle } from '../../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { FaGoogle, FaUser, FaEnvelope, FaLock, FaHotel } from 'react-icons/fa';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (formData.password !== formData.confirmPassword) {
      return setPasswordError('Passwords do not match');
    }

    const result = await dispatch(signupUser({
      email: formData.email,
      password: formData.password,
      name: formData.name
    }));

    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/rooms');
    }
  };

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle());
    if (result.meta.requestStatus === 'fulfilled') {
      navigate('/rooms');
    }
  };

  return (
    <div className="bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <div className="text-center mb-4 animate-fade-in">
              <FaHotel className="text-gold mb-3" size={50} />
              <h2 className="fw-bold text-uppercase" style={{ letterSpacing: '3px' }}>
                Join <span className="text-gold">Luxury</span>
              </h2>
              <p className="text-muted">Begin your extraordinary journey</p>
            </div>
            
            <Card className="border-0 shadow-lg animate-fade-in" style={{ borderRadius: '0' }}>
              <Card.Body className="p-4 p-md-5">
                {(error || passwordError) && (
                  <Alert variant="danger" className="small border-0 rounded-0">{error || passwordError}</Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="small text-uppercase fw-bold text-muted">Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="bg-light border-0"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-uppercase fw-bold text-muted">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@luxury.com"
                      className="bg-light border-0"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-uppercase fw-bold text-muted">Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-light border-0"
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="small text-uppercase fw-bold text-muted">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="bg-light border-0"
                      required
                    />
                  </Form.Group>

                  <Button 
                    variant="primary" 
                    type="submit" 
                    className="w-100 py-3 mb-4 fw-bold"
                    disabled={loading}
                  >
                    {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
                  </Button>

                  <div className="position-relative text-center mb-4">
                    <hr />
                    <span className="position-absolute top-50 start-50 translate-middle bg-white px-3 text-muted small">OR</span>
                  </div>

                  <Button
                    variant="outline-dark"
                    className="w-100 py-3 d-flex align-items-center justify-content-center mb-4"
                    style={{ borderRadius: '0' }}
                    onClick={handleGoogleLogin}
                    disabled={loading}
                  >
                    <FaGoogle className="me-2 text-danger" />
                    SIGN UP WITH GOOGLE
                  </Button>

                  <div className="text-center">
                    <p className="mb-0 small text-muted">
                      Already have an account?{' '}
                      <Link to="/login" className="text-gold fw-bold text-decoration-none">
                        SIGN IN
                      </Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
