import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { allHotels } from '../actions/hotels';
import { Link } from 'react-router-dom';
import HotelCard from '../components/cards/HotelCard';
import Col from 'react-bootstrap/Col';

const Hotels = () => {
  const [hotels, setHotels] = useState('');

  const getAllHotels = async () => {
    try {
      const res = await allHotels();
      if (res.data) {
        setHotels(res.data);
      }
    } catch (err) {
      toast.error("Err");
    }
  };

  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      {hotels && hotels.length ? (
        hotels.map((hotel) => (
          <Col key={hotel._id} md={3}>
            <Link
              to={`/hotels/${hotel._id}`}
              className="text-decoration-none text-dark"
            >
              <HotelCard hotel={hotel} />
            </Link>
          </Col>
        ))
      ) : (
        <span>No hotels found!</span>
      )}
    </>
  );
};

export default Hotels;
