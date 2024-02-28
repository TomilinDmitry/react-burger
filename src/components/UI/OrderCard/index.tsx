import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './style.module.css';
import bun_1 from '../../../images/ingredient preview.svg';
interface IorderCardProps {
  showStatus?: boolean;
  status?: string;
}
const OrderCard = ({ showStatus, status }: IorderCardProps) => {
  return (
    <div className={style.orderCard}>
      <p className={style.orderNumberBlock}>
        <span
          className={`text text_type_digits-default ${style.orderNumber}`}
        >
          #034535
        </span>
        <span className={style.time}>
          <FormattedDate date={new Date()} />
        </span>
      </p>
      <section className={style.titleOrderCard}>
        <span className="text text_type_main-medium">
          Death Star Starship Main бургер
        </span>
        {showStatus && status && (
          <span
            className={`text text_type_main-medium ${style.orderStatus}`}
          >
            {status}
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
