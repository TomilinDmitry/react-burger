import React from 'react';
import style from './style.module.css';
import bun_1 from '../../../images/ingredient preview.svg';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IOrderList } from '../../../services/get-order/slice';

type TIngredientELementProps = {
  order?:IOrderList
}
const IngredientElementStructure = ({order}:TIngredientELementProps) => {
  return (
    <div className={style.ingredientCard}>
      <img
        className={`${style.icons} ${style.element1}`}
        src={bun_1}
        alt="bun"
      />
      <p
        className={`${style.ingredientName} text text_type_main-default`}
      >
        {order?.order.number}
      </p>
      <p
        className={`${style.countIngredients} text text_type_main-default`}
      >
        2 x 20 <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

export default IngredientElementStructure;
