import React, { useEffect } from 'react';
import style from './order-info.module.css';

import { useLocation } from 'react-router-dom';
import FeedDetails from '../../../pages/feedDetails';


const OrderDetailsModal = () => {
  const location = useLocation();
  const isModalOnSite = location.state && location.state.background;

  return (
    <div
      className={`${
        isModalOnSite ? style.mainContainer : style.onLink
      }`}
    >
      <div className={style.modalContainerInfo}>
        <FeedDetails />
      </div>
    </div>
  );
};

export default OrderDetailsModal;
