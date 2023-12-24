import React from 'react';
import style from './center-stubs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {

  setDraggedElements,
} from '../../../../services/burger-constructor/reducer';
// import ConstructorPositions from '../../../burger-constructor/burger-free-positions/free-positions-constuctor';
const CenterStubs = () => {
  const dispatch = useDispatch();

  const { draggedElement, draggedElements} = useSelector(
    (state) => state.container,
  );

  const handleDropMiddle = (e) => {
    e.preventDefault();
    // const isElementInArray = draggedElements.some(
    //   (el) => el._id === draggedElement._id,
    // );

    if (draggedElement ) {
      dispatch(
        setDraggedElements([...draggedElements, draggedElement]),
      );
    }
  };
  const deleteIngredient = (index) => {
    dispatch(
      setDraggedElements(
        draggedElements.filter((e, i) => i !== index),
      ),
    );
  };
  return (
    <div
      onDrop={handleDropMiddle}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
    >
        {draggedElements.length > 0 ?(    
      <div>
        {draggedElements.map((ingredient, index) => (
          <div draggable={true} key={index} className={style.element}>
            <li className={`${style.list} mb-4`} key={index}>
              <DragIcon type="primary" />
              <div className={style.listElement}>
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
                handleClose={()=>deleteIngredient(index)}
              />
              </div>
            </li>
          </div>
        ))}
      </div>
        ) : (
          <p>Выберите начинку</p>
        )}
    </div>
  );
};

export default CenterStubs;
