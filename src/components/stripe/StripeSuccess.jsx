import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { stripeSuccessRequest } from "../../actions/stripe";

const StripeSuccess = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    
    stripeSuccessRequest(token, params.id).then((res) => {
      if (res.data.success) {
        navigate("/dashboard/bookings");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [params.id]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeSuccess;
