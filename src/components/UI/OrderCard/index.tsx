import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './style.module.css';
import bun_1 from '../../../images/ingredient preview.svg';
import { TElements } from '../../../utils/Types/TElements';
import { IGetOrder } from '../../../services/get-order/slice';
interface IorderCardProps {
  showStatus?: boolean;
  order: IGetOrder
}
const OrderCard = ({ showStatus, order }: IorderCardProps) => {
  return (
    <div className={style.orderCard}>
      <p className={style.orderNumberBlock}>
        <span
          className={`text text_type_digits-default ${style.orderNumber}`}
        >
          {order.number}
        </span>
        <span className={style.time}>
          <FormattedDate date={new Date()} />
        </span>
      </p>
      <section className={style.titleOrderCard}>
        <span className="text text_type_main-medium">{order.status}</span>
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
          <img
            className={`${style.icons} ${style.element2}`}
            src={bun_1}
            alt="bun"
          />
          <img
            className={`${style.icons} ${style.element3}`}
            src={bun_1}
            alt="bun"
          />
          <img
            className={`${style.icons} ${style.element4}`}
            src={bun_1}
            alt="bun"
          />
        </div>
        <span
          className={`text text_type_digits-default ${style.orderPrice}`}
        >
          480
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
