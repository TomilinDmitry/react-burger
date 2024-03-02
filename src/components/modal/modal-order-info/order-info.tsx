import React from 'react';
import style from './order-info.module.css';
import { useSelector } from '../../../utils/Types/hooks/typed-hooks';
import { useLocation } from 'react-router-dom';
import IngredientElementStructure from '../../UI/IngredientElementStructure';

const OrderDetailsModal = () => {
  const { orderList } = useSelector((store) => store.getOrderList);

  const number = window.location.pathname.split('/').pop();

  const selectedOrder = orderList.find(
    (order) => (order.order.number = number),
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
          // key={selectedOrder.order.id}
          className={style.modalContainerInfo}
        >
          {orderList.map((order) => (
            <IngredientElementStructure order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderDetailsModal;
