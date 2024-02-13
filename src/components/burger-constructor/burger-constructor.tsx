import React, { FC, useMemo, useState } from 'react';
import style from './constructor.module.css';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import OrderDetails from '../modal/order-modal/order-modal';
import TopStubs from '../UI/Stubs/top/top-stubs';
import CenterStubs from '../UI/Stubs/center/center-stubs';
import BottomStubs from '../UI/Stubs/bottom/bottom-stubs';
import { useDispatch, useSelector } from 'react-redux';
import { asyncOrder } from '../../services/async-action/async-action-ingredient';
import {
  clearElements,
  setDraggedElements,
} from '../../services/burger-constructor/reducer';
import { useDrop } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../../utils/Types/TUser';
import { TElements } from '../../utils/Types/TElements';


export interface IRootState {
  order: {
    loading: boolean;
    orderName: string;
    error: string;
  };
  container: {
    draggedElements:TElements[];
    bun: TElements;
  };
  user: {
    user: TUser;
  };
}

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, orderName, error } = useSelector(
    (state:IRootState) => state.order,
  );

  const { draggedElements, bun } = useSelector(
    (state:IRootState) => state.container,
  );

  const { user } = useSelector((state:IRootState) => state.user);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onClose = () => {
    setIsOpen(false);
    //@ts-ignore
    dispatch(clearElements());
  };
  const [, drop] = useDrop({
    accept: 'ingredient',
    drop: (item) => {
      //@ts-ignore
      dispatch(setDraggedElements(item));
    },
  });

  const totalOrderPrice:number = useMemo(() => {
    if (bun === null) {
      return draggedElements.reduce((sum:number, ing:TElements) => sum + ing.price, 0);
    } else {
      return draggedElements.reduce(
        (sum:number, ing:TElements) => sum + ing.price,
        bun.price * 2,
      );
    }
  }, [draggedElements, bun]);

  const onSubmitOrder = () => {
    if (bun && draggedElements.length > 0) {
      setIsOpen(true);
      //@ts-ignore
      dispatch(asyncOrder([...draggedElements]));
    } else {
      alert('Добавьте обязательные ингредиенты');
    }
    if (!user) {
      alert('Войдите в аккаунт');
      navigate('/login');
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
          title="Детали заказа"
          close={onClose}
        >
          <OrderDetails />
        </Modal>
      )}
    </aside>
  );
}

export default BurgerConstructor;
