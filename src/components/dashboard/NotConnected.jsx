import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { BiHomeAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { createConnectAccount } from '../../actions/stripe';

const NotConnected = () => {
  // Will be deleted
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      window.location.href = res.data;
    } catch (err) {
      toast.error('Stripe connect failed, Try again.');
      setLoading(false);
    }
  };
  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }} className="text-center">
          <div className="p-5 pointer">
            <BiHomeAlt className="h1" />
            <h4>Setup payouts to post hotel rooms</h4>
            <p className="lead">
              <strong>HotelBooking.am</strong> partners with stripe to transfer
              earnings to your bank accout
            </p>
            <button
              className="btn btn-primary mb-3"
              onClick={submitHandler}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Setup Payouts'}
            </button>
            <p className="text-muted">
              <small>
                You'll be redirected to Stripe to complete the onboarding
                process.
              </small>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default NotConnected;
