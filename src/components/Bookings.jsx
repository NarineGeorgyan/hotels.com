import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HotelCard from './cards/HotelCard';
import { userHotelBookings } from '../actions/hotels';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Bookings = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const {token} = auth;

  const [hotels, setHotels] = useState([]);

  const getBookedHotels = async () => {
    try {
      const res = await userHotelBookings(token);
      console.log("Hello res => ", res)
      setHotels(res.data);
    }catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getBookedHotels();
  }, [])

  return <>
      <Container>
        <Row>
          {hotels && hotels.length ? (
            hotels.map((hotel) => {
              return (
                <Col key={hotel._id} md={3}>
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard
                      hotel={hotel}
                    />
                  </Link>
                </Col>
              );
            })
          ) : (
            <h4 className="text-muted"> :( No Hotels Found!</h4>
          )}
        </Row>
      </Container>
  </>;
};

export default Bookings;
