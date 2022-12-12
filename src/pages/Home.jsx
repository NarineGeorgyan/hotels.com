import Hotels from '../components/Hotels';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Search from '../components/Search';
import Carusel from '../components/Carusel';

const Home = () => {
  return (
    <>
      <div className="position-relative">
        <Carusel />

        <Search />
      </div>
      <Hotels />
    </>
  );
};

export default Home;
