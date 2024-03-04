import React, { useEffect, useMemo } from 'react';
import style from './style.module.css';

import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useParams } from 'react-router';
import bun from '../../images/ingredient preview.svg';
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

  const ingredients = useSelector((store) => store.ingredients.data);

  const { number } = useParams();
  const selectedOrder = useSelector((state) => {
    if (number !== undefined) {
      let order = state.getOrderList.orders.find(
        (o) => o.number === +number,
      );
      return order;
    } else {
      return state.currentOrderSlice.order;
    }
  });
  const selectedIngredientIds = selectedOrder?.ingredients;

  const idCounts: { [key: string]: number } = {};

  selectedIngredientIds?.forEach((id) => {
    if (
      id === '643d69a5c3f7b9001cfa093d' ||
      id === '643d69a5c3f7b9001cfa093с'
    ) {
      idCounts[id] = (idCounts[id] || 0) + 2;
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
    if (!selectedOrder && number !== undefined) {
      dispatch(fetchOrderById(+number));
    } else {
      <p>Ожидайте....</p>;
    }
  }, []);
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
