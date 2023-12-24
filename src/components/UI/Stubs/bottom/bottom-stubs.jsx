import React from 'react'
import style from './bottom-stubs.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setDraggedElements } from '../../../../services/burger-constructor/reducer';
const BottomStubs = () => {
  const dispatch = useDispatch();

  const {bun,draggedElement,draggedElements} = useSelector(
    (state) => state.container,
  );

  const handleDropMiddle = (e) => {
    e.preventDefault();
    const isElementInArray = draggedElements.some(
      (el) => el._id === draggedElement._id,
    );

    if (draggedElement && !isElementInArray) {
      dispatch(
        setDraggedElements([...draggedElements, draggedElement]),
      );
    }
  };
  return (
    <div
      onDrop={handleDropMiddle}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
    >
        {(bun) ? (   
      <div>
          <div draggable={true} key={bun.id} className={style.element}>
            <li className={`${style.list}`} key={bun.id}>
              <div className={style.listElement}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
              </div>
            </li>
          </div>
      </div>
    ):(
      <p>Выберите булки</p>
    )
    
    }
    </div>
  );
}

export default BottomStubs