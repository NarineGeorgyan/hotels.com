import { useState } from 'react';
import Loader from '../components/Loader';

const useLoader = () => {
  const [loading, setLoading] = useState(false);
  return [
    loading ? <Loader /> : null,
    () => setLoading(true),
    () => setLoading(false),
  ];
};
export default useLoader;
