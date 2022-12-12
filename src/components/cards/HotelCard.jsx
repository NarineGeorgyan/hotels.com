import Card from 'react-bootstrap/Card';

import { BiBed } from 'react-icons/bi';
import { BiCalendarAlt } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { diffDays } from '../../actions/hotels';
import moment from 'moment/moment';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

const HotelCard = ({
  hotel,
  isOwner = true,
  setSmShow,
  setId,
  showLoader,
  hideLoader,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navigateToEdit = (e) => {
    showLoader();
    e.preventDefault();
    try {
      let timer = setTimeout(() => {
        hideLoader();
        navigate('/hotels/edit', { state: { id: hotel._id } });
      }, 1000);
    } catch (err) {
      hideLoader();
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }
    return () => clearTimeout(timer);
  };

  const openDeleteModal = (e) => {
    try {
      showLoader();
      e.preventDefault();
      setSmShow(true);
      setId(hotel._id);
      let timer = setTimeout(() => {
        hideLoader();

        console.log('timer');
      }, 1000);
    } catch (err) {
      hideLoader();
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }

    return () => clearInterval(timer);
  };
  console.log('cards');
  return (
    <>
      <Card className="mb-4">
        <Card.Img
          className="position-relative w-100 h-100"
          variant="top"
          src={`${import.meta.env.VITE_APP_API}/hotel/image/${hotel._id}`}
        />
        <Card.Body>
          <Card.Title className="card-title position-absolute price text-white rounded-2 ">
            $ {hotel.price}
          </Card.Title>
          <Card.Title className="card-title hotel-title">{hotel.title}</Card.Title>
          <Card.Text className="mb-2">
            <GoLocation />
            {hotel.location}
          </Card.Text>
          <Card.Text className="mb-2">
            <BiCalendarAlt />
            for {diffDays(hotel.from, hotel.to)}{' '}
            {diffDays(hotel.from, hotel.to) <= 1 ? ' day' : ' days'}
          </Card.Text>
          <Card.Text className="mb-2">
            <BiBed /> {hotel.bed} bed
          </Card.Text>
          <Card.Text className="text-muted mb-1 ">
            <small>
              Available from {new Date(hotel.from).toLocaleDateString()}
            </small>
          </Card.Text>
          <Card.Text className="text-muted ">
            <small>
              <i>Posted {moment(hotel.createdAt).fromNow()}</i>
            </small>
          </Card.Text>
          {isOwner && (
            <div className="d-flex gap-2">
              <Button
                onClick={navigateToEdit}
                className=" bg-dark text-white w-50"
              >
                Edit
              </Button>
              <Button
                variant="primary"
                onClick={openDeleteModal}
                className="bg-dark text-white w-50 "
              >
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default HotelCard;
