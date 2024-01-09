import React, { useMemo, useState } from 'react';
import style from './constructor.module.css';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import PropTypes from 'prop-types';
import OrderDetails from '../modal/order-modal/order-modal';
import TopStubs from '../UI/Stubs/top/top-stubs';
import CenterStubs from '../UI/Stubs/center/center-stubs';
import BottomStubs from '../UI/Stubs/bottom/bottom-stubs';
import { useDispatch, useSelector } from 'react-redux';
import { asyncOrder } from '../../services/async-action/async-action-ingredient';
import {
  setBun,
  setDraggedElements,
} from '../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { loading, orderName, error } = useSelector(
    (state) => state.order,
  );
  const { draggedElements, bun } = useSelector(
    (state) => state.container,
  );
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
    dispatch(setDraggedElements([]));
    dispatch(setBun([]));
  };
  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      if (item.ingredient.type !== 'bun')
        dispatch(
          setDraggedElements([...draggedElements, item.ingredient]),
        );
    },
  });

  const totalOrderPrice = useMemo(() => {
    if (bun === null) {
      return draggedElements.reduce((sum, ing) => sum + ing.price, 0);
    } else {
      return draggedElements.reduce(
        (sum, ing) => sum + ing.price,
        bun.price * 2,
      );
    }
  }, [draggedElements, bun]);

  const onSubmitOrder = () => {
    if (bun && draggedElements.length > 0) {
      setIsOpen(true);
      dispatch(asyncOrder([...draggedElements]));
    } else {
      alert('Добавьте обязательные ингредиенты');
    }
  };

  if (loading) {
    return (
      <p
        className={`${style.loadingBlock} text text_type_main-large`}
      >
        <span>Ожидайте,ваш заказ формируется....</span>
      </p>
    );
  }

  if (error) {
    return (
      <p className={`${style.failedBlock} text text_type_main-large`}>
        Ошибка при формировании заказа:{error}
      </p>
    );
  }

  return (
    <aside ref={drop} className={style.container}>
      <section className="mb-4 ml-8">
        <TopStubs />
      </section>
      <section className={`${style.freePositionBlock} mb-4 ml-8`}>
        <CenterStubs />
      </section>
      <section className="pl-8">
        <BottomStubs />
      </section>
      <section className={style.bottomContainer}>
        <p className="text text_type_digits-medium mr-10">
          {totalOrderPrice} <CurrencyIcon type="primary" />
        </p>
        <Button
          onClick={onSubmitOrder}
          htmlType="button"
          type="primary"
          size="medium"
        >
          Оформить заказ
        </Button>
      </section>
      {isOpen && orderName && (
        <Modal
          onClick={(e) => e.stopPropagation()}
          title="Детали заказа"
          close={onClose}
        >
          <OrderDetails/>
        </Modal>
      )}
    </aside>
  );
}

BurgerConstructor.propTypes = {
  loading: PropTypes.bool,
  orderName: PropTypes.string,
  error: PropTypes.string,
};
export default BurgerConstructor;
