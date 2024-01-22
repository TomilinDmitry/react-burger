import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import style from './center-stubs.module.css';
import { moveIngredient, deleteIngredient } from '../../../../services/burger-constructor/reducer';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const SortingIng = ({ index, ingredient }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, dragIng] = useDrag({
    type: 'item',
    item: { index },
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
      
      dispatch(moveIngredient({dragIndex, hoverIndex}));
      item.index = hoverIndex;
    },
  });


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
              handleClose={() => dispatch(deleteIngredient(ingredient.unId))}
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
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }).isRequired,
};
export default SortingIng;
