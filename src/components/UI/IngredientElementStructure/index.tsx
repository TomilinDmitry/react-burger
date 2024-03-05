import React from 'react';
import style from './style.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import { TElements } from '../../../utils/Types/TElements';

type TIngredientELementProps = {
  ing: TElements;
  count?: number;
};
const IngredientElementStructure = ({
  ing,
  count,
}: TIngredientELementProps) => {
  return (
    <div className={style.ingredientCard}>
      <img
        className={`${style.icons} ${style.element1}`}
        src={ing.image_mobile}
        alt="Ingredient"
      />
      <p
        className={`${style.ingredientName} text text_type_main-default`}
      >
        {ing.name}
      </p>
      <p
        className={`${style.countIngredients} text text_type_main-default`}
      >
        {count} x {ing.price} <CurrencyIcon type="primary" />
      </p>
    </div>
  );
};

export default IngredientElementStructure;
