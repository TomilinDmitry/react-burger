import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import style from './center-stubs.module.css';
import { setDraggedElements } from '../../../../services/burger-constructor/reducer';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const SortingIng = ({ index, ingredient }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const { draggedElements } = useSelector((state) => state.container);
  const [{ isDragging }, dragIng] = useDrag({
    type: 'item',
    item: { type: 'item', index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  const [{ handlerId }, dropIng] = useDrop({
    accept: 'item',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
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
      if (typeof hoverIndex === 'number') {
        item.index = hoverIndex;
      }

      const moveIngredient = (dragIndex, hoverIndex) => {
        const dragIngredient = draggedElements[dragIndex];
        const newIngredients = [...draggedElements];
        newIngredients.splice(dragIndex, 1);
        newIngredients.splice(hoverIndex, 0, dragIngredient);
        dispatch(setDraggedElements(newIngredients));
      };
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
  dragIng(dropIng(ref));
  return (
    <div
      ref={ref}
      className={`${style.container}`}
      style={{ opacity }}
    >
      <div className={style.element}>
        <li className={`${style.list} mb-4`}>
          <DragIcon type="primary" />
          <div className={style.listElement}>
            <ConstructorElement
              isLocked={false}
              text={ingredient.name}
              price={ingredient.price}
              thumbnail={ingredient.image}
              handleClose={() => deleteIngredient(index)}
            />
          </div>
        </li>
      </div>
    </div>
  );
};
SortingIng.propTypes = {
  index: PropTypes.number.isRequired,
  ingredient: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
export default SortingIng;
