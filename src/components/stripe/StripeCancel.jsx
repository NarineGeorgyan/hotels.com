import { Link } from "react-router-dom";


const StripeCancel = () => {

  return (
    <div className="d-flex justify-content-center p-5">
        Error! Try again later! <br />
        <Link to="/"> Go To Homepage</Link>
    </div>
  );
};

export default StripeCancel;
