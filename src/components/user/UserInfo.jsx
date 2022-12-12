import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { useState, useEffect } from 'react';
import multiavatar from '@multiavatar/multiavatar/esm';

// Bootstrap
import { Card, Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { FiSettings } from 'react-icons/fi';

import {
  currencyFormatter,
  getAccountBalance,
  payoutSetting,
} from '../../actions/stripe';

const UserInfo = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { user, token } = auth;
  const [balance, setBalance] = useState(0);

  const handlePayoutSettings = async () => {
    try {
      const res = await payoutSetting(token);
      // console.log("RES FOR PAYOUT SETTING LINK", res);
      window.location.href = res.data.url;
    } catch (err) {
      console.log('Unable to access settings. Try again');
    }
  };

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  return (
    <Container className="mt-4 mb-4">
      <Row>
        <Col ms={4} className="mb-2">
          <div className="user-card">
            <div className="d-flex gap-3">
              <div>
                <Image
                  src={`https://api.multiavatar.com/${user.name[0]}.svg`}
                  className="rounded"
                  width="100"
                  height="100"
                />
              </div>
              <div>
                <h4>{user.name}</h4>
                <small>{user.email}</small> <br />
                <small>{`Joined ${moment(user.createdAt).fromNow()}`}</small>
              </div>
            </div>
          </div>
        </Col>
        {auth?.user?.stripe_seller?.charges_enabled && (
          <>
            <Col md={4} className="mb-2">
              <div className="user-card payment-image ">
                <div className="d-flex justify-content-end align-items-center gap-1 ">
                  <span className="h3 counter"> Account:</span>
                  {balance &&
                    balance.pending &&
                    balance.pending.map((bp, i) => (
                      <span key={i} className="text-dark p-4" c>
                        {currencyFormatter(bp)}
                      </span>
                    ))}
                </div>
              </div>
            </Col>
            <Col md={4} className="mb-2">
              <div className="user-card payout-card">
                <span
                  onClick={handlePayoutSettings}
                  className="pointer counter h3 d-inline-block"
                >
                  {' '}
                  Payouts:
                  <FiSettings className="h3" />
                </span>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};

export default UserInfo;
