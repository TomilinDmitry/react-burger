import React, { useEffect } from 'react';
import style from './modal.module.css';
import PortalReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import PropTypes from 'prop-types';

const Modal = ({ children,closeOrderDetails,closeIngDetails,isOpen }) => {

  const keyDownEsc = (e) => {
    if (e.key === 'Escape') {
      if (isOpen){
        closeOrderDetails()
      }else{
        closeIngDetails()
      }
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', keyDownEsc);
    return () => {
      document.removeEventListener('keydown', keyDownEsc);
    };
  });
  const modalRoot = document.getElementById('modal');
  return PortalReactDOM.createPortal(
    <div className={style.container}>
      {children}

      <ModalOverlay isOpen={isOpen} closeOrderDetails={closeOrderDetails}  closeIngDetails={closeIngDetails}/>
    </div>,
    modalRoot,
  );
};
Modal.propTypes = {
  children: PropTypes.node,
  closeOrderDetails: PropTypes.func,
  closeIngDetails: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default Modal;
