import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Container, Row, Col } from 'react-bootstrap';
import { diffDays, getHotelById, isAlreadyBooked } from '../../actions/hotels';
import { toast } from 'react-toastify';
import { BiBed, BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { getSessionId } from "../../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";

const SingleHotel = () => {
  const navigate = useNavigate();
  const params = useParams();
  
  const { auth } = useSelector((state) => ({ ...state }));

  const [hotel, setHotel] = useState({});
  const [alreadyBooked, setAlreadyBooked] = useState(false);
  const [loading, setLoading] = useState(false);


  const getSingleHotel = async () => {
    try {
      const res = await getHotelById(params.id);
      if (res.data) {
        console.log(res.data)
        setHotel(res.data);
      }
    } catch (err) {
      toast.error(err.response.data);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    if (!auth || !auth.token) {
      navigate("/login")
      return;
    }

    setLoading(true);
    // if (!auth) history.push("/login");
    // console.log(auth.token, match.params.hotelId);

    console.log(auth.token, params.id);
    
    let res = await getSessionId(auth.token, params.id);
    console.log("get sessionid resposne", res.data.sessionId);

    const stripe = await loadStripe(`${import.meta.env.VITE_APP_STRIPE_KEY}`);
    
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessionId,
      })
     .then((result) => console.log("Shitak e)) ", result));
  };

  useEffect(() => {
    getSingleHotel();
  }, []);

  useEffect(() => {
    if (auth && auth.token) {
      isAlreadyBooked(auth.token, params.id).then((res) => {
        // if (res.data.ok) 
        setAlreadyBooked(true);
      });
    }
  }, []);

  return (
    <>
      {Object.keys(hotel).length && (
        <Container className="mt-4">
          <h1>
          {alreadyBooked}
          </h1>
          <Row>
            <Col md={6}>
              <img
                src={`${import.meta.env.VITE_APP_API}/hotel/image/${params.id}`}
                alt={hotel.title}
                className="w-100 position-sticky top-30"
              />
            </Col>
            <Col md={6}>
              <h2>{hotel.title}</h2>
              <p>{hotel.content}</p>
              <p>
                <GoLocation />
                {hotel.location}
              </p>
              <p>
                <BiCalendarAlt />
                for {diffDays(hotel.from, hotel.to)}{' '}
                {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
              </p>
              <p>
                <BiBed />
                {hotel.bed}
              </p>
              <p>Available from {new Date(hotel.from).toLocaleDateString()}</p>
              
              <Button disabled={loading || alreadyBooked} variant="primary" className="mb-3" onClick={handleBooking}>
                {
                  loading
                  ? "Loading..."
                  : alreadyBooked
                  ? "Already Booked"
                  : auth && auth.token
                  ? "Book Now"
                  : "Login to Book"
                }
              </Button>

             
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SingleHotel;
