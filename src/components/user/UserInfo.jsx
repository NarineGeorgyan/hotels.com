import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import {useState, useEffect} from "react";

// Bootstrap
import { Card, Col } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import { FiSettings } from "react-icons/fi";

import { currencyFormatter, getAccountBalance, payoutSetting } from "../../actions/stripe";


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
      console.log("Unable to access settings. Try again");
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
          <Card body>
            <div className="d-flex gap-3">
              <div>
                <Image
                  src={`https://via.placeholder.com/70x70?text=${user.name[0]}`}
                  rounded
                />
              </div>
              <div>
                <h4>{user.name}</h4>
                <small>{user.email}</small> <br />
                <small>{`Joined ${moment(user.createdAt).fromNow()}`}</small>
              </div>
            </div>
          </Card>
        </Col>
        {auth?.user?.stripe_seller?.charges_enabled && (
          <>
            <Col md={4} className="mb-2">
              <Card body>Avaliable: {balance &&
                  balance.pending &&
                  balance.pending.map((bp, i) => (
                    <span key={i} className="lead">
                      {currencyFormatter(bp)}
                    </span>
                  ))}</Card>
            
              
            </Col>
            <Col md={4} className="mb-2">
              <Card body>Payouts
                <span onClick={handlePayoutSettings} className="bg-light pointer">
                  <FiSettings className="h5 pt-2" />
                </span>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};


export default UserInfo;
