import React, { ReactNode, useEffect } from 'react';
import style from './modal.module.css';
import PortalReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export type TModalProps = {
  children: ReactNode;
  close: () => void;
  title?: string;
  isDirectLink?: boolean;
};
const Modal = ({
  children,
  close,
  title,
  isDirectLink,
}: TModalProps) => {
  const pressKeyEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener('keydown', pressKeyEsc);
    return () => {
      document.removeEventListener('keydown', pressKeyEsc);
    };
  }, []);
  const modalRoot = document.getElementById('modal');
  return PortalReactDOM.createPortal(
    <div
      className={`${style.container} ${
        isDirectLink ? style.directLinkModal : ''
      }`}
    >
      <section className={style.overlayHeader}>
        <section className={style.title}>
          <h1>{title}</h1>
        </section>
        <section className={style.closeBtn} data-testid='closeIcon'>
          <CloseIcon onClick={close} type="primary" />
        </section>
      </section>
      {children}
      <ModalOverlay close={close} />
    </div>,
    modalRoot!,
  );
};

export default Modal;
