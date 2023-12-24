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
const TopStubs = () => {
  const dispatch = useDispatch();

  const { bun, draggedElement, draggedElements } = useSelector(
    (state) => state.container,
  );

  const handleDropMiddle = (e) => {
    e.preventDefault();

    // if (draggedElement) {
    //   dispatch(
    //     setDraggedElements([...draggedElements, draggedElement]),
    //   );
    // }
  };
  const handleDragStart = (e) => {
    // Предотвращаем стандартное поведение drag-and-drop браузера
    e.preventDefault();
    // Устанавливаем данные о перетаскиваемом элементе
    dispatch(setDraggedElement(bun,draggedElement));
  };
  return (
    <div
      // onDrop={handleDropMiddle}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
    >
      {bun ? (
        <div>
          <div
            draggable={true}
            onDragStart={handleDragStart}
            onDrop={handleDropMiddle}
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
