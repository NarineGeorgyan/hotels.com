import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
// ####
import PrivateRoute from './components/PrivateRoute';
// Components
import Header from './components/Header';
import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import About from './pages/About';
import Contact from './pages/Contact';
import SingleHotel from './components/hotels/SingleHotel';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Seller from './components/Seller';
import Bookings from './components/Bookings';
import AddHotel from './components/hotels/AddHotel';
import EditHotel from './components/hotels/EditHotel';
import SearchResult from './pages/SearchResult';
import StripeCallback from './components/stripe/StripeCallback';
import StripeSuccess from './components/stripe/StripeSuccess';
import StripeCancel from './components/stripe/StripeCancel';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/bookings" element={<Bookings />} />
          <Route path="/dashboard/seller" element={<Seller />} />
        </Route>
        <Route path="/hotels/:id" element={<SingleHotel />} />
        <Route
          path="/hotels/new"
          element={
            <PrivateRoute>
              <AddHotel />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotels/edit"
          element={
            <PrivateRoute>
              <EditHotel />
            </PrivateRoute>
          }
        />
        <Route
          path="/stripe/success/:hotelId"
          element={
            <PrivateRoute>
              <StripeSuccess />
            </PrivateRoute>
          }
        />
        <Route
          path="/stripe/cancel"
          element={
            <PrivateRoute>
              <StripeCancel />
            </PrivateRoute>
          }
        />
        <Route path="/search-result" element={<SearchResult />} />
        <Route
          path="/stripe/callback"
          element={
            <PrivateRoute>
              <StripeCallback />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
