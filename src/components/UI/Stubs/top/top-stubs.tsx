import React from 'react';
import style from './top-stubs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';
import { IStubs } from '../bottom/bottom-stubs';
const TopStubs = () => {
  const dispatch = useDispatch();

  const { bun } = useSelector((state: IStubs) => state.container);

  const [, drop] = useDrop({
    accept: 'bun',
    drop: (item) => {
      // @ts-ignore
      dispatch(setBun(item));
    },
  });
  return (
    <div
      ref={drop}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
    >
      {bun ? (
        <div>
          <div className={style.element}>
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
