import React, { useRef } from 'react';
import {
  DragSourceHookSpec,
  DropTargetMonitor,
  useDrag,
  useDrop,
} from 'react-dnd';
import { useDispatch } from 'react-redux';
import style from './center-stubs.module.css';
import {
  moveIngredient,
  deleteIngredient,
} from '../../../../services/burger-constructor/reducer';
import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { TElements } from '../../../../utils/Types/TElements';

type TSortingIngProps = {
  index: number;
  ingredient: TElements;
};
type TDragObject = Pick<TSortingIngProps, 'index'>

type TDragCollectedProps = {
  isDragging:boolean
}

const SortingIng = ({ index, ingredient }: TSortingIngProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [{ isDragging }, dragIng] = useDrag<TDragObject,unknown,TDragCollectedProps>({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  const [{handlerId}, dropIng] = useDrop({
    accept: 'item',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: { index: number }, monitor: DropTargetMonitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex: number = item.index;
      const hoverIndex: number = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // @ts-ignore
      dispatch(moveIngredient({ dragIndex, hoverIndex }));
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
              // @ts-ignore
              handleClose={() =>
                // @ts-ignore
                dispatch(deleteIngredient(ingredient.unId))
              }
            />
          </div>
        </li>
      </div>
    </div>
  );
};
export default SortingIng;
