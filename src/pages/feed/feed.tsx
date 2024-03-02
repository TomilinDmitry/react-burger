import React from 'react';
import style from './feed.module.css';
import OrderCard from '../../components/UI/OrderCard';
import { useSelector } from '../../utils/Types/hooks/typed-hooks';
const Feed = () => {
  const { orders, total, totalToday } = useSelector(
    (state) => state.getOrderList,
  );
  return (
    <div className={style.container}>
      <section className={style.title}>Лента заказов</section>
      <div className={style.mainContainer}>
        <div className={style.orderBlock}>
          {orders.map((order) => (
            <OrderCard order={order} key={order._id} />
          ))}
        </div>
        <div className={style.orderCounter}>
          <div className={style.readyAndAtWorkOrders}>
            <div className={style.readyOrder}>
              <span className={style.titleReadyOrder}>Готовы:</span>
              <p className={style.orderList}>
                {orders.slice(-10).map((order) => (
                  <span
                    className="text text_type_digits-default"
                    key={order._id}
                  >
                    {order.number}
                  </span>
                ))}
              </p>
            </div>
            <div className={style.atWork}>
              <span className={style.titleReadyOrder}>Готовятся:</span>
              <p className={style.orderListAtWork}>
                {orders.slice(-10).map((order) => (
                  <span
                    className="text text_type_digits-default"
                    key={order._id}
                  >
                    {order.status !== 'done' ? order.number : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>
          <p className={style.ordersForAllTimeBlock}>
            <span
              className={`text text_type_main-medium ${style.ordersForAllTimeTitle}`}
            >
              Выполнено за все время:
            </span>
            <span
              className={`text text_type_digits-large ${style.ordersForAllTimeCounter}`}
            >
              {totalToday}
            </span>
          </p>
          <p className={style.ordersForAllTimeBlock}>
            <span
              className={`text text_type_main-medium ${style.ordersForAllTimeTitle}`}
            >
              Выполнено за сегодня:
            </span>
            <span
              className={`text text_type_digits-large ${style.ordersForAllTimeCounter}`}
            >
              {totalToday}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Feed;
