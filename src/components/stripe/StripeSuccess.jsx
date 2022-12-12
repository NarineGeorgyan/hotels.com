import { useEffect } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { stripeSuccessRequest } from '../../actions/stripe';
import useLoader from '../../hook/useLoader';
const StripeSuccess = () => {
  const [loader, showLoader, hideLoader] = useLoader();
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    showLoader();

    stripeSuccessRequest(token, params.id).then((res) => {
      showLoader();
      if (res.data.success) {
        navigate('/dashboard/bookings');
      } else {
        navigate('/stripe/cancel');
      }
      hideLoader();
    });
  }, [params.id]);

  return (
    <div className="d-flex justify-content-center p-5">
      <LoadingOutlined className="display-1 p-5 text-danger" />
      {loader}
    </div>
  );
};

export default StripeSuccess;
