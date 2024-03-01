import React from 'react';
import style from './style.module.css';
import IngredientElementStructure from '../../components/UI/IngredientElementStructure';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router';
import { useSelector } from '../../utils/Types/hooks/typed-hooks';

const FeedDetails = () => {
  // const { data } = useSelector(
  //   (store) =>
  //     store.ingredients,
  // );
  // const ingredientId = window.location.pathname.split('/').pop();

  // const selectedOrder = data.find(
  //   (ingredient) => ingredient._id === ingredientId,
  // );
  // const location = useLocation();

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
    <div className={style.container}>
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
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
        <IngredientElementStructure />
      </div>
      <p className={style.orderTime}>
        <span className={style.time}>
          <FormattedDate date={yesterday} />
        </span>
        <span>
          510 <CurrencyIcon type="primary" />
        </span>
      </p>
    </div>
  );
};

export default FeedDetails;
