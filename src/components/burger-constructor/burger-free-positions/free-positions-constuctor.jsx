import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import style from './free-positions.module.css';
import PropTypes from 'prop-types';
const ConstructorPositions = ({ ingredients, isOpen }) => {
  return (
    <ul className={style.container}>
      {ingredients.map((ingredient, index) => (
        <li
          onClick={() => isOpen}
          className={`${style.list} mb-4`}
          key={index}
        >
          <DragIcon type="primary" />
          <ConstructorElement
            isLocked={false}
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
          />
        </li>
      ))}
    </ul>
  );
};
ConstructorPositions.propTypes = {
  ingredients: PropTypes.array,
  isOpen: PropTypes.func,
};

export default ConstructorPositions;
