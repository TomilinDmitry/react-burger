import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo } from 'react';
import style from './style.module.css';

import { Order } from '../../../services/get-order/slice';
import { useSelector } from '../../../utils/Types/hooks/typed-hooks';
import { TElements } from '../../../utils/Types/TElements';

interface IorderCardProps {
  showStatus?: string;
  order: Order;
}

const OrderCard = ({ showStatus, order }: IorderCardProps) => {
  const ingredients = useSelector((state) => state.ingredients.data);
  const selectedIngredientIds = order.ingredients;
  const selectedIngredients = ingredients.filter((ingredient) =>
    selectedIngredientIds?.includes(ingredient._id),
  );
  const bun = '643d69a5c3f7b9001cfa093c' || '643d69a5c3f7b9001cfa093d';
  const idCounts: { [key: string]: number } = (
      selectedIngredientIds || []
    ).reduce<{ [key: string]: number }>((acc, id) => {
      acc[id] = id === bun ? (acc[id] || 0) + 2 : (acc[id] || 0) + 1;
      return acc;
    }, {});

  const totalOrderPrice: number = useMemo(() => {
    return selectedIngredients.reduce(
      (sum: number, ing: TElements) =>
        sum + ing.price * idCounts[ing._id],
      0,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIngredients]);

  const firstSixElements = selectedIngredients.slice(0, 6);
  const otherElements = selectedIngredients.length - 6;
  return (
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
            {order.status === 'done' ? 'Готов' : 'Готовится'}
          </span>
        )}
      </section>
      <div className={style.ingredientsOrder}>
        <div className={style.ingredientIcons}>
          {firstSixElements.map((image, index) => {
            return (
              <img
                key={image._id}
                className={`${style.icons}`}
                src={image.image_mobile}
                alt="bun"
              />
            );
          })}
          {otherElements > 0 && (
            <span className={style.otherElements}>
              + {otherElements}
            </span>
          )}
        </div>
        <span
          className={`text text_type_digits-default ${style.orderPrice}`}
        >
          {totalOrderPrice}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};

export default OrderCard;
