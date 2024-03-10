import React from 'react';
import style from './top-stubs.module.css';
import {
  useSelector,
  useDispatch,
} from '../../../../utils/Types/hooks/typed-hooks';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { setBun } from '../../../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';
import { TElements } from '../../../../utils/Types/TElements';
const TopStubs = () => {
  const dispatch = useDispatch();

  const { bun } = useSelector((state) => state.container);

  const [, drop] = useDrop({
    accept: 'bun',
    drop: (item: TElements) => {
      dispatch(setBun(item));
    },
  });
  return (
    <div
      ref={drop}
      onDragOver={(e) => e.preventDefault()}
      className={style.container}
      data-testid="targetBlock"
    >
      {bun ? (
        <div>
          <div className={style.element}>
            <li className={`${style.list} mb-2`} key={bun.id}>
              <div
                className={style.listElement}
                data-testid="targetIng"
              >
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
