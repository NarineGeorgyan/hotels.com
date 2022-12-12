import React from 'react';
import { Col, Row, Container, Nav } from 'react-bootstrap';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';

import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <Container fluid className="bg-dark footer">
      <Row>
        <Col md={4}>
          <div
            className="h2 text-white mb-2"
            style={{
              marginLeft: '45px',
              fontFamily: 'Sofia',
              letterSpacing: '3px',
            }}
          >
            Hotels.com
          </div>
          <div>
            <img
              alt="image"
              src="	https://hotelina-nextjs.vercel.app/assets/images/header-logo22.svg"
              style={{ width: '80px', height: '80px', marginLeft: '85px' }}
            />
          </div>
        </Col>
        <Col md={{ span: 2, offset: 1 }}>
          <div className="h4 text-white mb-2 text-uppercase">Contact</div>
          <div>
            <strong className="text-white h6">T: </strong>
            <span className="text-muted">1-634-567-34</span>
          </div>
          <div>
            <strong className="text-white h6 ">E: </strong>
            <span className="text-muted">info@hotels.com</span>
          </div>
          <div>
            <strong className="text-white h6">F: </strong>
            <span className="text-muted">1-634-567-35</span>
          </div>
        </Col>
        <Col md={{ span: 2, offset: 3 }}>
          <div className="h4 text-white mb-2 text-uppercase">ADDRESS</div>
          <div>
            <span className="text-muted">Hotale Av.</span>
            <br />
            <span className="text-muted">del Ejercito, 2, 1900</span> <br />
            <span className="text-muted">Madrid, Spains</span>
          </div>
        </Col>

        <Col className="d-flex justify-content-between mt-1">
          <Nav className="   d-flex  gap-2  ">
            <Link to="/" className="nav-link  text-white">
              Home
            </Link>
            <Link to="/contact" className="nav-link  text-white ">
              Contact
            </Link>
            <Link to="/about" className="nav-link  text-white">
              About us
            </Link>
          </Nav>
          <div className="social-icons text-white bg-dark mx-auto">
            <FaFacebook />
            <FaGoogle />
            <FaTwitter />

            <li className="nav-link">
              <a href="https://apps.apple.com/us/app/chessify/id1397066775">
                <div className="app"> </div>
              </a>
            </li>
            <li className="nav-link">
              <a href="https://play.google.com/store/apps/details?id=com.fimetech.chessfimee&hl=en_US&pli=1">
                <div className="google"></div>
              </a>
            </li>
          </div>
          <div className="footer text-white bg-dark text-center p-2 text-muted">
            www.hotels.com | All rights reserved!
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
