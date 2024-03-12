import React from 'react';
import style from './ingridient-details.module.css';
import { useSelector } from '../../../utils/Types/hooks/typed-hooks';
import { useLocation, useParams } from 'react-router-dom';

const IngredientDetails = () => {
  const { data } = useSelector((store) => store.ingredients);

  // const ingredientId = window.location.pathname.split('/').pop();
  const { ingredientId } = useParams<{ ingredientId: string }>();
  const selectedIngredient = data.find(
    (ingredient) => ingredient._id === ingredientId,
  );
  const location = useLocation();
  const isModalOnSite = location.state && location.state.background;

  return (
    <div
      className={`${
        isModalOnSite ? style.mainContainer : style.onLink
      }`}
    >
      {selectedIngredient && (
        <div
          key={selectedIngredient._id}
          className={style.modalContainerInfo}
        >
          <h1>Детали ингредиента</h1>
          <section className="mb-4">
            <img
              src={selectedIngredient.image}
              alt={selectedIngredient.name}
            />
          </section>
          <p
            className={`${style.nameProduct} text text_type_main-medium mb-8`}
          >
            <span>{selectedIngredient.name}</span>
          </p>

          <div
            className={`${style.textBlock} text text_type_main-medium mb-15`}
          >
            <p className={style.block}>
              <span>Калории,ккал</span>
              <span>{selectedIngredient.calories}</span>
            </p>
            <p className={style.block}>
              <span>Белки,г</span>
              <span>{selectedIngredient.proteins}</span>
            </p>
            <p className={style.block}>
              <span>Жиры,г</span>
              <span>{selectedIngredient.fat}</span>
            </p>
            <p className={style.block}>
              <span>Углеводы,г</span>
              <span>{selectedIngredient.carbohydrates}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientDetails;
