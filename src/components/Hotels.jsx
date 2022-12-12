import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { allHotels } from '../actions/hotels';
import { Link } from 'react-router-dom';
import HotelCard from '../components/cards/HotelCard';
import Col from 'react-bootstrap/Col';
import useLoader from '../hook/useLoader';
import { Container, Row } from 'react-bootstrap';
import Pagginashion from '../components/Paggination';
import Notification from '../components/Notification';
const Hotels = () => {
  const [hotels, setHotels] = useState('');
  const { errorMessage } = useSelector((state) => ({ ...state.errorMessage }));
  const [loader, showLoader, hideLoader] = useLoader();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelPerPage] = useState(10);
  const indexOfLastPage = currentPage * hotelPerPage;
  const indexOfFirstPost = indexOfLastPage - hotelPerPage;
  const currentPost = hotels.slice(indexOfFirstPost, indexOfLastPage);

  const paginateHandler = (number) => {
    setCurrentPage(number);
  };
  const changeStepNext = () => {
    setCurrentPage((prv) => prv + 1);
  };
  const changeStepPrev = () => {
    setCurrentPage((prv) => prv - 1);
  };

  const getAllHotels = async () => {
    showLoader();
    try {
      const response = await allHotels();
      if (response.data) {
        setHotels(response.data);
        dispatch({ type: 'ALL_HOTELS', payload: response.data });
      }
      hideLoader();
    } catch (err) {
      hideLoader();
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }
  };
  const memofunc = () => {
    console.log('hi');
  };
  useEffect(() => {
    getAllHotels();
  }, []);

  return (
    <>
      {errorMessage ? (
        <Notification />
      ) : (
        <Container style={{ marginTop: '130px' }}>
          <Row>
            {hotels && hotels.length ? (
              currentPost.map((hotel) => (
                <Col key={hotel._id} md={3} className="p-2">
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-decoration-none text-dark"
                  >
                    <HotelCard
                      hotel={hotel}
                      showLoader={showLoader}
                      hideLoader={hideLoader}
                    />
                  </Link>
                </Col>
              ))
            ) : (
              <span>No hotels found!</span>
            )}

            <div className="d-flex gap-2 justify-content-center">
              <button className="page-link" onClick={changeStepNext}>
                next
              </button>
              <Pagginashion
                number={hotelPerPage}
                paginateHandler={paginateHandler}
                currentPage={currentPage}
              />
              <button className="page-link" onClick={changeStepPrev}>
                prev
              </button>
            </div>
          </Row>
        </Container>
      )}
      {loader}
    </>
  );
};

export default Hotels;
