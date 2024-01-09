import React, { useEffect } from 'react';
import style from './modal.module.css';
import PortalReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const Modal = ({
  children,
  close,
  title
}) => {
  const keyDownEsc = (e) => {
    if (e.key === 'Escape') {
      close()
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
     <section className={style.overlayHeader}>
				<section className={style.title}>
					<h1>{title}</h1>
				</section>
				<section  className={style.closeBtn}>
					<CloseIcon onClick={close} type="primary" />
				</section>
			</section>
            {children}
      <ModalOverlay
     close={close}
      />
    </div>,
    modalRoot,
  );
};
Modal.propTypes = {
  children: PropTypes.node,
  close: PropTypes.func,
  title:PropTypes.string,
};

export default Modal;
