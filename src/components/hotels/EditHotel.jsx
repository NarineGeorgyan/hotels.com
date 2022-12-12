import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { DatePicker } from 'antd';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getHotelById, updateHotel } from '../../actions/hotels';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import useLoader from '../../hook/useLoader';
import Notification from '../../components/Notification';
import { useFormik } from 'formik';
const { RangePicker } = DatePicker;

const EditHotel = () => {
  const { errorMessage } = useSelector((state) => ({ ...state.errorMessage }));
  const location = useLocation();
  const dispatch = useDispatch();
  const [loader, showLoader, hideLoader] = useLoader();
  const [locationValue, setLocationValue] = useState('');
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState(null);
  const [preview, setPreview] = useState(
    `${import.meta.env.VITE_APP_API}/hotel/image/${location.state.id}`
  );
  const getHotel = async () => {
    try {
      const res = await getHotelById(location.state.id);
      delete res.data.image;
      setLocationValue(res.data.location);
      setValues(res.data);
    } catch (err) {
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }
  };

  const handleImageChange = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('content', values.content);
      formData.append('location', locationValue);
      formData.append('price', values.price);
      formData.append('bed', values.bed);
      formData.append('from', values.from);
      formData.append('to', values.to);
      values.image && formData.append('image', values.image);

      const res = await updateHotel(token, formData, location.state.id);

      dispatch({ type: 'EDIT_SUCCESS', payload: 'Hotel edit success' });
    } catch (err) {
      hideLoader();
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center edit-image ">
        <h2
          style={{
            fontFamily: 'Sofia',
            letterSpacing: '3px',
            border: '5px solid white',
            padding: '5px 10px',
            fontWeight: '900',
          }}
          className="text-white"
        >
          Edit Hotel
        </h2>
      </div>
      {errorMessage ? (
        <Notification />
      ) : (
        values && (
          <Container className="mt-4 mb-4">
            <Row>
              <Col md={{ span: 4, offset: 2 }}>
                <label className="w-100 pointer">
                  <div style={{ maxWidth: '400px', height: '70vh' }}>
                    <img
                      src={preview}
                      alt="preview_image"
                      className="img img-fluid m-2  h-100"
                    />
                  </div>
                  <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    hidden
                  />
                </label>
              </Col>
              <Col md={{ span: 4 }}>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      type="text"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      as="textarea"
                      value={values.content}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <ReactGoogleAutocomplete
                      placeholder=""
                      className="form-control"
                      apiKey={import.meta.env.VITE_APP_GOOGLE_AUTOCOMPLETE}
                      onPlaceSelected={(place) => {
                        setLocationValue(place.formatted_address);
                      }}
                      defaultValue={locationValue}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      name="price"
                      type="number"
                      value={values.price}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Number of beds</Form.Label>
                    <Form.Select
                      name="bed"
                      className="mb-3"
                      value={values.bed}
                      onChange={handleChange}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="3">4</option>
                    </Form.Select>
                  </Form.Group>

                  <RangePicker
                    className="mb-3 w-100"
                    onChange={(date, dateString) => {
                      setValues({
                        ...values,
                        from: dateString[0],
                        to: dateString[1],
                      });
                    }}
                    defaultValue={[
                      moment(values.from, 'YYYY-MM-DD'),
                      moment(values.to, 'YYYY-MM-DD'),
                    ]}
                    format="YYYY-MM-DD"
                  />

                  <div>
                    <Button variant="dark w-100" type="submit">
                      Edit Changes
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
          </Container>
        )
      )}
      {loader}
    </>
  );
};

export default EditHotel;
