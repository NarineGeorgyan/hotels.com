import React from 'react';
import { Container, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import Notification from '../../components/Notification';
import usePasswordToggle from '../../hook/usePasswordToggle';
import useLoader from '../../hook/useLoader';
import { register } from '../../actions/auth/auth';
//formilk
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Register = () => {
  const { errorMessage } = useSelector((state) => ({ ...state.errorMessage }));
  const [toggleIcon, inputText] = usePasswordToggle(false);
  const [loader, showLoader, hideLoader] = useLoader();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('invalid email format').required('Required'),
    password: Yup.string().min(6, 'Must be 6 characters').required('Required'),
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema,
  });

  const registerHandler = async (e) => {
    e.preventDefault();
    showLoader();
    try {
      const response = await register(formik.values);
      navigate('/login');
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
            <Col md={4} className="form p-3">
              <div className="h1 text-white text-center mb-4">Sign Up</div>
              <div className="social-icons">
                <pre>{formik.valid}</pre>
                <FaFacebook />
                <FaGoogle />
                <FaTwitter />
              </div>
              <p className="text-dark text-center h6">
                or use your email for registration.
              </p>
              <Form onSubmit={registerHandler}>
                <Form.Group className="mb-3">
                  <Form.Label className="h5 text-white">Name</Form.Label>
                  <Form.Control
                    type="text"
                    className="bg-transparent"
                    name="name"
                    {...formik.getFieldProps('name')}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-danger h5">{formik.errors.name}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="h5 text-white">Email</Form.Label>
                  <Form.Control
                    type="email"
                    className="bg-transparent mb-2"
                    name="email"
                    {...formik.getFieldProps('email')}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger h5">{formik.errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="h5 text-white">Password</Form.Label>
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
                  <span className="h4"> Sign up</span>
                </Button>
                <p className="mt-4 text-center">
                  <small className="text-white h6 opacity-75">
                    Already have an account?
                    <Link
                      to="/login"
                      className="reg-nav nav-link d-inline-block text-decoration-none pointer text-white p-1 "
                    >
                      Sign in
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

export default Register;
