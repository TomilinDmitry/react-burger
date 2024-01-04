import React, { useRef } from 'react';
import style from './center-stubs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {

  setDraggedElement,
  setDraggedElements,
} from '../../../../services/burger-constructor/reducer';
import { useDrag, useDrop } from 'react-dnd';
// import ConstructorPositions from '../../../burger-constructor/burger-free-positions/free-positions-constuctor';


const CenterStubs = ({index}) => {
  const dispatch = useDispatch();
  const { draggedElements,draggedElement} = useSelector(
    (state) => state.container,
  );
    const ref = useRef (null)

    const moveIngredient = (dragIndex, hoverIndex) => {
    const dragIngredient = draggedElements[dragIndex];
    const newIngredients = [...draggedElements];
    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragIngredient);
    dispatch(setDraggedElements(newIngredients));
  };

  const [{ isHovered }, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if(item.ingredient.type !== 'bun')
        dispatch(setDraggedElements([...draggedElements, item.ingredient]));
    }
  });

  const [{handlerId}, dropIng] = useDrop({
    accept: 'item',
    collect:(monitor) =>{
      return{
        handlerId:monitor.getHandlerId()
      }
    },
    hover: (item,monitor) => {
      if(!ref.current){
        return
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const deleteIngredient = (index) => {
    dispatch(
      setDraggedElements(
        draggedElements.filter((e, i) => i !== index),
      ),
    );
  };

  const [, dragIng] = useDrag({
    type: 'item',
    item:{type: 'item', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

 dragIng(dropIng(ref));
  
  return (
    <div
     ref={drop}
      className={style.container}
    >
        {draggedElements.length > 0 ?(    
      <div >
        {draggedElements.map((ingredient, index) => (
          <div ref={ref} key={index} className={style.element}>
            <li  className={`${style.list} mb-4`} key={index}>
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
