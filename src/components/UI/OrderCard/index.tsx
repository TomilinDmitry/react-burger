import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import style from './style.module.css';
import bun_1 from '../../../images/ingredient preview.svg';

import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Order,
  OrdersPayload,
} from '../../../services/get-order/slice';
import { useSelector } from '../../../utils/Types/hooks/typed-hooks';

interface IorderCardProps {
  showStatus?: boolean;
  order: Order;
}

const OrderCard = ({ showStatus, order }: IorderCardProps) => {
  const location = useLocation();
  const number = order.number;
  const ingredients = useSelector((state) => state.ingredients.data);
  const price = order.ingredients.reduce((acc, item) => {
    const foundIngredient = ingredients.find(
      (ingredient) => ingredient._id === item,
    );
    return acc + (foundIngredient!.price ?? 0) ;
  }, 0);
  return (
    <Link
      key={number}
      to={`/feed/${number}`}
      state={{ background: location }}
      className={style.link}
    >
      <div className={style.orderCard}>
        <p className={style.orderNumberBlock}>
          <span
            className={`text text_type_digits-default ${style.orderNumber}`}
          >
            #{order.number}
          </span>
          <span className={style.time}>
            <FormattedDate date={new Date(order.createdAt)} />
          </span>
        </p>
        <section className={style.titleOrderCard}>
          <span className="text text_type_main-medium">
            {order.name}
          </span>
          {showStatus && order.status && (
            <span
              className={`text text_type_main-medium ${style.orderStatus}`}
            >
              {order.status}
            </span>
          )}
        </section>
        <div className={style.ingredientsOrder}>
          <div className={style.ingredientIcons}>
            <img
              className={`${style.icons} ${style.element1}`}
              src={bun_1}
              alt="bun"
            />
          </div>
          <span
            className={`text text_type_digits-default ${style.orderPrice}`}
          >
            {price}
            <CurrencyIcon type="primary" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;
