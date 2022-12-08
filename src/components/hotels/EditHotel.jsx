import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { DatePicker } from 'antd';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { getHotelById, updateHotel } from '../../actions/hotels';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import ReactGoogleAutocomplete from 'react-google-autocomplete';

const { RangePicker } = DatePicker;

const EditHotel = () => {
  const location = useLocation();

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
      console.error(err);
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
      toast.success('Hotel is updated!');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHotel();
  }, []);

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      {values && (
        <Container className="mt-4 mb-4">
          <Row>
            <Col md={{ span: 4, offset: 2 }}>
              <label className="w-100 pointer">
                <img
                  src={preview}
                  alt="preview_image"
                  className="img img-fluid m-2 w-100"
                />
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
                  {/* <Form.Control
                  name="location"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                /> */}
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
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default EditHotel;
