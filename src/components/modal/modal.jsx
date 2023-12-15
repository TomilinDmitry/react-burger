import React, { useEffect } from 'react';
import style from './modal.module.css';
import PortalReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useDispatch} from 'react-redux';
import { orderClose } from '../../services/burger-constructor/order-details/action';
import { setSelectedIngredient } from '../../services/burger-ingredients/ingredient-details/reducer';

const Modal = ({ children }) => {
  const dispatch = useDispatch();
  const KeyDown = (e) => {
    if (e.key === 'Escape') {
      dispatch(setSelectedIngredient(null));
      dispatch(orderClose());
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', KeyDown);
    return () => {
      document.removeEventListener('keydown', KeyDown);
    };
  });
  const modalRoot = document.getElementById('modal');
  return PortalReactDOM.createPortal(
    <div className={style.container}>
      {children}

      <ModalOverlay />
    </div>,
    modalRoot,
  );
};
Modal.propTypes = {
  children: PropTypes.any,
};
export default Modal;
