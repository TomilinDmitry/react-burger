import React, { useMemo } from 'react';
import './bread.module.css';
import style from './bread.module.css';
import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';

const IngredientCard = (props) => {
  const { data } = useSelector((store) => store.ingredients);
  const { bun, draggedElements } = useSelector(
    (state) => state.container,
  );
  const ingredientId = props._id;
  const location = useLocation();

  const [, drag] = useDrag({
    type: props.type === 'bun' ? 'bun' : 'ingredient',
    item: props,
  });

  const setIngredientsCounters = useMemo(() => {
    const counters = {};

    data.forEach((ingredient) => {
      counters[ingredient._id] = counters[ingredient._id] || 0;
    });
    if (bun) counters[bun._id] = 2;

    draggedElements.forEach((el) => {
      if (el._id !== undefined) {
        counters[el._id]++;
      }
    });
    return counters;
  }, [data, bun, draggedElements]);

  return (
      <Link
        key={ingredientId}
        to={`/ingredients/${ingredientId}`}
        state={{ background: location }}
        className={style.link}
      >
    <section ref={drag} className={style.container}>
        {setIngredientsCounters[props._id] > 0 && (
          <Counter
            count={setIngredientsCounters[props._id]}
            size="default"
            extraClass="m-1"
          />
        )}
        <img src={props.image} alt={props.name} />

        <p
          className={`${style.paragraph} text text_type_digits-default m-1`}
        >
          {props.price}
          <CurrencyIcon type="primary" className="ml-4" />
        </p>
        <p className="text text_type_main-default">{props.name}</p>
    </section>
      </Link>
  );
};
IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default IngredientCard;
