import React from 'react';
import style from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({
 close
}) => {
  const handleClick = () => {
   close()
  };
  return (
    <div onClick={handleClick} className={style.modalContainer}></div>
  );
};
ModalOverlay.propTypes = {
  close: PropTypes.func,
};
export default ModalOverlay;
