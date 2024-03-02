import React from 'react';
import style from './order-info.module.css';
import { useSelector } from '../../../utils/Types/hooks/typed-hooks';
import { useLocation } from 'react-router-dom';
import IngredientElementStructure from '../../UI/IngredientElementStructure';
import FeedDetails from '../../../pages/feedDetails';

const OrderDetailsModal = () => {
  const { orders } = useSelector((store) => store.getOrderList);

  const number = window.location.pathname.split('/').pop();

  const selectedOrder = orders.find(
    (order) => order.number === number,
  );
  const location = useLocation();
  const isModalOnSite = location.state && location.state.background;

  return (
    <div
      className={`${
        isModalOnSite ? style.mainContainer : style.onLink
      }`}
    >
      {selectedOrder && (
        <div
          key={selectedOrder._id}
          className={style.modalContainerInfo}
        >
          <FeedDetails order={selectedOrder} />
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;
