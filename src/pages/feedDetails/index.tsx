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
import { fetchOrderById } from '../../services/users/action';
import IngredientElementStructure from '../../components/UI/IngredientElementStructure';
import { TElements } from '../../utils/Types/TElements';

const FeedDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const ingredients = useSelector((store) => store.ingredients.data);
  const bun =
    '643d69a5c3f7b9001cfa093c' || '643d69a5c3f7b9001cfa093d';
  const { number } = useParams() as { number: string };

  const selectedOrder = useSelector((state) => {
    let order = state.getOrderList.orders.find(
      (o) => o.number === +number,
    );
    if (order) {
      return;
    }
    order = state.getOrderProfileList.orders.find(
      (o) => o.number === +number,
    );
    if (order) {
      return;
    }

    return state.currentOrderSlice.order;
  });
  const selectedIngredientIds = selectedOrder?.ingredients;

  const idCounts: { [key: string]: number } = {};

  selectedIngredientIds?.forEach((id) => {
    if (id === bun) {
      idCounts[id] = idCounts[id] = 2;
    } else {
      idCounts[id] = (idCounts[id] || 0) + 1;
    }
  });
  const selectedIngredients = ingredients.filter((ingredient) =>
    selectedIngredientIds?.includes(ingredient._id),
  );

  const totalOrderPrice: number = useMemo(() => {
    return selectedIngredients.reduce(
      (sum: number, ing: TElements) =>
        sum + ing.price * idCounts[ing._id],
      0,
    );
  }, [selectedIngredients]);

  useEffect(() => {
    if (!selectedOrder) {
      dispatch(fetchOrderById(+number));
    }
  }, [dispatch]);
  const isModalOnSite = location.state && location.state.background;
  return (
    <div
      className={`${isModalOnSite ? style.container : style.onLink}`}
    >
      {selectedOrder ? (
        <>
          <p className={`text text_type_digits-default mb-10`}>
            #{number}
          </p>
          <p className={`text text_type_main-medium ${style.title}`}>
            {selectedOrder?.name}
          </p>
          <p
            className={`${style.status} text text_type_main-default`}
          >
            {selectedOrder?.status}
          </p>
          <p
            className={`text text_type_main-medium ${style.structure}`}
          >
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
                <FormattedDate
                  date={new Date(selectedOrder.createdAt)}
                />
              )}
            </span>
            <span>
              {totalOrderPrice} <CurrencyIcon type="primary" />
            </span>
          </p>
        </>
      ) : (
        <p>Ожидайте....</p>
      )}
    </div>
  );
};

export default FeedDetails;
