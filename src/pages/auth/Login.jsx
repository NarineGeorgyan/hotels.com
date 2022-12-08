import { login } from '../../actions/auth/auth';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// Bootstrap
import { Container, Button, Form, Row, Col } from 'react-bootstrap';

import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';
//formik
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string().required('Required'),
  email: Yup.string().email('invalid email format').required('Required'),
  password: Yup.string().min(8, 'Must be 8 characters').required('Required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema,
  });

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginHandler = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(formik.values);
    try {
      const response = await login(formik.values);
      setTimeout(() => {
        navigate('/dashboard/bookings');
      }, 1000);
      if (response.data) {
        window.localStorage.setItem('auth', JSON.stringify(response.data));
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: response.data,
        });
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row className="bg-image d-flex align-items-center justify-content-center">
        <div className="image-layout"></div>
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

            <Form.Group className="mb-3">
              <Form.Label className="h5 text-white">Password:</Form.Label>
              <Form.Control
                type="password"
                className="bg-transparent"
                name="password"
                {...formik.getFieldProps('password')}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-danger h5">{formik.errors.password}</div>
              ) : null}
            </Form.Group>

            <Button
              variant="dark"
              className="mt-4 w-100 "
              type="submit"
              // disabled={!formik.isValid && formik.dirty}
            >
              {/* {loading && (
                <Spinner animation="border" className="spinner-custom" />
              )} */}
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
      </Row>
    </Container>
  );
};

export default Login;
