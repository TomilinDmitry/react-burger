/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo } from 'react';
import style from './style.module.css';

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router';
import {
  useDispatch,
  useSelector,
} from '../../utils/Types/hooks/typed-hooks';
import IngredientElementStructure from '../../components/UI/IngredientElementStructure';
import { TElements } from '../../utils/Types/TElements';
import { fetchOrderById } from '../../services/get-order/action';

const FeedDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.data);
  const { number } = useParams<{ number: string }>();

  const selectedOrder = useSelector((state) => {
    let order = state.getOrderList.orders.find(
      (o) => o.number === Number(number),
    );
    if (order) {
      return order;
    }
    order = state.getOrderProfileList.orders.find(
      (o) => o.number === Number(number),
    );
    if (order) {
      return order;
    }

    return state.currentOrderSlice.order;
  });

  useEffect(() => {
    if (!selectedOrder) {
      dispatch(fetchOrderById(Number(number)));
    }
  }, []);

  if (!selectedOrder) {
    return <p>Загрузка...</p>;
  }

  const selectedIngredientIds = selectedOrder.ingredients;

  const bun =
    '643d69a5c3f7b9001cfa093c' || '643d69a5c3f7b9001cfa093d';
  const idCounts: { [key: string]: number } = (
    selectedIngredientIds || []
  ).reduce<{ [key: string]: number }>((acc, id) => {
    acc[id] = id === bun ? (acc[id] || 0) + 2 : (acc[id] || 0) + 1;
    return acc;
  }, {});

  const selectedIngredients = Array.from(
    new Set(selectedIngredientIds),
  ).map((id) =>
    ingredients.find((item) => item._id === id),
  ) as Array<TElements>;

  const totalOrderPrice: number = selectedIngredients.reduce(
    (sum, ing) => sum + ing.price * idCounts[ing._id],
    0,
  );

  const isModalOnSite = location.state && location.state.background;
  return (
    <div
      className={`${isModalOnSite ? style.container : style.onLink}`}
    >
      <p className={`text text_type_digits-default mb-10`}>
        #{number}
      </p>
      <p className={`text text_type_main-medium ${style.title}`}>
        {selectedOrder?.name}
      </p>
      <p className={`${style.status} text text_type_main-default`}>
        {selectedOrder?.status}
      </p>
      <p className={`text text_type_main-medium ${style.structure}`}>
        Состав:
      </p>

      <div
        className={`${
          isModalOnSite
            ? style.burgerIngedientStructure
            : style.onLinkStructure
        }`}
      >
        {selectedIngredients.map((ing) => (
          <IngredientElementStructure
            key={ing._id}
            ing={ing}
            count={idCounts[ing._id]}
          />
        ))}
      </div>
      <p className={style.orderTime}>
        <span className={style.time}>
          {selectedOrder?.createdAt && (
            <FormattedDate date={new Date(selectedOrder.createdAt)} />
          )}
        </span>
        <span>
          {totalOrderPrice} <CurrencyIcon type="primary" />
        </span>
      </p>
    </div>
  );
};

export default FeedDetails;
