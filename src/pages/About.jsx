import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <Container>
      <Col className="w-100 h-25">
        <img
          src="https://thumbs.dreamstime.com/b/luxury-hotel-4480742.jpg"
          alt="aboutUs"
          className="w-100 rounded"
          style={{ height: '297px' }}
        />
      </Col>
      <Row className="d-flex flex-column">
        <Col>
          <h3
            className="text-transform-none text-dark text-center p-5"
            style={{ fontSize: '60px', fontWeight: '400' }}
          >
            Visit Our Famous Hotel
            <span className=""></span>
          </h3>
        </Col>
        <Col>
          <p className="text-center text-muted p-2 ">
            We stayed at the Landgasthof & Hotel Wirt am Bach in Oberweis
            (Laakirchen) near Gmunden. Our junior suite was very nice and large.
            The room, bathroom and toilet were very clean. The breakfast buffet
            had all we needed. The service was very friendly. Prices are very
            reasonable. This hotel is also well known in the flyfishing
            community and can be a base to flyfishing trips in the Gmunden area
            and beyond. <br />
            Higly recommendable!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
