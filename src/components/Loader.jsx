import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <>
      <div className="layer position-fixed top-0 left-0 right-0 h-100 w-100 d-flex justify-content-center align-items-center">
        <img src="https://i.gifer.com/VAyR.gif" />
      </div>
    </>
  );
};

export default Loader;
