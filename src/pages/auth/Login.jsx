import React from 'react';
import Notification from '../../components/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
// Bootstrap
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import usePasswordToggle from '../../hook/usePasswordToggle';
import { login } from '../../actions/auth/auth';
import useLoader from '../../hook/useLoader';

//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const { errorMessage } = useSelector((state) => ({ ...state.errorMessage }));
  const [toggleIcon, inputText] = usePasswordToggle(false);
  const [loader, showLoader, hideLoader] = useLoader();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string().email('invalid email format').required('Required'),
    password: Yup.string().min(8, 'Must be 8 characters').required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
  });

  const loginHandler = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await login(formik.values);

      navigate('/dashboard/bookings');

      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      hideLoader();
      dispatch({ type: 'FAILED_ACTION', payload: err });
    }
  };

  return (
    <>
      <Container fluid>
        <Row className="bg-image d-flex align-items-center justify-content-center">
          <div className="image-layout"></div>
          {errorMessage ? (
            <Notification />
          ) : (
            <Col md={4} xs={6} className="form p-3 ">
              <h2 className="h1 text-white text-center mb-3"> Sign in</h2>
              <Form onSubmit={loginHandler}>
                <Form.Group className="mb-3">
                  <Form.Label className="h5 text-white">Email:</Form.Label>
                  <Form.Control
                    type="email"
                    className="bg-transparent"
                    name="email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger h5">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>

                <Form.Group className="mb-3 ">
                  <Form.Label className="h5 text-white">Password:</Form.Label>
                  <Col className="position-relative">
                    <Form.Control
                      type={inputText}
                      className="bg-transparent "
                      name="password"
                      {...formik.getFieldProps('password')}
                    />

                    <span className="eye-icon">{toggleIcon}</span>
                  </Col>
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger h5">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </Form.Group>
                <Button
                  variant="dark"
                  type="submit"
                  disabled={!formik.isValid && formik.dirty}
                  className="mt-4 w-100 "
                >
                  <span className="h4"> Sign in</span>
                </Button>
                <p className="mt-4 text-center">
                  <small className="text-white h6 opacity-75">
                    Not a member?
                    <Link
                      to="/register"
                      className="reg-nav nav-link d-inline-block text-decoration-none pointer text-white p-1"
                    >
                      Sign Up
                    </Link>
                  </small>
                </p>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
      {loader}
    </>
  );
};

export default Login;
