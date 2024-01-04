import React from 'react';
import style from './top-stubs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
  setDraggedElement,
  setDraggedElements,
} from '../../../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';
const TopStubs = () => {
  const dispatch = useDispatch();

  const { bun, draggedElement, draggedElements } = useSelector(
    (state) => state.container,
  );

  const [{ isHovered }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.ingredient.type === 'bun'){
        dispatch(setDraggedElement(item.ingredient, draggedElement));
      }
    }
  });
  return (
    <div
      ref={drop}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
    >
      {bun ? (
        <div>
          <div
            draggable={true}
            onDragStart={() => dispatch(setDraggedElement(bun, draggedElement))}
            key={bun.id}
            className={style.element}
          >
            <li className={`${style.list} mb-2`} key={bun.id}>
              <div className={style.listElement}>
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
                />
              </div>
            </li>
          </div>
        </div>
      ) : (
        <p>Выберите булки</p>
      )}
    </div>
  );
};

export default TopStubs;
