import React, { useState } from 'react';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaEyeSlash, FaEye } from 'react-icons/fa';

const usePasswordToggle = () => {
  const [vissible, setVissible] = useState(false);
  //   const toggleIcon = (
  //     <FontAwesomeIcon
  //       icon={
  //         vissible
  //           ? { prefix: 'far', iconName: 'eye-slash' }
  //           : { prefix: 'far', iconName: 'eye' }
  //       }

  //       onclick={() => setVissible((vissible) => !vissible)}
  //     />
  //   );
  const toggleIcon = vissible ? (
    <FaEye onClick={() => setVissible((vissible) => !vissible)} />
  ) : (
    <FaEyeSlash onClick={() => setVissible((vissible) => !vissible)} />
  );
  const inputText = vissible ? 'text' : 'password';

  return [toggleIcon, inputText];
};
export default usePasswordToggle;
