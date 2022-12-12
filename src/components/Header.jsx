import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';

const Header = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
      payload: null,
    });
    window.localStorage.clear();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <img
          alt="image"
          src="	https://hotelina-nextjs.vercel.app/assets/images/header-logo22.svg"
          style={{ width: '40px', height: '40px', marginRight: '10px' }}
        />
        <Link
          to="/"
          className="navbar-brand "
          style={{ color: 'rgb(60, 170, 159)' }}
        >
          Hotels.com
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="me-auto d-flex justify-content-end w-100 gap-2 ">
            <>
              <Link to="/" className="nav-link ">
                Home
              </Link>
              <Link to="/contact" className="nav-link ">
                Contact
              </Link>
              <Link to="/about" className="nav-link ">
                About us
              </Link>
            </>
            {auth && auth.token ? (
              <>
                <div style={{ width: '35px', height: '35px' }}>
                  <img
                    src="	https://multiavatar.com/img/logo-animated.gif?v=003"
                    alt="profileImage"
                    className="w-100 h-100"
                  />
                </div>
                <NavDropdown align="end">
                  <NavDropdown.Item className="d-block  py-1 text-xs text-gray-400 b-1 ">
                    {' '}
                    {auth.user.name}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/bookings">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="nav-link border px-5 bg-dark text-white rounded btn"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-link border px-5 bg-dark text-white rounded btn"
                >
                  Register
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
