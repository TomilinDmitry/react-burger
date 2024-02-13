import React from 'react';
import style from './modal-overlay.module.css';
interface ICloseFunction {
  close:()=> void;
}
const ModalOverlay = ({ close }:ICloseFunction) => {
  const handleClick = () => {
    close();
  };
  return (
    <div onClick={handleClick} className={style.modalContainer}></div>
  );
};

export default ModalOverlay;
