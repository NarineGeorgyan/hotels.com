import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { useNavigate } from 'react-router';
import moment from 'moment';
import useLoader from '../hook/useLoader';
const Search = ({ locationProps, dateProps, bedProps }) => {
  const [loader, showLoader, hideLoader] = useLoader();
  const arrDate = dateProps ? dateProps.split(',') : '';
  const navigate = useNavigate();
  const [location, setLocation] = useState(locationProps ? locationProps : '');
  const [date, setDate] = useState(arrDate);
  const [bed, setBed] = useState(bedProps ? bedProps : 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    showLoader();
    navigate(`/search-result?location=${location}&date=${date}&bed=${bed}`);
    hideLoader();
  };

  return (
    <>
      <Container className="search-container">
        <Row>
          <Col>
            <Form onSubmit={handleSubmit} className="row">
              <Form.Group className="mb-3 ant-picker ant-picker-range mb-3 col-md-3">
                <Form.Control
                  placeholder="Location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>

              <RangePicker
                className="mb-3 col-md-3"
                onChange={(value, dateString) => setDate(dateString)}
                format="YYYY-MM-DD"
                defaultValue={
                  date && [
                    moment(date[0], 'YYYY-MM-DD'),
                    moment(date[1], 'YYYY-MM-DD'),
                  ]
                }
              />

              <Form.Group className="mb-3 ant-picker ant-picker-range mb-3 col-md-3">
                <Form.Select
                  name="bed"
                  className="text-center text-muted"
                  value={bed}
                  onChange={(e) => setBed(e.target.value)}
                >
                  <option value="1">1 bed</option>
                  <option value="2">2 beds</option>
                  <option value="3">3 beds</option>
                  <option value="4">4 beds</option>
                </Form.Select>
              </Form.Group>

              <div className="col-md-3 ">
                <Button
                  variant="primary"
                  type="submit"
                  className="bg-dark text-white p-2 w-100 "
                >
                  Search
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      {loader}
    </>
  );
};

export default Search;
