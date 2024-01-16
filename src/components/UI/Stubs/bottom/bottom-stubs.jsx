import React from 'react';
import style from './bottom-stubs.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';
const BottomStubs = () => {
  const { bun} = useSelector(
    (state) => state.container,
  );
  const dispatch = useDispatch();
  const [, drop] = useDrop({
    accept: 'bun',
    drop: item => {
      dispatch(setBun(item))
    },
  });
  return (
    <div ref={drop} className={style.container}>
      {bun ? (
        <div>
          <div key={bun.id} className={style.element}>
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
      ) : (
        <p>Выберите булки</p>
      )}
    </div>
  );
};

export default BottomStubs;
