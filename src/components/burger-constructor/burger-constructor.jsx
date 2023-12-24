import React, { useMemo } from 'react';
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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { loading, orderName, error } = useSelector(
    (state) => state.order,
  );
  const { draggedElements,bun } = useSelector(
    (state) => state.container,
  );
  const checkBun = () =>{
    return(
      bun === null ? <p>Добавьте булки</p> : bun 
    )
  }
  const totalOrderPrice = useMemo(() => {
    if (bun === null){
      return draggedElements.reduce((sum, ing) => sum + ing.price,0);
    }else{
      return draggedElements.reduce((sum, ing) => sum + ing.price,bun.price*2);
    }
  }, [draggedElements,bun]);

  const onSubmitOrder = () => {
    dispatch(
      asyncOrder([
        ...draggedElements
      ]),
    );
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
    <aside className={style.container}>
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
      {orderName && (
        <Modal onClick={(e) => e.stopPropagation()}>
          <OrderDetails title="Детали заказа" />
        </Modal>
      )}
    </aside>
  );
}

BurgerConstructor.propTypes = {
  type: PropTypes.string,
  isLocked: PropTypes.bool,
  text: PropTypes.string,
  price: PropTypes.number,
  thumbnail: PropTypes.string,
  htmlType: PropTypes.string,
  size: PropTypes.string,
  title: PropTypes.string,
  ingredients: PropTypes.array,
};

export default BurgerConstructor;
