import React from 'react';
import style from './style.module.css';
import IngredientElementStructure from '../../components/UI/IngredientElementStructure';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router';
import { useSelector } from '../../utils/Types/hooks/typed-hooks';
import { TElements } from '../../utils/Types/TElements';
import { Order } from '../../services/get-order/slice';

type TOrder={
order:Order
}
const FeedDetails = ({order}:TOrder) => {
  const { orders } = useSelector(
    (store) =>
      store.getOrderList,
  );

  const number = window.location.pathname.split('/').pop();

  const selectedOrder = orders.find(
    (order) => order._id === number,
  );
  const location = useLocation();
  const isModalOnSite = location.state && location.state.background;

  const today = new Date();
  const yesterday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 1,
    today.getHours(),
    today.getMinutes() - 1,
    0,
  );
  return (
   <div
      className={`${
        isModalOnSite ? style.container : style.onLink
      }`}
    >
      {selectedOrder && (
        <>
      <p className={`text text_type_digits-default mb-10`}>#034533</p>
      <p className={`text text_type_main-medium ${style.title}`}>
        Black Hole Singularity острый бургер
      </p>
      <p className={`${style.status} text text_type_main-default`}>
        Выполнен
      </p>
      <p className={`text text_type_main-medium ${style.structure}`}>
        Состав:
      </p>
      <div className={style.burgerIngedientStructure}>
        {order.ingredients.map((ing)=>(
          <IngredientElementStructure key={ing} />
        ))}
      </div>
      <p className={style.orderTime}>
        <span className={style.time}>
          <FormattedDate date={yesterday} />
        </span>
        <span>
          510 <CurrencyIcon type="primary" />
        </span>
      </p>
      </>
      )}
    </div>
  );
};

export default FeedDetails;
