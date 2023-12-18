import React from 'react'
import style from './center-stubs.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setDraggedElement, setDraggedElements } from '../../../../services/burger-constructor/reducer';
const CenterStubs = () => {
  const dispatch = useDispatch()

  const {draggedElement,draggedElements } = useSelector(
    (state) => state.ingredients);
    
    const handleDropMiddle = (e) => {
      e.preventDefault();
      // Проверяем, что draggedElement не является null
      if (draggedElement) {
        // Обработка события окончания перетаскивания и перемещение элемента из "Начало" в "Середина"
        // Например, вызов соответствующего Redux action.
        dispatch(setDraggedElements([...draggedElements, draggedElement]));
        dispatch(setDraggedElement(null));
      }
    };
  return (
    <div onDrop={handleDropMiddle} onDragOver={(e) => e.preventDefault()} className={style.container}>
      {draggedElement && draggedElements.length > 0 ? (
        <div>
          {draggedElements.map((ingredient, index) => (
            <div key={index}>
              <ConstructorElement
                isLocked={false}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
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