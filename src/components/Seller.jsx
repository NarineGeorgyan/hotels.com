import { useSelector } from 'react-redux';
import Connected from './dashboard/Connected';
import NotConnected from './dashboard/NotConnected';

const Seller = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <>
      {auth?.user?.stripe_seller?.charges_enabled ? (
        <Connected />
      ) : (
        <NotConnected />
      )}
    </>
  );
};

export default Seller;
